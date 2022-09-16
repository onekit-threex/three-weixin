// webgl/webgl_loader_gcode.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin';
import * as THREE from 'three-weixin';

import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { GCodeLoader } from './jsm/loaders/GCodeLoader.js';
Page({
	async onLoad() {
var that = this
        this.canvas = await document.createElementAsync("canvas","webgl")

        
			let camera, scene, renderer;

			init();
			render();

			function init() {

				const container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.set( 0, 0, 70 );

				scene = new THREE.Scene();

				const loader = new GCodeLoader();
				loader.load( 'models/gcode/benchy.gcode', function ( object ) {

					object.position.set( - 100, - 20, 100 );
					scene.add( object );

					render();

				} );

				renderer = that.renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.addEventListener( 'change', render ); // use if there is no animation loop
				controls.minDistance = 10;
				controls.maxDistance = 100;

				window.addEventListener( 'resize', resize );

			}

			function resize() {

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