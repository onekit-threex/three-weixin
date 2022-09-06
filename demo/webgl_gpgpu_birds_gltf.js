// webgl_advanced/webgl_gpgpu_birds_gltf.js
import {document,window,requestAnimationFrame,Event} from 'dhtml-weixin';
import * as THREE from 'three-weixin';

import Stats from './jsm/libs/stats.module.js';
import { GUI } from './jsm/libs/lil-gui.module.min.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { GPUComputationRenderer } from './jsm/misc/GPUComputationRenderer.js';
const onekit = {
    "fragmentShaderPosition":`

        uniform float time;
        uniform float delta;

        void main()	{

            vec2 uv = gl_FragCoord.xy / resolution.xy;
            vec4 tmpPos = texture2D( texturePosition, uv );
            vec3 position = tmpPos.xyz;
            vec3 velocity = texture2D( textureVelocity, uv ).xyz;

            float phase = tmpPos.w;

            phase = mod( ( phase + delta +
                length( velocity.xz ) * delta * 3. +
                max( velocity.y, 0.0 ) * delta * 6. ), 62.83 );

            gl_FragColor = vec4( position + velocity * delta * 15. , phase );

        }
        `,
        "fragmentShaderVelocity":`

        uniform float time;
        uniform float testing;
        uniform float delta; // about 0.016
        uniform float separationDistance; // 20
        uniform float alignmentDistance; // 40
        uniform float cohesionDistance; //
        uniform float freedomFactor;
        uniform vec3 predator;

        const float width = resolution.x;
        const float height = resolution.y;

        const float PI = 3.141592653589793;
        const float PI_2 = PI * 2.0;
        // const float VISION = PI * 0.55;

        float zoneRadius = 40.0;
        float zoneRadiusSquared = 1600.0;

        float separationThresh = 0.45;
        float alignmentThresh = 0.65;

        const float UPPER_BOUNDS = BOUNDS;
        const float LOWER_BOUNDS = -UPPER_BOUNDS;

        const float SPEED_LIMIT = 9.0;

        float rand( vec2 co ){
            return fract( sin( dot( co.xy, vec2(12.9898,78.233) ) ) * 43758.5453 );
        }

        void main() {

            zoneRadius = separationDistance + alignmentDistance + cohesionDistance;
            separationThresh = separationDistance / zoneRadius;
            alignmentThresh = ( separationDistance + alignmentDistance ) / zoneRadius;
            zoneRadiusSquared = zoneRadius * zoneRadius;


            vec2 uv = gl_FragCoord.xy / resolution.xy;
            vec3 birdPosition, birdVelocity;

            vec3 selfPosition = texture2D( texturePosition, uv ).xyz;
            vec3 selfVelocity = texture2D( textureVelocity, uv ).xyz;

            float dist;
            vec3 dir; // direction
            float distSquared;

            float separationSquared = separationDistance * separationDistance;
            float cohesionSquared = cohesionDistance * cohesionDistance;

            float f;
            float percent;

            vec3 velocity = selfVelocity;

            float limit = SPEED_LIMIT;

            dir = predator * UPPER_BOUNDS - selfPosition;
            dir.z = 0.;
            // dir.z *= 0.6;
            dist = length( dir );
            distSquared = dist * dist;

            float preyRadius = 150.0;
            float preyRadiusSq = preyRadius * preyRadius;


            // move birds away from predator
            if ( dist < preyRadius ) {

                f = ( distSquared / preyRadiusSq - 1.0 ) * delta * 100.;
                velocity += normalize( dir ) * f;
                limit += 5.0;
            }


            // if (testing == 0.0) {}
            // if ( rand( uv + time ) < freedomFactor ) {}


            // Attract flocks to the center
            vec3 central = vec3( 0., 0., 0. );
            dir = selfPosition - central;
            dist = length( dir );

            dir.y *= 2.5;
            velocity -= normalize( dir ) * delta * 5.;

            for ( float y = 0.0; y < height; y++ ) {
                for ( float x = 0.0; x < width; x++ ) {

                    vec2 ref = vec2( x + 0.5, y + 0.5 ) / resolution.xy;
                    birdPosition = texture2D( texturePosition, ref ).xyz;

                    dir = birdPosition - selfPosition;
                    dist = length( dir );

                    if ( dist < 0.0001 ) continue;

                    distSquared = dist * dist;

                    if ( distSquared > zoneRadiusSquared ) continue;

                    percent = distSquared / zoneRadiusSquared;

                    if ( percent < separationThresh ) { // low

                        // Separation - Move apart for comfort
                        f = ( separationThresh / percent - 1.0 ) * delta;
                        velocity -= normalize( dir ) * f;

                    } else if ( percent < alignmentThresh ) { // high

                        // Alignment - fly the same direction
                        float threshDelta = alignmentThresh - separationThresh;
                        float adjustedPercent = ( percent - separationThresh ) / threshDelta;

                        birdVelocity = texture2D( textureVelocity, ref ).xyz;

                        f = ( 0.5 - cos( adjustedPercent * PI_2 ) * 0.5 + 0.5 ) * delta;
                        velocity += normalize( birdVelocity ) * f;

                    } else {

                        // Attraction / Cohesion - move closer
                        float threshDelta = 1.0 - alignmentThresh;
                        float adjustedPercent;
                        if( threshDelta == 0. ) adjustedPercent = 1.;
                        else adjustedPercent = ( percent - alignmentThresh ) / threshDelta;

                        f = ( 0.5 - ( cos( adjustedPercent * PI_2 ) * -0.5 + 0.5 ) ) * delta;

                        velocity += normalize( dir ) * f;

                    }

                }

            }

            // this make tends to fly around than down or up
            // if (velocity.y > 0.) velocity.y *= (1. - 0.2 * delta);

            // Speed Limits
            if ( length( velocity ) > limit ) {
                velocity = normalize( velocity ) * limit;
            }

            gl_FragColor = vec4( velocity, 1.0 );

        }
`
}
Page({
  async onLoad(){
getApp().canvas = await document.createElementAsync("canvas","webgl")

	/* TEXTURE WIDTH FOR SIMULATION */
    const WIDTH = 64;
    const BIRDS = WIDTH * WIDTH;

    /* BAKE ANIMATION INTO TEXTURE and CREATE GEOMETRY FROM BASE MODEL */
    const BirdGeometry = new THREE.BufferGeometry();
    let textureAnimation, durationAnimation, birdMesh, materialShader, indicesPerBird;

    function nextPowerOf2( n ) {

        return Math.pow( 2, Math.ceil( Math.log( n ) / Math.log( 2 ) ) );

    }

    Math.lerp = function ( value1, value2, amount ) {

        amount = Math.max( Math.min( amount, 1 ), 0 );
        return value1 + ( value2 - value1 ) * amount;

    };

    const gltfs = [ 'models/gltf/Parrot.glb', 'models/gltf/Flamingo.glb' ];
    const colors = [ 0xccFFFF, 0xffdeff ];
    const sizes = [ 0.2, 0.1 ];
    const selectModel = Math.floor( Math.random() * gltfs.length );
    new GLTFLoader().load( gltfs[ selectModel ], function ( gltf ) {

        const animations = gltf.animations;
        durationAnimation = Math.round( animations[ 0 ].duration * 60 );
        const birdGeo = gltf.scene.children[ 0 ].geometry;
        const morphAttributes = birdGeo.morphAttributes.position;
        const tHeight = nextPowerOf2( durationAnimation );
        const tWidth = nextPowerOf2( birdGeo.getAttribute( 'position' ).count );
        indicesPerBird = birdGeo.index.count;
        const tData = new Float32Array( 4 * tWidth * tHeight );

        for ( let i = 0; i < tWidth; i ++ ) {

            for ( let j = 0; j < tHeight; j ++ ) {

                const offset = j * tWidth * 4;

                const curMorph = Math.floor( j / durationAnimation * morphAttributes.length );
                const nextMorph = ( Math.floor( j / durationAnimation * morphAttributes.length ) + 1 ) % morphAttributes.length;
                const lerpAmount = j / durationAnimation * morphAttributes.length % 1;

                if ( j < durationAnimation ) {

                    let d0, d1;

                    d0 = morphAttributes[ curMorph ].array[ i * 3 ];
                    d1 = morphAttributes[ nextMorph ].array[ i * 3 ];

                    if ( d0 !== undefined && d1 !== undefined ) tData[ offset + i * 4 ] = Math.lerp( d0, d1, lerpAmount );

                    d0 = morphAttributes[ curMorph ].array[ i * 3 + 1 ];
                    d1 = morphAttributes[ nextMorph ].array[ i * 3 + 1 ];

                    if ( d0 !== undefined && d1 !== undefined ) tData[ offset + i * 4 + 1 ] = Math.lerp( d0, d1, lerpAmount );

                    d0 = morphAttributes[ curMorph ].array[ i * 3 + 2 ];
                    d1 = morphAttributes[ nextMorph ].array[ i * 3 + 2 ];

                    if ( d0 !== undefined && d1 !== undefined ) tData[ offset + i * 4 + 2 ] = Math.lerp( d0, d1, lerpAmount );

                    tData[ offset + i * 4 + 3 ] = 1;

                }

            }

        }

        textureAnimation = new THREE.DataTexture( tData, tWidth, tHeight, THREE.RGBAFormat, THREE.FloatType );
        textureAnimation.needsUpdate = true;

        const vertices = [], color = [], reference = [], seeds = [], indices = [];
        const totalVertices = birdGeo.getAttribute( 'position' ).count * 3 * BIRDS;
        for ( let i = 0; i < totalVertices; i ++ ) {

            const bIndex = i % ( birdGeo.getAttribute( 'position' ).count * 3 );
            vertices.push( birdGeo.getAttribute( 'position' ).array[ bIndex ] );
            color.push( birdGeo.getAttribute( 'color' ).array[ bIndex ] );

        }

        let r = Math.random();
        for ( let i = 0; i < birdGeo.getAttribute( 'position' ).count * BIRDS; i ++ ) {

            const bIndex = i % ( birdGeo.getAttribute( 'position' ).count );
            const bird = Math.floor( i / birdGeo.getAttribute( 'position' ).count );
            if ( bIndex == 0 ) r = Math.random();
            const j = ~ ~ bird;
            const x = ( j % WIDTH ) / WIDTH;
            const y = ~ ~ ( j / WIDTH ) / WIDTH;
            reference.push( x, y, bIndex / tWidth, durationAnimation / tHeight );
            seeds.push( bird, r, Math.random(), Math.random() );

        }

        for ( let i = 0; i < birdGeo.index.array.length * BIRDS; i ++ ) {

            const offset = Math.floor( i / birdGeo.index.array.length ) * ( birdGeo.getAttribute( 'position' ).count );
            indices.push( birdGeo.index.array[ i % birdGeo.index.array.length ] + offset );

        }

        BirdGeometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( vertices ), 3 ) );
        BirdGeometry.setAttribute( 'birdColor', new THREE.BufferAttribute( new Float32Array( color ), 3 ) );
        BirdGeometry.setAttribute( 'color', new THREE.BufferAttribute( new Float32Array( color ), 3 ) );
        BirdGeometry.setAttribute( 'reference', new THREE.BufferAttribute( new Float32Array( reference ), 4 ) );
        BirdGeometry.setAttribute( 'seeds', new THREE.BufferAttribute( new Float32Array( seeds ), 4 ) );

        BirdGeometry.setIndex( indices );

        init();
        animate();

    } );

    let container, stats;
    let camera, scene, renderer;
    let mouseX = 0, mouseY = 0;

    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    const BOUNDS = 800, BOUNDS_HALF = BOUNDS / 2;

    let last = performance.now();

    let gpuCompute;
    let velocityVariable;
    let positionVariable;
    let positionUniforms;
    let velocityUniforms;

    function init() {

        container = document.createElement( 'div' );
        document.body.appendChild( container );

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 3000 );
        camera.position.z = 350;

        scene = new THREE.Scene();
        scene.background = new THREE.Color( colors[ selectModel ] );
        scene.fog = new THREE.Fog( colors[ selectModel ], 100, 1000 );

        // LIGHTS

        const hemiLight = new THREE.HemisphereLight( colors[ selectModel ], 0xffffff, 1.6 );
        hemiLight.color.setHSL( 0.6, 1, 0.6 );
        hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
        hemiLight.position.set( 0, 50, 0 );
        scene.add( hemiLight );

        const dirLight = new THREE.DirectionalLight( 0x00CED1, 0.6 );
        dirLight.color.setHSL( 0.1, 1, 0.95 );
        dirLight.position.set( - 1, 1.75, 1 );
        dirLight.position.multiplyScalar( 30 );
        scene.add( dirLight );

        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );

        initComputeRenderer();

        stats = new Stats();
        container.appendChild( stats.dom );

        container.style.touchAction = 'none';
        container.addEventListener( 'pointermove', onPointerMove );

        window.addEventListener( 'resize', onWindowResize );

        const gui = new GUI();

        const effectController = {

            separation: 20.0,
            alignment: 20.0,
            cohesion: 20.0,
            freedom: 0.75,
            size: sizes[ selectModel ],
            count: Math.floor( BIRDS / 4 )

        };

        const valuesChanger = function () {

            velocityUniforms[ 'separationDistance' ].value = effectController.separation;
            velocityUniforms[ 'alignmentDistance' ].value = effectController.alignment;
            velocityUniforms[ 'cohesionDistance' ].value = effectController.cohesion;
            velocityUniforms[ 'freedomFactor' ].value = effectController.freedom;
            if ( materialShader ) materialShader.uniforms[ 'size' ].value = effectController.size;
            BirdGeometry.setDrawRange( 0, indicesPerBird * effectController.count );

        };

        valuesChanger();

        gui.add( effectController, 'separation', 0.0, 100.0, 1.0 ).onChange( valuesChanger );
        gui.add( effectController, 'alignment', 0.0, 100, 0.001 ).onChange( valuesChanger );
        gui.add( effectController, 'cohesion', 0.0, 100, 0.025 ).onChange( valuesChanger );
        gui.add( effectController, 'size', 0, 1, 0.01 ).onChange( valuesChanger );
        gui.add( effectController, 'count', 0, BIRDS, 1 ).onChange( valuesChanger );
        gui.close();

        initBirds( effectController );

    }

    function initComputeRenderer() {

        gpuCompute = new GPUComputationRenderer( WIDTH, WIDTH, renderer );

        if ( renderer.capabilities.isWebGL2 === false ) {

            gpuCompute.setDataType( THREE.HalfFloatType );

        }

        const dtPosition = gpuCompute.createTexture();
        const dtVelocity = gpuCompute.createTexture();
        fillPositionTexture( dtPosition );
        fillVelocityTexture( dtVelocity );

        velocityVariable = gpuCompute.addVariable( 'textureVelocity',onekit[ 'fragmentShaderVelocity' ], dtVelocity );
        positionVariable = gpuCompute.addVariable( 'texturePosition',onekit[ 'fragmentShaderPosition' ], dtPosition );

        gpuCompute.setVariableDependencies( velocityVariable, [ positionVariable, velocityVariable ] );
        gpuCompute.setVariableDependencies( positionVariable, [ positionVariable, velocityVariable ] );

        positionUniforms = positionVariable.material.uniforms;
        velocityUniforms = velocityVariable.material.uniforms;

        positionUniforms[ 'time' ] = { value: 0.0 };
        positionUniforms[ 'delta' ] = { value: 0.0 };
        velocityUniforms[ 'time' ] = { value: 1.0 };
        velocityUniforms[ 'delta' ] = { value: 0.0 };
        velocityUniforms[ 'testing' ] = { value: 1.0 };
        velocityUniforms[ 'separationDistance' ] = { value: 1.0 };
        velocityUniforms[ 'alignmentDistance' ] = { value: 1.0 };
        velocityUniforms[ 'cohesionDistance' ] = { value: 1.0 };
        velocityUniforms[ 'freedomFactor' ] = { value: 1.0 };
        velocityUniforms[ 'predator' ] = { value: new THREE.Vector3() };
        velocityVariable.material.defines.BOUNDS = BOUNDS.toFixed( 2 );

        velocityVariable.wrapS = THREE.RepeatWrapping;
        velocityVariable.wrapT = THREE.RepeatWrapping;
        positionVariable.wrapS = THREE.RepeatWrapping;
        positionVariable.wrapT = THREE.RepeatWrapping;

        const error = gpuCompute.init();

        if ( error !== null ) {

            console.error( error );

        }

    }

    function initBirds( effectController ) {

        const geometry = BirdGeometry;

        const m = new THREE.MeshStandardMaterial( {
            vertexColors: true,
            flatShading: true,
            roughness: 1,
            metalness: 0
        } );

        m.onBeforeCompile = ( shader ) => {

            shader.uniforms.texturePosition = { value: null };
            shader.uniforms.textureVelocity = { value: null };
            shader.uniforms.textureAnimation = { value: textureAnimation };
            shader.uniforms.time = { value: 1.0 };
            shader.uniforms.size = { value: effectController.size };
            shader.uniforms.delta = { value: 0.0 };

            let token = '#define STANDARD';

            let insert = /* glsl */`
                attribute vec4 reference;
                attribute vec4 seeds;
                attribute vec3 birdColor;
                uniform sampler2D texturePosition;
                uniform sampler2D textureVelocity;
                uniform sampler2D textureAnimation;
                uniform float size;
                uniform float time;
            `;

            shader.vertexShader = shader.vertexShader.replace( token, token + insert );

            token = '#include <begin_vertex>';

            insert = /* glsl */`
                vec4 tmpPos = texture2D( texturePosition, reference.xy );

                vec3 pos = tmpPos.xyz;
                vec3 velocity = normalize(texture2D( textureVelocity, reference.xy ).xyz);
                vec3 aniPos = texture2D( textureAnimation, vec2( reference.z, mod( time + ( seeds.x ) * ( ( 0.0004 + seeds.y / 10000.0) + normalize( velocity ) / 20000.0 ), reference.w ) ) ).xyz;
                vec3 newPosition = position;

                newPosition = mat3( modelMatrix ) * ( newPosition + aniPos );
                newPosition *= size + seeds.y * size * 0.2;

                velocity.z *= -1.;
                float xz = length( velocity.xz );
                float xyz = 1.;
                float x = sqrt( 1. - velocity.y * velocity.y );

                float cosry = velocity.x / xz;
                float sinry = velocity.z / xz;

                float cosrz = x / xyz;
                float sinrz = velocity.y / xyz;

                mat3 maty =  mat3( cosry, 0, -sinry, 0    , 1, 0     , sinry, 0, cosry );
                mat3 matz =  mat3( cosrz , sinrz, 0, -sinrz, cosrz, 0, 0     , 0    , 1 );

                newPosition =  maty * matz * newPosition;
                newPosition += pos;

                vec3 transformed = vec3( newPosition );
            `;

            shader.vertexShader = shader.vertexShader.replace( token, insert );

            materialShader = shader;

        };

        birdMesh = new THREE.Mesh( geometry, m );
        birdMesh.rotation.y = Math.PI / 2;

        birdMesh.castShadow = true;
        birdMesh.receiveShadow = true;

        scene.add( birdMesh );

    }

    function fillPositionTexture( texture ) {

        const theArray = texture.image.data;

        for ( let k = 0, kl = theArray.length; k < kl; k += 4 ) {

            const x = Math.random() * BOUNDS - BOUNDS_HALF;
            const y = Math.random() * BOUNDS - BOUNDS_HALF;
            const z = Math.random() * BOUNDS - BOUNDS_HALF;

            theArray[ k + 0 ] = x;
            theArray[ k + 1 ] = y;
            theArray[ k + 2 ] = z;
            theArray[ k + 3 ] = 1;

        }

    }

    function fillVelocityTexture( texture ) {

        const theArray = texture.image.data;

        for ( let k = 0, kl = theArray.length; k < kl; k += 4 ) {

            const x = Math.random() - 0.5;
            const y = Math.random() - 0.5;
            const z = Math.random() - 0.5;

            theArray[ k + 0 ] = x * 10;
            theArray[ k + 1 ] = y * 10;
            theArray[ k + 2 ] = z * 10;
            theArray[ k + 3 ] = 1;

        }

    }

    function onWindowResize() {

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function onPointerMove( event ) {

        if ( event.isPrimary === false ) return;

        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;

    }

    //

    function animate() {

        requestAnimationFrame( animate );

        render();
        stats.update();

    }

    function render() {

        const now = performance.now();
        let delta = ( now - last ) / 1000;

        if ( delta > 1 ) delta = 1; // safety cap on large deltas
        last = now;

        positionUniforms[ 'time' ].value = now;
        positionUniforms[ 'delta' ].value = delta;
        velocityUniforms[ 'time' ].value = now;
        velocityUniforms[ 'delta' ].value = delta;
        if ( materialShader ) materialShader.uniforms[ 'time' ].value = now / 1000;
        if ( materialShader ) materialShader.uniforms[ 'delta' ].value = delta;

        velocityUniforms[ 'predator' ].value.set( 0.5 * mouseX / windowHalfX, - 0.5 * mouseY / windowHalfY, 0 );

        mouseX = 10000;
        mouseY = 10000;

        gpuCompute.compute();

        if ( materialShader ) materialShader.uniforms[ 'texturePosition' ].value = gpuCompute.getCurrentRenderTarget( positionVariable ).texture;
        if ( materialShader ) materialShader.uniforms[ 'textureVelocity' ].value = gpuCompute.getCurrentRenderTarget( velocityVariable ).texture;

        renderer.render( scene, camera );

    }
}
})