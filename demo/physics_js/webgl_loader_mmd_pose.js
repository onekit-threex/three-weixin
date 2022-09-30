// webgl/webgl_loader_mmd_pose.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';


import { OutlineEffect } from './jsm/effects/OutlineEffect.js';
import { MMDLoader } from './jsm/loaders/MMDLoader.js';
import { MMDAnimationHelper } from './jsm/animation/MMDAnimationHelper.js';

var requestId
Page({
	   
         onUnload() {
	   		cancelAnimationFrame(requestId, this.canvas)

if( this.renderer){
        this.renderer.dispose()
        this.renderer.forceContextLoss()
        this.renderer.context = null
        this.renderer.domElement = null
        this.renderer = null  }
        
	},
         webgl_touch(e) {
        const web_e = Event.fix(e)
        //window.dispatchEvent(web_e)
        //document.dispatchEvent(web_e)
        this.canvas.dispatchEvent(web_e)
    },
async onLoad() {
        const canvas3d = this.canvas =await document.createElementAsync("canvas","webgl")
var that = this

        let camera, scene, renderer, effect;
			let mesh, helper;

			const vpds = [];
var Ammo = require("./ammo/index")
			Ammo().then( function (  ) {

				Ammo = that.onekit_ammo;

				init();
				animate();

			} );

			function init() {

				const container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
				camera.position.z = 25;

				// scene

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xffffff );

				const ambient = new THREE.AmbientLight( 0x666666 );
				scene.add( ambient );

				const directionalLight = new THREE.DirectionalLight( 0x887766 );
				directionalLight.position.set( - 1, 1, 1 ).normalize();
				scene.add( directionalLight );

				//

				renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				effect = new OutlineEffect( renderer );

				// model

				function onProgress( xhr ) {

					if ( xhr.lengthComputable ) {

						const percentComplete = xhr.loaded / xhr.total * 100;
						console.log( Math.round( percentComplete, 2 ) + '% downloaded' );

					}

				}

				const modelFile = 'models/mmd/miku/miku_v2.pmd';
				const vpdFiles = [
					'models/mmd/vpds/01.vpd',
					'models/mmd/vpds/02.vpd',
					'models/mmd/vpds/03.vpd',
					'models/mmd/vpds/04.vpd',
					'models/mmd/vpds/05.vpd',
					'models/mmd/vpds/06.vpd',
					'models/mmd/vpds/07.vpd',
					'models/mmd/vpds/08.vpd',
					//'models/mmd/vpds/09.vpd',
					//'models/mmd/vpds/10.vpd',
					'models/mmd/vpds/11.vpd'
				];

				helper = new MMDAnimationHelper();

				const loader = new MMDLoader();

				loader.load( modelFile, function ( object ) {

					mesh = object;
					mesh.position.y = - 10;

					scene.add( mesh );

					let vpdIndex = 0;

					function loadVpd() {

						const vpdFile = vpdFiles[ vpdIndex ];

						loader.loadVPD( vpdFile, false, function ( vpd ) {

							vpds.push( vpd );

							vpdIndex ++;

							if ( vpdIndex < vpdFiles.length ) {

								loadVpd();

							} else {


							}

						}, onProgress, null );

					}

					loadVpd();

				}, onProgress, null );

				//

				window.addEventListener( 'resize', onWindowResize );


			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				effect.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function animate() {

				requestId = requestAnimationFrame(animate);
				render();

			}

			function render() {

				effect.render( scene, camera );

			}
    }
})