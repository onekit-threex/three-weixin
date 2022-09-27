import {
    document,
    window,
    Event,
    requestAnimationFrame,
    cancelAnimationFrame
} from 'dhtml-weixin';
import * as THREE from './three/Three.js';
import {
    OrbitControls
} from './jsm/controls/OrbitControls.js';
import {
    GLTFLoader
} from './jsm/loaders/GLTFLoader.js';

var requestId
Page({
   onUnload(){
    cancelAnimationFrame(requestId, this.canvas)
    this.renderer.dispose()
    this.renderer.forceContextLoss()
    this.renderer.context = null
    this.renderer.domElement = null
    this.renderer = null
   },
       webgl_touch(e) {
        const web_e = Event.fix(e)
        this.canvas.dispatchEvent(web_e)
    },
async onLoad() {
        const canvas3d = this.canvas =await document.createElementAsync("canvas", "webgl")
        var that = this
        let scene, camera, stats,renderer;
        let model;

        init();

        function init() {

            const container = document.getElementById( 'container' );

            scene = new THREE.Scene();
            //scene.background = new THREE.Color( 0xa0a0a0 );
            //scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );

            const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
            hemiLight.position.set( 0, 20, 0 );
            scene.add( hemiLight );

            const loader = new GLTFLoader();
            loader.load( 'ikea/shafa/index.glb', function ( gltf ) {

                model = gltf.scene;
                scene.add( model );
                model.scale.setScalar(0.01)
                animate();

            } );

          renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
          that.renderer = renderer
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
          //  renderer.outputEncoding = THREE.sRGBEncoding;
            renderer.shadowMap.enabled = true;
            container.appendChild( renderer.domElement );

            // camera
            camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 100 );
            camera.position.set( - 1, 2, 3 );
            const controls = new OrbitControls( camera, renderer.domElement );
            controls.enablePan = false;
            controls.enableZoom = true;
            controls.target.set( 0, 1, 0 );
            controls.update();

        }



        function animate() {

          requestId = requestAnimationFrame(animate);



            renderer.render( scene, camera );

        }
        
    }
})