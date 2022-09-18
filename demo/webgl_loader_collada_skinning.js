// webgl/webgl_loader_collada_skinning.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin';
import * as THREE from 'three-weixin';

import Stats from './jsm/libs/stats.module.js';

import { ColladaLoader } from './jsm/loaders/ColladaLoader.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
Page({
	async onLoad() {
var that = this
        const canvas = this.canvas = await document.createElementAsync("canvas","webgl")

        let container, stats, clock, controls;
			let camera, scene, renderer, mixer;

			init();
			animate();

			function init() {

				container = document.getElementById( 'container' );

				camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.set( 15, 10, - 15 );

				scene = new THREE.Scene();

				clock = new THREE.Clock();

				// collada

				const loader = new ColladaLoader();
				loader.load( 'models/collada/stormtrooper/stormtrooper.dae', function ( collada ) {

					const avatar = collada.scene;
					const animations = avatar.animations;

					avatar.traverse( function ( node ) {

						if ( node.isSkinnedMesh ) {

							node.frustumCulled = false;

						}

					} );

					mixer = new THREE.AnimationMixer( avatar );
					mixer.clipAction( animations[ 0 ] ).play();

					scene.add( avatar );

				} );

				//

				const gridHelper = new THREE.GridHelper( 10, 20, 0x888888, 0x444444 );
				scene.add( gridHelper );

				//

				const ambientLight = new THREE.AmbientLight( 0xffffff, 0.2 );
				scene.add( ambientLight );

				const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
				scene.add( camera );
				camera.add( pointLight );

				//

				renderer = that.renderer = new THREE.WebGLRenderer( {canvas, antialias: true } );
				renderer.outputEncoding = THREE.sRGBEncoding;
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				//

				controls = new OrbitControls( camera, renderer.domElement );
				controls.screenSpacePanning = true;
				controls.minDistance = 5;
				controls.maxDistance = 40;
				controls.target.set( 0, 2, 0 );
				controls.update();

				//

				stats = new Stats();
				container.appendChild( stats.dom );

				//

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestAnimationFrame( animate );

				render();
			//	//stats.update();

			}

			function render() {

				const delta = clock.getDelta();

				if ( mixer !== undefined ) {

					mixer.update( delta );

				}

				renderer.render( scene, camera );

			}
    }
})