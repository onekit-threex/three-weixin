// webgl/webgl_loader_md2.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
import Stats from './jsm/libs/stats.module.js';

import { GUI } from './jsm/libs/lil-gui.module.min.js';

import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { MD2Character } from './jsm/misc/MD2Character.js';

Page({
	async onLoad() {
var that = this
        const canvas = this.canvas = await document.createElementAsync("canvas","webgl")

        
			let SCREEN_WIDTH = window.innerWidth;
			let SCREEN_HEIGHT = window.innerHeight;

			let container, camera, scene, renderer;

			let character;

			let gui;

			const playbackConfig = {

				speed: 1.0,
				wireframe: false

			};

			let controls;

			const clock = new THREE.Clock();

			let stats;

			init();
			animate();

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				// CAMERA

				camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.set( 0, 150, 400 );

				// SCENE

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0x050505 );
				scene.fog = new THREE.Fog( 0x050505, 400, 1000 );

				// LIGHTS

				scene.add( new THREE.AmbientLight( 0x222222 ) );

				const light1 = new THREE.SpotLight( 0xffffff, 5, 1000 );
				light1.position.set( 200, 250, 500 );
				light1.angle = 0.5;
				light1.penumbra = 0.5;

				light1.castShadow = true;
				light1.shadow.mapSize.width = 1024;
				light1.shadow.mapSize.height = 1024;

				// scene.add( new THREE.CameraHelper( light1.shadow.camera ) );
				scene.add( light1 );

				const light2 = new THREE.SpotLight( 0xffffff, 5, 1000 );
				light2.position.set( - 100, 350, 350 );
				light2.angle = 0.5;
				light2.penumbra = 0.5;

				light2.castShadow = true;
				light2.shadow.mapSize.width = 1024;
				light2.shadow.mapSize.height = 1024;

				// scene.add( new THREE.CameraHelper( light2.shadow.camera ) );
				scene.add( light2 );

				//  GROUND

				const gt = new THREE.TextureLoader().load( 'textures/terrain/grasslight-big.jpg' );
				const gg = new THREE.PlaneGeometry( 2000, 2000 );
				const gm = new THREE.MeshPhongMaterial( { color: 0xffffff, map: gt } );

				const ground = new THREE.Mesh( gg, gm );
				ground.rotation.x = - Math.PI / 2;
				ground.material.map.repeat.set( 8, 8 );
				ground.material.map.wrapS = ground.material.map.wrapT = THREE.RepeatWrapping;
				ground.material.map.encoding = THREE.sRGBEncoding;
				ground.receiveShadow = true;

				scene.add( ground );

				// RENDERER

				renderer = that.renderer = new THREE.WebGLRenderer( {canvas, antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
				container.appendChild( renderer.domElement );

				//

				renderer.outputEncoding = THREE.sRGBEncoding;
				renderer.shadowMap.enabled = true;

				// STATS

				stats = new Stats();
				container.appendChild( stats.dom );

				// EVENTS

				window.addEventListener( 'resize', onWindowResize );

				// CONTROLS

				controls = new OrbitControls( camera, renderer.domElement );
				controls.target.set( 0, 50, 0 );
				controls.update();

				// GUI

				gui = new GUI();

				gui.add( playbackConfig, 'speed', 0, 2 ).onChange( function () {

					character.setPlaybackRate( playbackConfig.speed );

				} );

				gui.add( playbackConfig, 'wireframe', false ).onChange( function () {

					character.setWireframe( playbackConfig.wireframe );

				} );

				// CHARACTER

				const config = {

					baseUrl: 'models/md2/ratamahatta/',

					body: 'ratamahatta.md2',
					skins: [ 'ratamahatta.png', 'ctf_b.png', 'ctf_r.png', 'dead.png', 'gearwhore.png' ],
					weapons: [[ 'weapon.md2', 'weapon.png' ],
								 [ 'w_bfg.md2', 'w_bfg.png' ],
								 [ 'w_blaster.md2', 'w_blaster.png' ],
								 [ 'w_chaingun.md2', 'w_chaingun.png' ],
								 [ 'w_glauncher.md2', 'w_glauncher.png' ],
								 [ 'w_hyperblaster.md2', 'w_hyperblaster.png' ],
								 [ 'w_machinegun.md2', 'w_machinegun.png' ],
								 [ 'w_railgun.md2', 'w_railgun.png' ],
								 [ 'w_rlauncher.md2', 'w_rlauncher.png' ],
								 [ 'w_shotgun.md2', 'w_shotgun.png' ],
								 [ 'w_sshotgun.md2', 'w_sshotgun.png' ]
					]

				};

				character = new MD2Character();
				character.scale = 3;

				character.onLoadComplete = function () {

					setupSkinsGUI( character );
					setupWeaponsGUI( character );
					setupGUIAnimations( character );

					character.setAnimation( character.meshBody.geometry.animations[ 0 ].name );

				};

				character.loadParts( config );

				scene.add( character.root );

			}

			// EVENT HANDLERS

			function onWindowResize() {

				SCREEN_WIDTH = window.innerWidth;
				SCREEN_HEIGHT = window.innerHeight;

				renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

				camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
				camera.updateProjectionMatrix();

			}

			// GUI

			function labelize( text ) {

				const parts = text.split( '.' );

				if ( parts.length > 1 ) {

					parts.length -= 1;
					return parts.join( '.' );

				}

				return text;

			}

			//

			function setupWeaponsGUI( character ) {

				const folder = gui.addFolder( 'Weapons' );

				const generateCallback = function ( index ) {

					return function () {

						character.setWeapon( index );

					};

				};

				const guiItems = [];

				for ( let i = 0; i < character.weapons.length; i ++ ) {

					const name = character.weapons[ i ].name;

					playbackConfig[ name ] = generateCallback( i );
					guiItems[ i ] = folder.add( playbackConfig, name ).name( labelize( name ) );

				}

			}

			//

			function setupSkinsGUI( character ) {

				const folder = gui.addFolder( 'Skins' );

				const generateCallback = function ( index ) {

					return function () {

						character.setSkin( index );

					};

				};

				const guiItems = [];

				for ( let i = 0; i < character.skinsBody.length; i ++ ) {

					const name = character.skinsBody[ i ].name;

					playbackConfig[ name ] = generateCallback( i );
					guiItems[ i ] = folder.add( playbackConfig, name ).name( labelize( name ) );

				}

			}

			//

			function setupGUIAnimations( character ) {

				const folder = gui.addFolder( 'Animations' );

				const generateCallback = function ( animationClip ) {

					return function () {

						character.setAnimation( animationClip.name );

					};

				};

				const guiItems = [];
				const animations = character.meshBody.geometry.animations;

				for ( let i = 0; i < animations.length; i ++ ) {

					const clip = animations[ i ];

					playbackConfig[ clip.name ] = generateCallback( clip );
					guiItems[ i ] = folder.add( playbackConfig, clip.name, clip.name );

					i ++;

				}

			}

			//

			function animate() {

				requestAnimationFrame( animate );
				render();

				////stats.update();

			}

			function render() {

				const delta = clock.getDelta();

				character.update( delta );

				renderer.render( scene, camera );

			}

    }
})