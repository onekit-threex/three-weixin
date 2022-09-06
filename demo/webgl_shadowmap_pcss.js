// webgl_advanced/webgl_shadowmap_pcss.js
import {document,window,requestAnimationFrame,Event} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
import Stats from './jsm/libs/stats.module.js';

import { OrbitControls } from './jsm/controls/OrbitControls.js';
const onekit = {
 "PCSS":`

  #define LIGHT_WORLD_SIZE 0.005
  #define LIGHT_FRUSTUM_WIDTH 3.75
  #define LIGHT_SIZE_UV (LIGHT_WORLD_SIZE / LIGHT_FRUSTUM_WIDTH)
  #define NEAR_PLANE 9.5

  #define NUM_SAMPLES 17
  #define NUM_RINGS 11
  #define BLOCKER_SEARCH_NUM_SAMPLES NUM_SAMPLES

  vec2 poissonDisk[NUM_SAMPLES];

  void initPoissonSamples( const in vec2 randomSeed ) {
    float ANGLE_STEP = PI2 * float( NUM_RINGS ) / float( NUM_SAMPLES );
    float INV_NUM_SAMPLES = 1.0 / float( NUM_SAMPLES );

    // jsfiddle that shows sample pattern: https://jsfiddle.net/a16ff1p7/
    float angle = rand( randomSeed ) * PI2;
    float radius = INV_NUM_SAMPLES;
    float radiusStep = radius;

    for( int i = 0; i < NUM_SAMPLES; i ++ ) {
      poissonDisk[i] = vec2( cos( angle ), sin( angle ) ) * pow( radius, 0.75 );
      radius += radiusStep;
      angle += ANGLE_STEP;
    }
  }

  float penumbraSize( const in float zReceiver, const in float zBlocker ) { // Parallel plane estimation
    return (zReceiver - zBlocker) / zBlocker;
  }

  float findBlocker( sampler2D shadowMap, const in vec2 uv, const in float zReceiver ) {
    // This uses similar triangles to compute what
    // area of the shadow map we should search
    float searchRadius = LIGHT_SIZE_UV * ( zReceiver - NEAR_PLANE ) / zReceiver;
    float blockerDepthSum = 0.0;
    int numBlockers = 0;

    for( int i = 0; i < BLOCKER_SEARCH_NUM_SAMPLES; i++ ) {
      float shadowMapDepth = unpackRGBAToDepth(texture2D(shadowMap, uv + poissonDisk[i] * searchRadius));
      if ( shadowMapDepth < zReceiver ) {
        blockerDepthSum += shadowMapDepth;
        numBlockers ++;
      }
    }

    if( numBlockers == 0 ) return -1.0;

    return blockerDepthSum / float( numBlockers );
  }

  float PCF_Filter(sampler2D shadowMap, vec2 uv, float zReceiver, float filterRadius ) {
    float sum = 0.0;
    float depth;
    #pragma unroll_loop_start
    for( int i = 0; i < 17; i ++ ) {
      depth = unpackRGBAToDepth( texture2D( shadowMap, uv + poissonDisk[ i ] * filterRadius ) );
      if( zReceiver <= depth ) sum += 1.0;
    }
    #pragma unroll_loop_end
    #pragma unroll_loop_start
    for( int i = 0; i < 17; i ++ ) {
      depth = unpackRGBAToDepth( texture2D( shadowMap, uv + -poissonDisk[ i ].yx * filterRadius ) );
      if( zReceiver <= depth ) sum += 1.0;
    }
    #pragma unroll_loop_end
    return sum / ( 2.0 * float( 17 ) );
  }

  float PCSS ( sampler2D shadowMap, vec4 coords ) {
    vec2 uv = coords.xy;
    float zReceiver = coords.z; // Assumed to be eye-space z in this code

    initPoissonSamples( uv );
    // STEP 1: blocker search
    float avgBlockerDepth = findBlocker( shadowMap, uv, zReceiver );

    //There are no occluders so early out (this saves filtering)
    if( avgBlockerDepth == -1.0 ) return 1.0;

    // STEP 2: penumbra size
    float penumbraRatio = penumbraSize( zReceiver, avgBlockerDepth );
    float filterRadius = penumbraRatio * LIGHT_SIZE_UV * NEAR_PLANE / zReceiver;

    // STEP 3: filtering
    //return avgBlockerDepth;
    return PCF_Filter( shadowMap, uv, zReceiver, filterRadius );
  }
`,
"PCSSGetShadow":`
return PCSS( shadowMap, shadowCoord );
`
}
Page({
  async onLoad(){
getApp().canvas = await document.createElementAsync("canvas","webgl")
let stats;
			let camera, scene, renderer;

			let group;

			init();
			animate();

			function init() {

				const container = document.createElement( 'div' );
				document.body.appendChild( container );

				// scene

				scene = new THREE.Scene();
				scene.fog = new THREE.Fog( 0xcce0ff, 5, 100 );

				// camera

				camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );

				// We use this particular camera position in order to expose a bug that can sometimes happen presumably
				// due to lack of precision when interpolating values over really large triangles.
				// It reproduced on at least NVIDIA GTX 1080 and GTX 1050 Ti GPUs when the ground plane was not
				// subdivided into segments.
				camera.position.x = 7;
				camera.position.y = 13;
				camera.position.z = 7;

				scene.add( camera );

				// lights

				scene.add( new THREE.AmbientLight( 0x666666 ) );

				const light = new THREE.DirectionalLight( 0xdfebff, 1.75 );
				light.position.set( 2, 8, 4 );

				light.castShadow = true;
				light.shadow.mapSize.width = 1024;
				light.shadow.mapSize.height = 1024;
				light.shadow.camera.far = 20;

				scene.add( light );

				// scene.add( new DirectionalLightHelper( light ) );
				scene.add( new THREE.CameraHelper( light.shadow.camera ) );

				// group

				group = new THREE.Group();
				scene.add( group );

				const geometry = new THREE.SphereGeometry( 0.3, 20, 20 );

				for ( let i = 0; i < 20; i ++ ) {

					const material = new THREE.MeshPhongMaterial( { color: Math.random() * 0xffffff } );

					const sphere = new THREE.Mesh( geometry, material );
					sphere.position.x = Math.random() - 0.5;
					sphere.position.z = Math.random() - 0.5;
					sphere.position.normalize();
					sphere.position.multiplyScalar( Math.random() * 2 + 1 );
					sphere.castShadow = true;
					sphere.receiveShadow = true;
					sphere.userData.phase = Math.random() * Math.PI;
					group.add( sphere );

				}

				// ground

				const groundMaterial = new THREE.MeshPhongMaterial( { color: 0x404040, specular: 0x111111 } );

				const ground = new THREE.Mesh( new THREE.PlaneGeometry( 20000, 20000, 8, 8 ), groundMaterial );
				ground.rotation.x = - Math.PI / 2;
				ground.receiveShadow = true;
				scene.add( ground );

				// column

				const column = new THREE.Mesh( new THREE.BoxGeometry( 1, 4, 1 ), groundMaterial );
				column.position.y = 2;
				column.castShadow = true;
				column.receiveShadow = true;
				scene.add( column );

				// overwrite shadowmap code

				let shader = THREE.ShaderChunk.shadowmap_pars_fragment;

				shader = shader.replace(
					'#ifdef USE_SHADOWMAP',
					'#ifdef USE_SHADOWMAP' +
          onekit[ 'PCSS' ]
				);

				shader = shader.replace(
					'#if defined( SHADOWMAP_TYPE_PCF )',
				onekit[ 'PCSSGetShadow' ] +
					'#if defined( SHADOWMAP_TYPE_PCF )'
				);

				THREE.ShaderChunk.shadowmap_pars_fragment = shader;

				// renderer

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.setClearColor( scene.fog.color );

				container.appendChild( renderer.domElement );

				renderer.outputEncoding = THREE.sRGBEncoding;
				renderer.shadowMap.enabled = true;

				// controls
				const controls = new OrbitControls( camera, renderer.domElement );
				controls.maxPolarAngle = Math.PI * 0.5;
				controls.minDistance = 10;
				controls.maxDistance = 75;
				controls.target.set( 0, 2.5, 0 );
				controls.update();

				// performance monitor

				stats = new Stats();
				container.appendChild( stats.dom );

				//

				window.addEventListener( 'resize', onWindowResize );

			}

			//

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function animate() {

				const time = performance.now() / 1000;

				group.traverse( function ( child ) {

					if ( 'phase' in child.userData ) {

						child.position.y = Math.abs( Math.sin( time + child.userData.phase ) ) * 4 + 0.3;

					}

				} );

				renderer.render( scene, camera );

				stats.update();

				requestAnimationFrame( animate );

			}
}
})