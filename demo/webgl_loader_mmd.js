// webgl/webgl_loader_mmd.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
import Stats from './jsm/libs/stats.module.js';
import { GUI } from './jsm/libs/lil-gui.module.min.js';

import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { OutlineEffect } from './jsm/effects/OutlineEffect.js';
import { MMDLoader } from './jsm/loaders/MMDLoader.js';
import { MMDAnimationHelper } from './jsm/animation/MMDAnimationHelper.js';

const  Ammo = new function(){return new Promise((callback)=>{

})};//require('../js/libs/ammo.wasm.js')

Page({
	async onLoad() {
var that = this
        const canvas = this.canvas = await document.createElementAsync("canvas","webgl")

        
			let stats;

			let mesh, camera, scene, renderer, effect;
			let helper, ikHelper, physicsHelper;

			const clock = new THREE.Clock();

			Ammo().then( function ( AmmoLib ) {

                Ammo = getApp().onekit_ammo;

				init();
				animate();

			} );


			function init() {

				const container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
				camera.position.z = 30;

				// scene

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xffffff );

				const gridHelper = new THREE.PolarGridHelper( 30, 10 );
				gridHelper.position.y = - 10;
				scene.add( gridHelper );

				const ambient = new THREE.AmbientLight( 0x666666 );
				scene.add( ambient );

				const directionalLight = new THREE.DirectionalLight( 0x887766 );
				directionalLight.position.set( - 1, 1, 1 ).normalize();
				scene.add( directionalLight );

				//

				renderer = that.renderer = new THREE.WebGLRenderer( {canvas, antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				effect = new OutlineEffect( renderer );

				// STATS

				stats = new Stats();
				container.appendChild( stats.dom );

				// model

				function onProgress( xhr ) {

					if ( xhr.lengthComputable ) {

						const percentComplete = xhr.loaded / xhr.total * 100;
						console.log( Math.round( percentComplete, 2 ) + '% downloaded' );

					}

				}


				const modelFile = 'models/mmd/miku/miku_v2.pmd';
				const vmdFiles = [ 'models/mmd/vmds/wavefile_v2.vmd' ];

				helper = new MMDAnimationHelper( {
					afterglow: 2.0
				} );

				const loader = new MMDLoader();

				loader.loadWithAnimation( modelFile, vmdFiles, function ( mmd ) {

					mesh = mmd.mesh;
					mesh.position.y = - 10;
					scene.add( mesh );

					helper.add( mesh, {
						animation: mmd.animation,
						physics: true
					} );

					ikHelper = helper.objects.get( mesh ).ikSolver.createHelper();
					ikHelper.visible = false;
					scene.add( ikHelper );

					physicsHelper = helper.objects.get( mesh ).physics.createHelper();
					physicsHelper.visible = false;
					scene.add( physicsHelper );

					initGui();

				}, onProgress, null );

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.minDistance = 10;
				controls.maxDistance = 100;

				window.addEventListener( 'resize', onWindowResize );

				function initGui() {

					const api = {
						'animation': true,
						'ik': true,
						'outline': true,
						'physics': true,
						'show IK bones': false,
						'show rigid bodies': false
					};

					const gui = new GUI();

					gui.add( api, 'animation' ).onChange( function () {

						helper.enable( 'animation', api[ 'animation' ] );

					} );

					gui.add( api, 'ik' ).onChange( function () {

						helper.enable( 'ik', api[ 'ik' ] );

					} );

					gui.add( api, 'outline' ).onChange( function () {

						effect.enabled = api[ 'outline' ];

					} );

					gui.add( api, 'physics' ).onChange( function () {

						helper.enable( 'physics', api[ 'physics' ] );

					} );

					gui.add( api, 'show IK bones' ).onChange( function () {

						ikHelper.visible = api[ 'show IK bones' ];

					} );

					gui.add( api, 'show rigid bodies' ).onChange( function () {

						if ( physicsHelper !== undefined ) physicsHelper.visible = api[ 'show rigid bodies' ];

					} );

				}

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				effect.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function animate() {

				requestAnimationFrame( animate );

				stats.begin();
				render();
				stats.end();

			}

			function render() {

				helper.update( clock.getDelta() );
				effect.render( scene, camera );

			}
    }
})