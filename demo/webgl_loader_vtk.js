// webgl/webgl_loader_vtk.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin';
import * as THREE from 'three-weixin';

import Stats from './jsm/libs/stats.module.js';

import { TrackballControls } from './jsm/controls/TrackballControls.js';
import { VTKLoader } from './jsm/loaders/VTKLoader.js';
Page({
	async onLoad() {
var that = this
        const canvas3d = this.canvas = await document.createElementAsync("canvas","webgl")

        let container, stats;

			let camera, controls, scene, renderer;

			init();
			animate();

			function init() {

				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 1e10 );
				camera.position.z = 0.2;

				scene = new THREE.Scene();

				scene.add( camera );

				// light

				const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x000000, 1 );
				scene.add( hemiLight );

				const dirLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
				dirLight.position.set( 2, 2, 2 );
				scene.add( dirLight );

				const loader = new VTKLoader();
				loader.load( 'models/vtk/bunny.vtk', function ( geometry ) {

					geometry.center();
					geometry.computeVertexNormals();

					const material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
					const mesh = new THREE.Mesh( geometry, material );
					mesh.position.set( - 0.075, 0.005, 0 );
					mesh.scale.multiplyScalar( 0.2 );
					scene.add( mesh );

				} );

				const loader1 = new VTKLoader();
				loader1.load( 'models/vtk/cube_ascii.vtp', function ( geometry ) {

					geometry.computeVertexNormals();
					geometry.center();

					const material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
					const mesh = new THREE.Mesh( geometry, material );

					mesh.position.set( - 0.025, 0, 0 );
					mesh.scale.multiplyScalar( 0.01 );


					scene.add( mesh );

				} );

				const loader2 = new VTKLoader();
				loader2.load( 'models/vtk/cube_binary.vtp', function ( geometry ) {

					geometry.computeVertexNormals();
					geometry.center();

					const material = new THREE.MeshLambertMaterial( { color: 0x0000ff } );
					const mesh = new THREE.Mesh( geometry, material );

					mesh.position.set( 0.025, 0, 0 );
					mesh.scale.multiplyScalar( 0.01 );


					scene.add( mesh );

				} );

				const loader3 = new VTKLoader();
				loader3.load( 'models/vtk/cube_no_compression.vtp', function ( geometry ) {

					geometry.computeVertexNormals();
					geometry.center();

					const material = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
					const mesh = new THREE.Mesh( geometry, material );

					mesh.position.set( 0.075, 0, 0 );
					mesh.scale.multiplyScalar( 0.01 );


					scene.add( mesh );

				} );

				// renderer

				renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );

				container = document.createElement( 'div' );
				document.body.appendChild( container );
				container.appendChild( renderer.domElement );

				// controls

				controls = new TrackballControls( camera, renderer.domElement );
				controls.minDistance = .1;
				controls.maxDistance = 0.5;
				controls.rotateSpeed = 5.0;

				stats = new Stats();
				container.appendChild( stats.dom );

				//

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

				controls.handleResize();

			}

			function animate() {

				requestAnimationFrame( animate );

				controls.update();

				renderer.render( scene, camera );

			//	stats.update();

			}
    }
})