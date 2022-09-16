// webgl/webgl_loader_texture_exr.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin';
import * as THREE from 'three-weixin';

import { GUI } from './jsm/libs/lil-gui.module.min.js';

import { EXRLoader } from './jsm/loaders/EXRLoader.js';
Page({
	async onLoad() {
var that = this
        this.canvas = await document.createElementAsync("canvas","webgl")

        const params = {
            exposure: 2.0
        };

        let renderer, scene, camera;

        init();

        function init() {

            renderer = that.renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );

            renderer.toneMapping = THREE.ReinhardToneMapping;
            renderer.toneMappingExposure = params.exposure;

            renderer.outputEncoding = THREE.sRGBEncoding;

            scene = new THREE.Scene();

            const aspect = window.innerWidth / window.innerHeight;

            camera = new THREE.OrthographicCamera( - aspect, aspect, 1, - 1, 0, 1 );

            new EXRLoader()
                .load( 'textures/memorial.exr', function ( texture, textureData ) {

                    // memorial.exr is NPOT

                    //console.log( textureData );
                    //console.log( texture );

                    // EXRLoader sets these default settings
                    //texture.generateMipmaps = false;
                    //texture.minFilter = LinearFilter;
                    //texture.magFilter = LinearFilter;

                    const material = new THREE.MeshBasicMaterial( { map: texture } );

                    const quad = new THREE.PlaneGeometry( 1.5 * textureData.width / textureData.height, 1.5 );

                    const mesh = new THREE.Mesh( quad, material );

                    scene.add( mesh );

                    render();

                } );

            //

            const gui = new GUI();

            gui.add( params, 'exposure', 0, 4, 0.01 ).onChange( render );
            gui.open();

            //

            window.addEventListener( 'resize', onWindowResize );

        }

        function onWindowResize() {

            const aspect = window.innerWidth / window.innerHeight;

            const frustumHeight = camera.top - camera.bottom;

            camera.left = - frustumHeight * aspect / 2;
            camera.right = frustumHeight * aspect / 2;

            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

            render();

        }

        //

        function render() {

            renderer.toneMappingExposure = params.exposure;

            renderer.render( scene, camera );

        }
    }
})