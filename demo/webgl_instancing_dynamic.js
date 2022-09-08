// webgl/webgl_instancing_dynamic.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
import Stats from './jsm/libs/stats.module.js';
			import { GUI } from './jsm/libs/lil-gui.module.min.js';

Page({
	async onLoad() {
var that = this
        getApp().canvas = await document.createElementAsync("canvas","webgl")

        let camera, scene, renderer, stats;

			let mesh;
			const amount = parseInt( window.location.search.slice( 1 ) ) || 10;
			const count = Math.pow( amount, 3 );
			const dummy = new THREE.Object3D();

			init();
			animate();

			function init() {

				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100 );
				camera.position.set( amount * 0.9, amount * 0.9, amount * 0.9 );
				camera.lookAt( 0, 0, 0 );

				scene = new THREE.Scene();

				const loader = new THREE.BufferGeometryLoader();
				loader.load( 'models/json/suzanne_buffergeometry.json', function ( geometry ) {

					geometry.computeVertexNormals();
					geometry.scale( 0.5, 0.5, 0.5 );

					const material = new THREE.MeshNormalMaterial();
					// check overdraw
					// let material = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.1, transparent: true } );

					mesh = new THREE.InstancedMesh( geometry, material, count );
					mesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage ); // will be updated every frame
					scene.add( mesh );

					//

					const gui = new GUI();
					gui.add( mesh, 'count', 0, count );

				} );

				//

				renderer = that.renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				//

				stats = new Stats();
				document.body.appendChild( stats.dom );

				//

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function animate() {

				requestAnimationFrame( animate );

				render();

				//stats.update();

			}

			function render() {

				if ( mesh ) {

					const time = Date.now() * 0.001;

					mesh.rotation.x = Math.sin( time / 4 );
					mesh.rotation.y = Math.sin( time / 2 );

					let i = 0;
					const offset = ( amount - 1 ) / 2;

					for ( let x = 0; x < amount; x ++ ) {

						for ( let y = 0; y < amount; y ++ ) {

							for ( let z = 0; z < amount; z ++ ) {

								dummy.position.set( offset - x, offset - y, offset - z );
								dummy.rotation.y = ( Math.sin( x / 4 + time ) + Math.sin( y / 4 + time ) + Math.sin( z / 4 + time ) );
								dummy.rotation.z = dummy.rotation.y * 2;

								dummy.updateMatrix();

								mesh.setMatrixAt( i ++, dummy.matrix );

							}

						}

					}

					mesh.instanceMatrix.needsUpdate = true;

				}

				renderer.render( scene, camera );

			}

    }
})