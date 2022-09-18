// webgl/webgl_geometry_cube.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
Page({
	async onLoad() {
var that = this
        const canvas = this.canvas = await document.createElementAsync("canvas","webgl")

        let camera, scene, renderer;
        let mesh;

        init();
        animate();

        function init() {

            camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
            camera.position.z = 400;

            scene = new THREE.Scene();

            const texture = new THREE.TextureLoader().load( 'textures/crate.gif' );

            const geometry = new THREE.BoxGeometry( 200, 200, 200 );
            const material = new THREE.MeshBasicMaterial( { map: texture } );

            mesh = new THREE.Mesh( geometry, material );
            scene.add( mesh );

            renderer = that.renderer = new THREE.WebGLRenderer( {canvas, antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );

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

            mesh.rotation.x += 0.005;
            mesh.rotation.y += 0.01;

            renderer.render( scene, camera );

        }
    }
})