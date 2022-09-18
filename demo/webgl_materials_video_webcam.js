// webgl/webgl_materials_video_webcam.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,navigator} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
Page({
	async onLoad() {
var that = this
        const canvas = this.canvas = await document.createElementAsync("canvas","webgl")
        
			let camera, scene, renderer, video;

			init();
			animate();

			function init() {

				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100 );
				camera.position.z = 0.01;

				scene = new THREE.Scene();

				video = document.getElementById( 'video' );

				const texture = new THREE.VideoTexture( video );

				const geometry = new THREE.PlaneGeometry( 16, 9 );
				geometry.scale( 0.5, 0.5, 0.5 );
				const material = new THREE.MeshBasicMaterial( { map: texture } );

				const count = 128;
				const radius = 32;

				for ( let i = 1, l = count; i <= l; i ++ ) {

					const phi = Math.acos( - 1 + ( 2 * i ) / l );
					const theta = Math.sqrt( l * Math.PI ) * phi;

					const mesh = new THREE.Mesh( geometry, material );
					mesh.position.setFromSphericalCoords( radius, phi, theta );
					mesh.lookAt( camera.position );
					scene.add( mesh );

				}

				renderer = that.renderer = new THREE.WebGLRenderer( {canvas, antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.enableZoom = false;
				controls.enablePan = false;

				window.addEventListener( 'resize', onWindowResize );

				//

				if ( navigator.mediaDevices && navigator.mediaDevices.getUserMedia ) {

					const constraints = { video: { width: 1280, height: 720, facingMode: 'user' } };

					navigator.mediaDevices.getUserMedia( constraints ).then( function ( stream ) {

						// apply the stream to the video element used in the texture

						//video.srcObject = stream;
						//video.play();

					} ).catch( function ( error ) {

						console.error( 'Unable to access the camera/webcam.', error );

					} );

				} else {

					console.error( 'MediaDevices interface not available.' );

				}

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestAnimationFrame( animate );
				renderer.render( scene, camera );

			}

    }
})