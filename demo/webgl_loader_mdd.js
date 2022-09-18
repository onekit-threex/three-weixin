// webgl/webgl_loader_mdd.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
import { MDDLoader } from './jsm/loaders/MDDLoader.js';
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

        
			let camera, scene, renderer, mixer, clock;

			init();

			function init() {

				scene = new THREE.Scene();

				camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 100 );
				camera.position.set( 8, 8, 8 );
				camera.lookAt( scene.position );

				clock = new THREE.Clock();

				//

				const loader = new MDDLoader();
				loader.load( 'models/mdd/cube.mdd', function ( result ) {

					const morphTargets = result.morphTargets;
					const clip = result.clip;
					// clip.optimize(); // optional

					const geometry = new THREE.BoxGeometry();
					geometry.morphAttributes.position = morphTargets; // apply morph targets

					const material = new THREE.MeshNormalMaterial();

					const mesh = new THREE.Mesh( geometry, material );
					scene.add( mesh );

					mixer = new THREE.AnimationMixer( mesh );
					mixer.clipAction( clip ).play(); // use clip

					animate();

				} );

				//

				renderer = that.renderer = new  THREE.WebGLRenderer({canvas:canvas3d, antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestAnimationFrame( animate );

				const delta = clock.getDelta();

				if ( mixer ) mixer.update( delta );

				renderer.render( scene, camera );

			}

    }
})