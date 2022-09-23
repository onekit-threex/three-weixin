// webgl/webgl_loader_amf.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { AMFLoader } from './jsm/loaders/AMFLoader.js';

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

        let camera, scene, renderer;

			init();

			function init() {

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0x999999 );

				scene.add( new THREE.AmbientLight( 0x999999 ) );

				camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 500 );

				// Z is up for objects intended to be 3D printed.

				camera.up.set( 0, 0, 1 );
				camera.position.set( 0, - 9, 6 );

				camera.add( new THREE.PointLight( 0xffffff, 0.8 ) );

				scene.add( camera );

				const grid = new THREE.GridHelper( 50, 50, 0xffffff, 0x555555 );
				grid.rotateOnAxis( new THREE.Vector3( 1, 0, 0 ), 90 * ( Math.PI / 180 ) );
				scene.add( grid );

				renderer = that.renderer = new  THREE.WebGLRenderer({canvas:canvas3d, antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				const loader = new AMFLoader();
				loader.load( 'models/amf/rook.amf', function ( amfobject ) {

					scene.add( amfobject );
					render();

				} );

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.addEventListener( 'change', render );
				controls.target.set( 0, 1.2, 2 );
				controls.update();

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