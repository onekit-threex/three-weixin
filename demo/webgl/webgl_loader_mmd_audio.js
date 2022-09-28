// webgl/webgl_loader_mmd_audio.js
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

        let mesh, camera, scene, renderer, effect;
        let helper;

        let ready = false;

        const clock = new THREE.Clock();

        const startButton = document.getElementById( 'startButton' );
        var Ammo = require("./jsm/ammo/index")

            Ammo().then( function () {
                init();
                animate();

            } );

        function init() {

            const overlay = document.getElementById( 'overlay' );
            overlay.remove();

            const container = document.createElement( 'div' );
            document.body.appendChild( container );

            camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );

            // scene

            scene = new THREE.Scene();
            scene.background = new THREE.Color( 0xffffff );

            scene.add( new THREE.PolarGridHelper( 30, 10 ) );

            const listener = new THREE.AudioListener();
            camera.add( listener );
            scene.add( camera );

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
            const vmdFiles = [ 'models/mmd/vmds/wavefile_v2.vmd' ];
            const cameraFiles = [ 'models/mmd/vmds/wavefile_camera.vmd' ];
            const audioFile = 'models/mmd/audios/wavefile_short.mp3';
            const audioParams = { delayTime: 160 * 1 / 30 };

            helper = new MMDAnimationHelper();

            const loader = new MMDLoader();

            loader.loadWithAnimation( modelFile, vmdFiles, function ( mmd ) {

                mesh = mmd.mesh;

                helper.add( mesh, {
                    animation: mmd.animation,
                    physics: true
                } );

                loader.loadAnimation( cameraFiles, camera, function ( cameraAnimation ) {

                    helper.add( camera, {
                        animation: cameraAnimation
                    } );

                    new THREE.AudioLoader().load( audioFile, function ( buffer ) {

                        const audio = new THREE.Audio( listener ).setBuffer( buffer );

                        helper.add( audio, audioParams );
                        scene.add( mesh );

                        ready = true;

                    }, onProgress, null );

                }, onProgress, null );

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

            if ( ready ) {

                helper.update( clock.getDelta() );

            }

            effect.render( scene, camera );

        }
    }
})