// webgl/webgl_morphtargets_sphere.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';

Page({
	async onLoad() {
var that = this
        getApp().canvas = await document.createElementAsync("canvas","webgl")
        
			let camera, scene, renderer, clock;

			let mesh;

			let sign = 1;
			const speed = 0.5;

			init();
			animate();

			function init() {

				const container = document.getElementById( 'container' );

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.2, 100 );
				camera.position.set( 0, 5, 5 );

				scene = new THREE.Scene();

				clock = new THREE.Clock();

				const light1 = new THREE.PointLight( 0xff2200, 0.7 );
				light1.position.set( 100, 100, 100 );
				scene.add( light1 );

				const light2 = new THREE.PointLight( 0x22ff00, 0.7 );
				light2.position.set( - 100, - 100, - 100 );
				scene.add( light2 );

				scene.add( new THREE.AmbientLight( 0x111111 ) );

				const loader = new GLTFLoader();
				loader.load( 'models/gltf/AnimatedMorphSphere/glTF/AnimatedMorphSphere.gltf', function ( gltf ) {

					mesh = gltf.scene.getObjectByName( 'AnimatedMorphSphere' );
					mesh.rotation.z = Math.PI / 2;
					scene.add( mesh );

					//

					const pointsMaterial = new THREE.PointsMaterial( {
						size: 10,
						sizeAttenuation: false,
						map: new THREE.TextureLoader().load( 'textures/sprites/disc.png' ),
						alphaTest: 0.5
					} );

					const points = new THREE.Points( mesh.geometry, pointsMaterial );
					points.morphTargetInfluences = mesh.morphTargetInfluences;
					points.morphTargetDictionary = mesh.morphTargetDictionary;
					mesh.add( points );

				} );

				//

				renderer = that.renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				//

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.minDistance = 1;
				controls.maxDistance = 20;

				//

				window.addEventListener( 'resize', onWindowResize );

				document.addEventListener( 'visibilitychange', onVisibilityChange );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function onVisibilityChange() {

				if ( document.hidden === true ) {

					clock.stop();

				} else {

					clock.start();

				}

			}

			function animate() {

				requestAnimationFrame( animate );
				render();

			}

			function render() {

				const delta = clock.getDelta();

				if ( mesh !== undefined ) {

					const step = delta * speed;

					mesh.rotation.y += step;

					mesh.morphTargetInfluences[ 1 ] = mesh.morphTargetInfluences[ 1 ] + step * sign;

					if ( mesh.morphTargetInfluences[ 1 ] <= 0 || mesh.morphTargetInfluences[ 1 ] >= 1 ) {

						sign *= - 1;

					}

				}

				renderer.render( scene, camera );

			}

    }
})