// webgl/webgl_loader_collada.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
import Stats from './jsm/libs/stats.module.js';

import { ColladaLoader } from './jsm/loaders/ColladaLoader.js';
Page({
	async onLoad() {
var that = this
        const canvas3d = this.canvas = await document.createElementAsync("canvas","webgl")

        let container, stats, clock;
        let camera, scene, renderer, elf;

        init();
        animate();

        function init() {

            container = document.getElementById( 'container' );

            camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 2000 );
            camera.position.set( 8, 10, 8 );
            camera.lookAt( 0, 3, 0 );

            scene = new THREE.Scene();

            clock = new THREE.Clock();

            // loading manager

            const loadingManager = new THREE.LoadingManager( function () {

                scene.add( elf );

            } );

            // collada

            const loader = new ColladaLoader( loadingManager );
            loader.load( 'models/collada/elf/elf.dae', function ( collada ) {

                elf = collada.scene;

            } );

            //

            const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
            scene.add( ambientLight );

            const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
            directionalLight.position.set( 1, 1, 0 ).normalize();
            scene.add( directionalLight );

            //

            renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
            renderer.outputEncoding = THREE.sRGBEncoding;
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            container.appendChild( renderer.domElement );

            //

            stats = new Stats();
            container.appendChild( stats.dom );

            //

            window.addEventListener( 'resize', onWindowResize );

        }

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

        }

        function animate() {

            requestAnimationFrame( animate );

            render();
          //  //stats.update();

        }

        function render() {

            const delta = clock.getDelta();

            if ( elf !== undefined ) {

                elf.rotation.z += delta * 0.5;

            }

            renderer.render( scene, camera );

        }

    }
})