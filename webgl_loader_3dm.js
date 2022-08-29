// webgl/webgl_loader_3dm.js
import {document,window,requestAnimationFrame} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { Rhino3dmLoader } from './jsm/loaders/3DMLoader.js';

import { GUI } from './jsm/libs/lil-gui.module.min.js';
Page({
    onUnload(){
        if(getApp().worder){getApp().worder.terminate()}
    },
	async onLoad() {
        getApp().canvas = await document.createElementAsync("canvas","webgl")

        let camera, scene, renderer;
        let controls, gui;

        init();
        animate();

        function init() {

            THREE.Object3D.DefaultUp = new THREE.Vector3( 0, 0, 1 );

            renderer = new THREE.WebGLRenderer( { antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.outputEncoding = THREE.sRGBEncoding;
            document.body.appendChild( renderer.domElement );

            camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
            camera.position.set( 26, - 40, 5 );

            scene = new THREE.Scene();

            const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
            directionalLight.position.set( 0, 0, 2 );
            scene.add( directionalLight );

            const loader = new Rhino3dmLoader();
            loader.setLibraryPath( 'cdn.jsdelivr.net/npm/rhino3dm@7.11.1/' );
            loader.load( 'models/3dm/Rhino_Logo.3dm', function ( object ) {

                scene.add( object );
                initGUI( object.userData.layers );

                // hide spinner
                document.getElementById( 'loader' ).style.display = 'none';

            } );

            controls = new OrbitControls( camera, renderer.domElement );

            window.addEventListener( 'resize', resize );

        }

        function resize() {

            const width = window.innerWidth;
            const height = window.innerHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            renderer.setSize( width, height );

        }

        function animate() {

            controls.update();
            renderer.render( scene, camera );

            requestAnimationFrame( animate );

        }

        function initGUI( layers ) {

            gui = new GUI( { title: 'layers' } );

            for ( let i = 0; i < layers.length; i ++ ) {

                const layer = layers[ i ];
                gui.add( layer, 'visible' ).name( layer.name ).onChange( function ( val ) {

                    const name = this.object.name;

                    scene.traverse( function ( child ) {

                        if ( child.userData.hasOwnProperty( 'attributes' ) ) {

                            if ( 'layerIndex' in child.userData.attributes ) {

                                const layerName = layers[ child.userData.attributes.layerIndex ].name;

                                if ( layerName === name ) {

                                    child.visible = val;
                                    layer.visible = val;

                                }

                            }

                        }

                    } );

                } );

            }

        }
    }
})