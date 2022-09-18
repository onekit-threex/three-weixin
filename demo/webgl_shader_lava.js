// webgl/webgl_shader_lava.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
import { EffectComposer } from './jsm/postprocessing/EffectComposer.js';
			import { RenderPass } from './jsm/postprocessing/RenderPass.js';
			import { FilmPass } from './jsm/postprocessing/FilmPass.js';
			import { BloomPass } from './jsm/postprocessing/BloomPass.js';
const onekit = {
    fragmentShader:`uniform float time;

    uniform float fogDensity;
    uniform vec3 fogColor;

    uniform sampler2D texture1;
    uniform sampler2D texture2;

    varying vec2 vUv;

    void main( void ) {

        vec2 position = - 1.0 + 2.0 * vUv;

        vec4 noise = texture2D( texture1, vUv );
        vec2 T1 = vUv + vec2( 1.5, - 1.5 ) * time * 0.02;
        vec2 T2 = vUv + vec2( - 0.5, 2.0 ) * time * 0.01;

        T1.x += noise.x * 2.0;
        T1.y += noise.y * 2.0;
        T2.x -= noise.y * 0.2;
        T2.y += noise.z * 0.2;

        float p = texture2D( texture1, T1 * 2.0 ).a;

        vec4 color = texture2D( texture2, T2 * 2.0 );
        vec4 temp = color * ( vec4( p, p, p, p ) * 2.0 ) + ( color * color - 0.1 );

        if( temp.r > 1.0 ) { temp.bg += clamp( temp.r - 2.0, 0.0, 100.0 ); }
        if( temp.g > 1.0 ) { temp.rb += temp.g - 1.0; }
        if( temp.b > 1.0 ) { temp.rg += temp.b - 1.0; }

        gl_FragColor = temp;

        float depth = gl_FragCoord.z / gl_FragCoord.w;
        const float LOG2 = 1.442695;
        float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );
        fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );

        gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );

    }
`,
vertexShader:`uniform vec2 uvScale;
varying vec2 vUv;

void main()
{

    vUv = uvScale * uv;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * mvPosition;

}`
}
Page({
	async onLoad() {
var that = this
        const canvas = this.canvas = await document.createElementAsync("canvas","webgl")
        let camera, renderer, composer, clock;

        let uniforms, mesh;

        init();
        animate();

        function init() {

            const container = document.getElementById( 'container' );

            camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 3000 );
            camera.position.z = 4;

            const scene = new THREE.Scene();

            clock = new THREE.Clock();

            const textureLoader = new THREE.TextureLoader();

            uniforms = {

                'fogDensity': { value: 0.45 },
                'fogColor': { value: new THREE.Vector3( 0, 0, 0 ) },
                'time': { value: 1.0 },
                'uvScale': { value: new THREE.Vector2( 3.0, 1.0 ) },
                'texture1': { value: textureLoader.load( 'textures/lava/cloud.png' ) },
                'texture2': { value: textureLoader.load( 'textures/lava/lavatile.jpg' ) }

            };

            uniforms[ 'texture1' ].value.wrapS = uniforms[ 'texture1' ].value.wrapT = THREE.RepeatWrapping;
            uniforms[ 'texture2' ].value.wrapS = uniforms[ 'texture2' ].value.wrapT = THREE.RepeatWrapping;

            const size = 0.65;

            const material = new THREE.ShaderMaterial( {

                uniforms: uniforms,
                vertexShader: onekit['vertexShader'],
                fragmentShader: onekit['fragmentShader']

            } );

            mesh = new THREE.Mesh( new THREE.TorusGeometry( size, 0.3, 30, 30 ), material );
            mesh.rotation.x = 0.3;
            scene.add( mesh );

            //

            renderer = that.renderer = new THREE.WebGLRenderer( {canvas, antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            container.appendChild( renderer.domElement );
            renderer.autoClear = false;


            //

            const renderModel = new RenderPass( scene, camera );
            const effectBloom = new BloomPass( 1.25 );
            const effectFilm = new FilmPass( 0.35, 0.95, 2048, false );

            composer = new EffectComposer( renderer );

            composer.addPass( renderModel );
            composer.addPass( effectBloom );
            composer.addPass( effectFilm );

            //

            onWindowResize();

            window.addEventListener( 'resize', onWindowResize );

        }

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );
            composer.setSize( window.innerWidth, window.innerHeight );

        }

        //

        function animate() {

            requestAnimationFrame( animate );

            render();

        }

        function render() {

            const delta = 5 * clock.getDelta();

            uniforms[ 'time' ].value += 0.2 * delta;

            mesh.rotation.y += 0.0125 * delta;
            mesh.rotation.x += 0.05 * delta;

            renderer.clear();
            composer.render( 0.01 );

        }

    }
})