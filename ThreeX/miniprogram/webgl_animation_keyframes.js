import {document,window,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin';


import Stats from './jsm/libs/stats.module.js';

import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { RoomEnvironment } from './jsm/environments/RoomEnvironment.js';

import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from './jsm/loaders/DRACOLoader.js';
var requestId;
const THREE = requirePlugin('ThreeX');
Page({
    webgl_touch(e){
        const web_e = Event.fix(e)
        window.dispatchEvent(web_e)
        this.renderer && this.renderer.dispatchEvent(web_e)
    },
    onUnload(){
		cancelAnimationFrame(requestId)
this.dracoLoader.dispose()
if( this.renderer){
        this.renderer.dispose()
        this.renderer.forceContextLoss()
        this.renderer.context = null
        this.renderer.domElement = null
        this.renderer = null  }
        this.dracoLoader.dispose()
    },
    async onLoad() {
var that = this
      this.canvas = await document.createElementAsync("canvas","webgl")

        let mixer;

        const clock = new THREE.Clock();
        const container = document.getElementById( 'container' );

        const stats =  new Stats();
        container.appendChild( stats.dom );
        var renderer = that.renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.outputEncoding = THREE.sRGBEncoding;
        container.appendChild( renderer.domElement );

        const pmremGenerator = new THREE.PMREMGenerator( renderer );

        const scene = new THREE.Scene();
          /////////////////////////////////
    var AmbientLight = new THREE.AmbientLight(0xffffff,1)
    AmbientLight.position.set(0, 0, 100)
    scene.add(AmbientLight)
    ///////////////////
        scene.background = new THREE.Color( 0xbfe3dd );
        scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.04 ).texture;

        const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
        camera.position.set( 5, 2, 8 );

        const controls = new OrbitControls( camera, renderer.domElement );
        controls.target.set( 0, 0.5, 0 );
        controls.update();
        controls.enablePan = false;
        controls.enableDamping = true;

        const dracoLoader =this.dracoLoader= new DRACOLoader();
        dracoLoader.setDecoderPath( 'js/libs/draco/gltf/' );

        const loader = new GLTFLoader();
        loader.setDRACOLoader( dracoLoader );
    
        loader.load( 'models/gltf/LittlestTokyo.glb', function ( gltf ) {
            //console.error("xxxxxxx",gltf)
            const model = gltf.scene;
            model.position.set( 1, 1, 0 );
            model.scale.set( 0.01, 0.01, 0.01 );
            scene.add( model );

            mixer = new THREE.AnimationMixer( model );
            mixer.clipAction( gltf.animations[ 0 ] ).play();

            animate();

        }, undefined, function ( e ) {

            console.error( e );

        } );
    /*

        window.onresize = function () {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

        };

*/
        function animate() {

            requestId = requestAnimationFrame( animate );

            const delta = clock.getDelta();

            mixer.update( delta );

           // controls.update();

           // //stats.update();

            renderer.render( scene, camera );

        }

    }
})