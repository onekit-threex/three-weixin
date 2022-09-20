// webgl/webgl_loader_kmz.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { KMZLoader } from './jsm/loaders/KMZLoader.js';
Page({
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

				const light = new THREE.DirectionalLight( 0xffffff );
				light.position.set( 0.5, 1.0, 0.5 ).normalize();

				scene.add( light );

				camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 500 );

				camera.position.y = 5;
				camera.position.z = 10;

				scene.add( camera );

				const grid = new THREE.GridHelper( 50, 50, 0xffffff, 0x333333 );
				scene.add( grid );

				renderer = that.renderer = new  THREE.WebGLRenderer({canvas:canvas3d, antialias: true } );
				renderer.outputEncoding = THREE.sRGBEncoding;
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				const loader = new KMZLoader();
				loader.load( 'models/kmz/Box.kmz', function ( kmz ) {

					kmz.scene.position.y = 0.5;
					scene.add( kmz.scene );
					render();

				} );

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.addEventListener( 'change', render );
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