// webgl/webgl_loader_texture_lottie.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  { RoomEnvironment } from '../jsm/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from '../jsm/geometries/RoundedBoxGeometry.js';
import { LottieLoader } from '../jsm/loaders/LottieLoader.js';

var requestId
Page({
	   
         onUnload() {
	   		cancelAnimationFrame(requestId, this.canvas)

if( this.renderer){
        this.renderer.dispose()
        this.renderer.forceContextLoss()
        this.renderer.context = null
        this.renderer.domElement = null
        this.renderer = null  }
        
	},
         webgl_touch(e) {
        const web_e = Event.fix(e)
        //window.dispatchEvent(web_e)
        //document.dispatchEvent(web_e)
        this.canvas.dispatchEvent(web_e)
    },
async onLoad() {
        const canvas3d = this.canvas =await document.createElementAsync("canvas","webgl")
var that = this

        let renderer, scene, camera;
			let mesh;

			init();
			animate();

			function init() {

				camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 10 );
				camera.position.z = 2.5;

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0x111111 );

				const loader = new LottieLoader();
				loader.setQuality( 2 );
				loader.load( 'textures/lottie/24017-lottie-logo-animation.json', function ( texture ) {

					setupControls( texture.animation );

					// texture = new THREE.TextureLoader( ).load( 'textures/uv_grid_directx.jpg' );

					const geometry = new RoundedBoxGeometry( 1, 1, 1, 7, 0.2 );
					const material = new THREE.MeshStandardMaterial( { roughness: 0.1, map: texture } );
					mesh = new THREE.Mesh( geometry, material );
					scene.add( mesh );

				} );

				renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				const environment = new RoomEnvironment();
				const pmremGenerator = new THREE.PMREMGenerator( renderer );

				scene.environment = pmremGenerator.fromScene( environment ).texture;

				//

				window.addEventListener( 'resize', onWindowResize );

			}

			function setupControls( animation ) {

				// Lottie animation API
				// https://airbnb.io/lottie/#/web

				// There are a few undocumented properties:
				// console.log( animation );

				const scrubber = document.getElementById( 'scrubber' );
				scrubber.max = animation.totalFrames;

				scrubber.addEventListener( 'pointerdown', function () {

					animation.pause();

				} );

				scrubber.addEventListener( 'pointerup', function () {

					animation.play();

				} );

				scrubber.addEventListener( 'input', function () {

					animation.goToAndStop( parseFloat( scrubber.value ), true );

				} );

				animation.addEventListener( 'enterFrame', function () {

					scrubber.value = animation.currentFrame;

				} );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function animate() {

				requestAnimationFrame(animate);

				if ( mesh ) {

					mesh.rotation.y -= 0.001;

				}

				renderer.render( scene, camera );

			}

    }
})