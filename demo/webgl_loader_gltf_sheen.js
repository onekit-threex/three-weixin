// webgl/webgl_loader_gltf_sheen.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin';
import * as THREE from 'three-weixin';

import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from './jsm/environments/RoomEnvironment.js';

import { GUI } from './jsm/libs/lil-gui.module.min.js';
Page({
	async onLoad() {
var that = this
        const canvas = this.canvas = await document.createElementAsync("canvas","webgl")

        
			let camera, scene, renderer, controls;

			init();
			animate();

			function init() {

				const container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 20 );
				camera.position.set( - 0.75, 0.7, 1.25 );

				scene = new THREE.Scene();

				// model

				new GLTFLoader()
					.setPath( 'models/gltf/' )
					.load( 'SheenChair.glb', function ( gltf ) {

						scene.add( gltf.scene );

						const object = gltf.scene.getObjectByName( 'SheenChair_fabric' );

						const gui = new GUI();

						gui.add( object.material, 'sheen', 0, 1 );
						gui.open();

					} );

				renderer = that.renderer = new THREE.WebGLRenderer( {canvas, antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.toneMapping = THREE.ACESFilmicToneMapping;
				renderer.toneMappingExposure = 1;
				renderer.outputEncoding = THREE.sRGBEncoding;
				container.appendChild( renderer.domElement );

				const environment = new RoomEnvironment();
				const pmremGenerator = new THREE.PMREMGenerator( renderer );

				scene.background = new THREE.Color( 0xbbbbbb );
				scene.environment = pmremGenerator.fromScene( environment ).texture;

				controls = new OrbitControls( camera, renderer.domElement );
				controls.enableDamping = true;
				controls.minDistance = 1;
				controls.maxDistance = 10;
				controls.target.set( 0, 0.35, 0 );
				controls.update();

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

				controls.update(); // required if damping enabled

				render();

			}

			function render() {

				renderer.render( scene, camera );

			}

    }
})