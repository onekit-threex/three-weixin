// webgl/webgl_loader_lwo.js
import {document,window,requestAnimationFrame} from 'dhtml-weixin';
import * as THREE from 'three-weixin';

import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { LWOLoader } from './jsm/loaders/LWOLoader.js';

Page({
	async onLoad() {
        getApp().canvas = await document.createElementAsync("canvas","webgl")

        let camera, scene, renderer;

			init();

			function init() {

				const container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 200 );
				camera.position.set( - 0.7, 14.6, 43.2 );

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xa0a0a0 );

				const ambientLight = new THREE.AmbientLight( 0x222222 );
				scene.add( ambientLight );

				const light1 = new THREE.DirectionalLight( 0x888888 );
				light1.position.set( 0, 200, 100 );
				scene.add( light1 );

				const grid = new THREE.GridHelper( 200, 20, 0x000000, 0x000000 );
				grid.material.opacity = 0.3;
				grid.material.transparent = true;
				scene.add( grid );

				const loader = new LWOLoader();
				loader.load( 'models/lwo/Objects/LWO3/Demo.lwo', function ( object ) {

					const phong = object.meshes[ 0 ];
					phong.position.set( - 2, 12, 0 );

					const standard = object.meshes[ 1 ];
					standard.position.set( 2, 12, 0 );

					const rocket = object.meshes[ 2 ];
					rocket.position.set( 0, 10.5, - 1 );

					scene.add( phong, standard, rocket );

				} );

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.setAnimationLoop( animation );
				renderer.outputEncoding = THREE.sRGBEncoding;
				renderer.toneMapping = THREE.ACESFilmicToneMapping;
				container.appendChild( renderer.domElement );

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.target.set( 1.33, 10, - 6.7 );
				controls.update();

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animation() {

				renderer.render( scene, camera );

			}

    }
})