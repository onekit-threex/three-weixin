// webgl/webgl_modifier_curve_instanced.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
import { TransformControls } from './jsm/controls/TransformControls.js';
import Stats from './jsm/libs/stats.module.js';
import { InstancedFlow } from './jsm/modifiers/CurveModifier.js';
import { FontLoader } from './jsm/loaders/FontLoader.js';
import { TextGeometry } from './jsm/geometries/TextGeometry.js';

Page({
	async onLoad() {
var that = this
        getApp().canvas = await document.createElementAsync("canvas","webgl")
        
			const ACTION_SELECT = 1, ACTION_NONE = 0;
			const curveHandles = [];
			const mouse = new THREE.Vector2();

			let stats;
			let scene,
				camera,
				renderer,
				rayCaster,
				control,
				flow,
				action = ACTION_NONE;

			init();
			animate();

			function init() {

				scene = new THREE.Scene();

				camera = new THREE.PerspectiveCamera(
					40,
					window.innerWidth / window.innerHeight,
					1,
					1000
				);
				camera.position.set( 2, 2, 4 );
				camera.lookAt( scene.position );

				const boxGeometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
				const boxMaterial = new THREE.MeshBasicMaterial();

				const curves = [[
					{ x: 1, y: - 0.5, z: - 1 },
					{ x: 1, y: - 0.5, z: 1 },
					{ x: - 1, y: - 0.5, z: 1 },
					{ x: - 1, y: - 0.5, z: - 1 },
				],
				[
					{ x: - 1, y: 0.5, z: - 1 },
					{ x: - 1, y: 0.5, z: 1 },
					{ x: 1, y: 0.5, z: 1 },
					{ x: 1, y: 0.5, z: - 1 },
				]].map( function ( curvePoints ) {

					const curveVertices = curvePoints.map( function ( handlePos ) {

						const handle = new THREE.Mesh( boxGeometry, boxMaterial );
						handle.position.copy( handlePos );
						curveHandles.push( handle );
						scene.add( handle );
						return handle.position;

					} );

					const curve = new THREE.CatmullRomCurve3( curveVertices );
					curve.curveType = 'centripetal';
					curve.closed = true;

					const points = curve.getPoints( 50 );
					const line = new THREE.LineLoop(
						new THREE.BufferGeometry().setFromPoints( points ),
						new THREE.LineBasicMaterial( { color: 0x00ff00 } )
					);

					scene.add( line );

					return {
						curve,
						line
					};

				} );


				//

				const light = new THREE.DirectionalLight( 0xffaa33 );
				light.position.set( - 10, 10, 10 );
				light.intensity = 1.0;
				scene.add( light );

				const light2 = new THREE.AmbientLight( 0x003973 );
				light2.intensity = 1.0;
				scene.add( light2 );

				//

				const loader = new FontLoader();
				loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

					const geometry = new TextGeometry( 'Hello three.js!', {
						font: font,
						size: 0.2,
						height: 0.05,
						curveSegments: 12,
						bevelEnabled: true,
						bevelThickness: 0.02,
						bevelSize: 0.01,
						bevelOffset: 0,
						bevelSegments: 5,
					} );

					geometry.rotateX( Math.PI );

					const material = new THREE.MeshStandardMaterial( {
						color: 0x99ffff
					} );

					const numberOfInstances = 8;
					flow = new InstancedFlow( numberOfInstances, curves.length, geometry, material );

					curves.forEach( function ( { curve }, i ) {

						flow.updateCurve( i, curve );
						scene.add( flow.object3D );

					} );

					for ( let i = 0; i < numberOfInstances; i ++ ) {

						const curveIndex = i % curves.length;
						flow.setCurve( i, curveIndex );
						flow.moveIndividualAlongCurve( i, i * 1 / numberOfInstances );
						flow.object3D.setColorAt( i, new THREE.Color( 0xffffff * Math.random() ) );

					}

				} );

				//

				renderer = that.renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

			//	renderer.domElement.addEventListener( 'pointerdown', onPointerDown );

				rayCaster = new THREE.Raycaster();
				control = new TransformControls( camera, renderer.domElement );
				control.addEventListener( 'dragging-changed', function ( event ) {

					if ( ! event.value ) {

						curves.forEach( function ( { curve, line }, i ) {

							const points = curve.getPoints( 50 );
							line.geometry.setFromPoints( points );
							flow.updateCurve( i, curve );

						} );

					}

				} );

				stats = new Stats();
				document.body.appendChild( stats.dom );

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function onPointerDown( event ) {

				action = ACTION_SELECT;
				mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

			}

			function animate() {

				requestAnimationFrame( animate );

				if ( action === ACTION_SELECT ) {

					rayCaster.setFromCamera( mouse, camera );
					action = ACTION_NONE;
					const intersects = rayCaster.intersectObjects( curveHandles, false );
					if ( intersects.length ) {

						const target = intersects[ 0 ].object;
						control.attach( target );
						scene.add( control );

					}

				}

				if ( flow ) {

					flow.moveAlongCurve( 0.001 );

				}

				render();

			}

			function render() {

				renderer.render( scene, camera );

				stats.update();

			}
    }
})