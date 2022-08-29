// webgl/webgl_loader_gltf_iridescence.js
import {document,window,requestAnimationFrame} from 'dhtml-weixin';
import * as THREE from 'three-weixin';

import { OrbitControls } from '../jsm/controls/OrbitControls.js';
import { GLTFLoader } from '../jsm/loaders/GLTFLoader.js';
import { RGBELoader } from '../jsm/loaders/RGBELoader.js';
Page({
	async onLoad() {
        getApp().canvas = await document.createElementAsync("canvas","webgl")

        let renderer, scene, camera, controls;

			init().catch( function ( err ) {

				console.error( err );

			} );

			async function init() {

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.outputEncoding = THREE.sRGBEncoding;
				renderer.toneMapping = THREE.ACESFilmicToneMapping;
				document.body.appendChild( renderer.domElement );

				scene = new THREE.Scene();

				camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.25, 20 );
				camera.position.set( 0.35, 0.05, 0.35 );

				controls = new OrbitControls( camera, renderer.domElement );
				controls.addEventListener( 'change', render );
				controls.target.set( 0, 0.2, 0 );
				controls.update();

				const rgbeLoader = new RGBELoader()
					.setPath( 'textures/equirectangular/' );

				const gltfLoader = new GLTFLoader().setPath( 'models/gltf/' );

				const [ texture, gltf ] = await Promise.all( [
					rgbeLoader.loadAsync( 'venice_sunset_1k.hdr' ),
					gltfLoader.loadAsync( 'IridescenceLamp.glb' ),
				] );

				// environment

				texture.mapping = THREE.EquirectangularReflectionMapping;

				scene.background = texture;
				scene.environment = texture;

				// model

				scene.add( gltf.scene );

				render();

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;

				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

				render();

			}

			function render() {

				renderer.render( scene, camera );

			}
    }
})