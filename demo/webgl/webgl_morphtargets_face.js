// webgl/webgl_morphtargets_face.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from 'three-weixin';

import Stats from './jsm/libs/stats.module.js';

import { OrbitControls } from './jsm/controls/OrbitControls.js';

import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { KTX2Loader } from './jsm/loaders/KTX2Loader.js';
import { MeshoptDecoder } from './jsm/libs/meshopt_decoder.module.js';

import { RoomEnvironment } from './jsm/environments/RoomEnvironment.js';

import { GUI } from './jsm/libs/lil-gui.module.min.js';
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
        
			init();

			function init() {

				let mixer;

				const clock = new THREE.Clock();

				const container = document.createElement( 'div' );
				document.body.appendChild( container );

				const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 20 );
				camera.position.set( - 1.8, 0.8, 3 );

				const scene = new THREE.Scene();

				const renderer = that.renderer = new  THREE.WebGLRenderer({canvas:canvas3d, antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );

				renderer.toneMapping = THREE.ACESFilmicToneMapping;
				renderer.outputEncoding = THREE.sRGBEncoding;

				container.appendChild( renderer.domElement );

				const ktx2Loader = new KTX2Loader()
					.setTranscoderPath( 'js/libs/basis/' )
					.detectSupport( renderer );

				new GLTFLoader()
					.setKTX2Loader( ktx2Loader )
					.setMeshoptDecoder( MeshoptDecoder )
					.load( 'models/gltf/facecap.glb', ( gltf ) => {

						const mesh = gltf.scene.children[ 0 ];

						scene.add( mesh );

						mixer = new THREE.AnimationMixer( mesh );

						mixer.clipAction( gltf.animations[ 0 ] ).play();

						// GUI

						const head = mesh.getObjectByName( 'mesh_2' );
						const influences = head.morphTargetInfluences;

						const gui = new GUI();
						gui.close();

						for ( const [ key, value ] of Object.entries( head.morphTargetDictionary ) ) {

							gui.add( influences, value, 0, 1, 0.01 )
								.name( key.replace( 'blendShape1.', '' ) )
								.listen( influences );

						}

					} );

				const environment = new RoomEnvironment();
				const pmremGenerator = new THREE.PMREMGenerator( renderer );

				scene.background = new THREE.Color( 0x666666 );
				scene.environment = pmremGenerator.fromScene( environment ).texture;

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.enableDamping = true;
				controls.minDistance = 2.5;
				controls.maxDistance = 5;
				controls.minAzimuthAngle = - Math.PI / 2;
				controls.maxAzimuthAngle = Math.PI / 2;
				controls.maxPolarAngle = Math.PI / 1.8;
				controls.target.set( 0, 0.15, - 0.2 );

				const stats = new Stats();
				container.appendChild( stats.dom );

				renderer.setAnimationLoop( () => {

					const delta = clock.getDelta();

					if ( mixer ) {

						mixer.update( delta );

					}

					renderer.render( scene, camera );

					controls.update();

					stats.update();

				} );

				window.addEventListener( 'resize', () => {

					camera.aspect = window.innerWidth / window.innerHeight;
					camera.updateProjectionMatrix();

					renderer.setSize( window.innerWidth, window.innerHeight );

				} );

			}
    }
})