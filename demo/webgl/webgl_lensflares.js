// webgl/webgl_lensflares.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
import Stats from './jsm/libs/stats.module.js';

import { FlyControls } from './jsm/controls/FlyControls.js';
import { Lensflare, LensflareElement } from './jsm/objects/Lensflare.js';

Page({   
 onShareAppMessage() {
        return {
            title: "ThreeX 元宇宙利器",
            path:"/index",
            imageUrl:"/ThreeX.jpg"
        }
    },
    onShareTimeline() {
        return {
            title: "ThreeX 元宇宙利器",
            query:"/index",
            imageUrl:"/ThreeX.jpg"
        }
    },
  onUnload(){
    cancelAnimationFrame()
    this.renderer.dispose()
    this.renderer.forceContextLoss()
    this.renderer.context = null
    this.renderer.domElement = null
    this.renderer = null
},
    webgl_touch(e){
        const web_e = Event.fix(e)
       window.dispatchEvent(web_e)
        this.canvas && this.canvas.dispatchEvent(web_e)
    },
async onLoad(){
var that = this
        const canvas3d = this.canvas = await document.createElementAsync("canvas","webgl")
        let container, stats;

			let camera, scene, renderer;
			let controls;

			const clock = new THREE.Clock();

			init();
			animate();

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				// camera

				camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 15000 );
				camera.position.z = 250;

				// scene

				scene = new THREE.Scene();
				scene.background = new THREE.Color().setHSL( 0.51, 0.4, 0.01 );
				scene.fog = new THREE.Fog( scene.background, 3500, 15000 );

				// world

				const s = 250;

				const geometry = new THREE.BoxGeometry( s, s, s );
				const material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, shininess: 50 } );

				for ( let i = 0; i < 3000; i ++ ) {

					const mesh = new THREE.Mesh( geometry, material );

					mesh.position.x = 8000 * ( 2.0 * Math.random() - 1.0 );
					mesh.position.y = 8000 * ( 2.0 * Math.random() - 1.0 );
					mesh.position.z = 8000 * ( 2.0 * Math.random() - 1.0 );

					mesh.rotation.x = Math.random() * Math.PI;
					mesh.rotation.y = Math.random() * Math.PI;
					mesh.rotation.z = Math.random() * Math.PI;

					mesh.matrixAutoUpdate = false;
					mesh.updateMatrix();

					scene.add( mesh );

				}


				// lights

				const dirLight = new THREE.DirectionalLight( 0xffffff, 0.05 );
				dirLight.position.set( 0, - 1, 0 ).normalize();
				dirLight.color.setHSL( 0.1, 0.7, 0.5 );
				scene.add( dirLight );

				// lensflares
				const textureLoader = new THREE.TextureLoader();

				const textureFlare0 = textureLoader.load( 'textures/lensflare/lensflare0.png' );
				const textureFlare3 = textureLoader.load( 'textures/lensflare/lensflare3.png' );

				addLight( 0.55, 0.9, 0.5, 5000, 0, - 1000 );
				addLight( 0.08, 0.8, 0.5, 0, 0, - 1000 );
				addLight( 0.995, 0.5, 0.9, 5000, 5000, - 1000 );

				function addLight( h, s, l, x, y, z ) {

					const light = new THREE.PointLight( 0xffffff, 1.5, 2000 );
					light.color.setHSL( h, s, l );
					light.position.set( x, y, z );
					scene.add( light );

					const lensflare = new Lensflare();
					lensflare.addElement( new LensflareElement( textureFlare0, 700, 0, light.color ) );
					lensflare.addElement( new LensflareElement( textureFlare3, 60, 0.6 ) );
					lensflare.addElement( new LensflareElement( textureFlare3, 70, 0.7 ) );
					lensflare.addElement( new LensflareElement( textureFlare3, 120, 0.9 ) );
					lensflare.addElement( new LensflareElement( textureFlare3, 70, 1 ) );
					light.add( lensflare );

				}

				// renderer

				renderer = that.renderer = new  THREE.WebGLRenderer({canvas:canvas3d, antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.outputEncoding = THREE.sRGBEncoding;
				container.appendChild( renderer.domElement );

				//

				controls = new FlyControls( camera, renderer.domElement );

				controls.movementSpeed = 2500;
				controls.domElement = container;
				controls.rollSpeed = Math.PI / 6;
				controls.autoForward = false;
				controls.dragToLook = false;

				// stats

				stats = new Stats();
				container.appendChild( stats.dom );

				// events

				 window.addEventListener( 'resize', onWindowResize );

			}

			//

			function onWindowResize() {

				renderer.setSize( window.innerWidth, window.innerHeight );

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

			}

			//

			function animate() {

				requestAnimationFrame( animate );

				render();
				////stats.update();

			}

			function render() {

				const delta = clock.getDelta();

				controls.update( delta );
				renderer.render( scene, camera );

			}
    }
})