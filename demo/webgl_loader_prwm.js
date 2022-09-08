// webgl/webgl_loader_prwm.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
import { PRWMLoader } from './jsm/loaders/PRWMLoader.js';
Page({
	async onLoad() {
var that = this
        getApp().canvas = await document.createElementAsync("canvas","webgl")

        
			let camera, scene, renderer;

			let mouseX = 0, mouseY = 0;

			let windowHalfX = window.innerWidth / 2;
			let windowHalfY = window.innerHeight / 2;

			init();
			animate();


			function init() {

				document.getElementById( 'endianness' ).innerHTML = PRWMLoader.isBigEndianPlatform() ? 'big-endian' : 'little-endian';
				const container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
				camera.position.z = 250;

				// scene

				scene = new THREE.Scene();

				const ambient = new THREE.AmbientLight( 0x101030 );
				scene.add( ambient );

				const directionalLight = new THREE.DirectionalLight( 0xffeedd );
				directionalLight.position.set( 0, 0, 1 );
				scene.add( directionalLight );

				// model

				const loader = new PRWMLoader();
				const material = new THREE.MeshPhongMaterial( {} );
				let busy = false;
				let mesh = null;

				const onProgress = function ( xhr ) {

					if ( xhr.lengthComputable ) {

						const percentComplete = xhr.loaded / xhr.total * 100;
						console.log( Math.round( percentComplete, 2 ) + '% downloaded' );

						if ( xhr.loaded === xhr.total ) {

							console.log( 'File size: ' + ( xhr.total / 1024 ).toFixed( 2 ) + 'kB' );
							console.timeEnd( 'Download' );

						}

					}

				};

				const onError = function () {

					busy = false;

				};

				function loadGeometry( url ) {

					if ( busy ) return;

					busy = true;

					if ( mesh !== null ) {

						scene.remove( mesh );
						mesh.geometry.dispose();

					}

					console.log( '-- Loading', url );
					console.time( 'Download' );

					loader.load( url, function ( geometry ) {

						mesh = new THREE.Mesh( geometry, material );
						mesh.scale.set( 50, 50, 50 );
						scene.add( mesh );

						console.log( geometry.index ? 'indexed geometry' : 'non-indexed geometry' );
						console.log( '# of vertices: ' + geometry.attributes.position.count );
						console.log( '# of polygons: ' + ( geometry.index ? geometry.index.count / 3 : geometry.attributes.position.count / 3 ) );
						busy = false;

					}, onProgress, onError );

				}

				//

				renderer = that.renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				document.addEventListener( 'mousemove', onDocumentMouseMove );

				//

				document.querySelectorAll( 'a.model' ).forEach( function ( anchor ) {

					anchor.addEventListener( 'click', function ( e ) {

						e.preventDefault();

						loadGeometry( anchor.href );

					} );

				} );

				//

				// * is automatically replaced by 'le' or 'be' depending on the client platform's endianness
				loadGeometry( 'models/prwm/smooth-suzanne.*.prwm' );

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function onDocumentMouseMove( event ) {

				mouseX = ( event.clientX - windowHalfX ) / 2;
				mouseY = ( event.clientY - windowHalfY ) / 2;

			}

			//

			function animate() {

				requestAnimationFrame( animate );
				render();

			}

			function render() {

				camera.position.x += ( mouseX - camera.position.x ) * .05;
				camera.position.y += ( - mouseY - camera.position.y ) * .05;

				camera.lookAt( scene.position );

				renderer.render( scene, camera );

			}
    }
})