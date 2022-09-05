// webgl/webgl_loader_ttf.js
import {document,window,requestAnimationFrame} from 'dhtml-weixin';
import * as THREE from '../three-weixin/index.js';
import { OrbitControls } from '../jsm/controls/OrbitControls.js';
import { USDZLoader } from '../jsm/loaders/USDZLoader.js';
Page({
	async onLoad() {
        getApp().canvas = await document.createElementAsync("canvas","webgl")
        let camera, controls, scene, renderer;

        init();
        animate();

        function init() {

            camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100 );
            camera.position.set( 0, 0.75, - 1 );

            scene = new THREE.Scene();
            scene.background = new THREE.Color( 0xeeeeee );

            scene.add( new THREE.GridHelper( 2, 4 ) );

            const light = new THREE.DirectionalLight( 0xffffff );
            light.position.set( 1, 1, 1 );
            scene.add( light );

            const light2 = new THREE.HemisphereLight( 0xffffff, 0x888888 );
            scene.add( light2 );

            // renderer
            renderer = new THREE.WebGLRenderer( { antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );

            controls = new OrbitControls( camera, renderer.domElement );

            const loader = new USDZLoader();
            loader.load( 'models/usdz/saeukkang.usdz', function ( usd ) {

                scene.add( usd );

            } );

            window.addEventListener( 'resize', onWindowResize );

        }

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

        }

        function animate() {

            requestAnimationFrame( animate );

            renderer.render( scene, camera );

        }
    }
})