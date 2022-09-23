// webgl/webgl_materials_texture_rotation.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
import { GUI } from './jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
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

        
			let mesh, renderer, scene, camera;

			let gui;

			const API = {
				offsetX: 0,
				offsetY: 0,
				repeatX: 0.25,
				repeatY: 0.25,
				rotation: Math.PI / 4, // positive is counter-clockwise
				centerX: 0.5,
				centerY: 0.5
			};

			init();

			function init() {

				renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				scene = new THREE.Scene();

				camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.set( 10, 15, 25 );
				scene.add( camera );

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.addEventListener( 'change', render );
				controls.minDistance = 20;
				controls.maxDistance = 50;
				controls.maxPolarAngle = Math.PI / 2;

				const geometry = new THREE.BoxGeometry( 10, 10, 10 );

				new THREE.TextureLoader().load( 'textures/uv_grid_opengl.jpg', function ( texture ) {

					texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
					texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

					//texture.matrixAutoUpdate = false; // default true; set to false to update texture.matrix manually

					const material = new THREE.MeshBasicMaterial( { map: texture } );

					mesh = new THREE.Mesh( geometry, material );
					scene.add( mesh );

					updateUvTransform();

					initGui();

					render();

				} );

				window.addEventListener( 'resize', onWindowResize );

			}

			function render() {

				renderer.render( scene, camera );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;

				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

				render();

			}

			function updateUvTransform() {

				const texture = mesh.material.map;

				if ( texture.matrixAutoUpdate === true ) {

					texture.offset.set( API.offsetX, API.offsetY );
					texture.repeat.set( API.repeatX, API.repeatY );
					texture.center.set( API.centerX, API.centerY );
					texture.rotation = API.rotation; // rotation is around [ 0.5, 0.5 ]

				} else {

					// one way...
					//texture.matrix.setUvTransform( API.offsetX, API.offsetY, API.repeatX, API.repeatY, API.rotation, API.centerX, API.centerY );

					// another way...
					texture.matrix
					    .identity()
					    .translate( - API.centerX, - API.centerY )
					    .rotate( API.rotation )					// I don't understand how rotation can preceed scale, but it seems to be required...
					    .scale( API.repeatX, API.repeatY )
					    .translate( API.centerX, API.centerY )
					    .translate( API.offsetX, API.offsetY );

				}

				render();

			}

			function initGui() {

				gui = new GUI();

				gui.add( API, 'offsetX', 0.0, 1.0 ).name( 'offset.x' ).onChange( updateUvTransform );
				gui.add( API, 'offsetY', 0.0, 1.0 ).name( 'offset.y' ).onChange( updateUvTransform );
				gui.add( API, 'repeatX', 0.25, 2.0 ).name( 'repeat.x' ).onChange( updateUvTransform );
				gui.add( API, 'repeatY', 0.25, 2.0 ).name( 'repeat.y' ).onChange( updateUvTransform );
				gui.add( API, 'rotation', - 2.0, 2.0 ).name( 'rotation' ).onChange( updateUvTransform );
				gui.add( API, 'centerX', 0.0, 1.0 ).name( 'center.x' ).onChange( updateUvTransform );
				gui.add( API, 'centerY', 0.0, 1.0 ).name( 'center.y' ).onChange( updateUvTransform );

			}

    }
})