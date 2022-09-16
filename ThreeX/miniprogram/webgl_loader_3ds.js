// webgl/webgl_loader_3ds.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin';

import { TrackballControls } from './jsm/controls/TrackballControls.js';
import { TDSLoader } from './jsm/loaders/TDSLoader.js';

const THREE = requirePlugin('ThreeX');
Page({
	async onLoad() {
var that = this
        this.canvas = await document.createElementAsync("canvas","webgl")
        let container, controls;
        let camera, scene, renderer;

        init();
        animate();

        function init() {

            container = document.createElement( 'div' );
            document.body.appendChild( container );

            camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 10 );
            camera.position.z = 2;

            scene = new THREE.Scene();
            scene.add( new THREE.HemisphereLight() );

            const directionalLight = new THREE.DirectionalLight( 0xffeedd );
            directionalLight.position.set( 0, 0, 2 );
            scene.add( directionalLight );

            //3ds files dont store normal maps
            const normal = new THREE.TextureLoader().load( 'models/3ds/portalgun/textures/normal.jpg' );

            const loader = new TDSLoader( );
            loader.setResourcePath( 'models/3ds/portalgun/textures/' );
            loader.load( 'models/3ds/portalgun/portalgun.3ds', function ( object ) {

                object.traverse( function ( child ) {

                    if ( child.isMesh ) {

                        child.material.specular.setScalar( 0.1 );
                        child.material.normalMap = normal;

                    }

                } );

                scene.add( object );

            } );

            renderer = that.renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.outputEncoding = THREE.sRGBEncoding;
            container.appendChild( renderer.domElement );

            controls = new TrackballControls( camera, renderer.domElement );

            window.addEventListener( 'resize', resize );

        }

        function resize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

        }

        function animate() {

            controls.update();
            renderer.render( scene, camera );

            requestAnimationFrame( animate );

        }
    }
})