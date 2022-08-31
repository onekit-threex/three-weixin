// webgl/webgl_test_memory2.js
import {document,window,requestAnimationFrame} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
const onekit = {
    fragmentShader:`void main() {

        if ( mod ( gl_FragCoord.x, 4.0001 ) < 1.0 || mod ( gl_FragCoord.y, 4.0001 ) < 1.0 )

            gl_FragColor = vec4( XXX, 1.0 );

        else

            gl_FragColor = vec4( 1.0 );

    }`,
    vertexShader:`	void main() {

        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_Position = projectionMatrix * mvPosition;

    }`
}
Page({
	async onLoad() {
        getApp().canvas = await document.createElementAsync("canvas","webgl")

        const N = 100;

        let container;

        let camera, scene, renderer;

        let geometry;

        const meshes = [];

        let fragmentShader, vertexShader;

        init();
        setInterval( render, 1000 / 60 );

        function init() {

            container = document.createElement( 'div' );
            document.body.appendChild( container );

            vertexShader = onekit[ 'vertexShader' ];
            fragmentShader = onekit[ 'fragmentShader' ];

            camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
            camera.position.z = 2000;

            scene = new THREE.Scene();
            scene.background = new THREE.Color( 0xffffff );

            geometry = new THREE.SphereGeometry( 15, 64, 32 );

            for ( let i = 0; i < N; i ++ ) {

                const material = new THREE.ShaderMaterial( { vertexShader: vertexShader, fragmentShader: generateFragmentShader() } );

                const mesh = new THREE.Mesh( geometry, material );

                mesh.position.x = ( 0.5 - Math.random() ) * 1000;
                mesh.position.y = ( 0.5 - Math.random() ) * 1000;
                mesh.position.z = ( 0.5 - Math.random() ) * 1000;

                scene.add( mesh );

                meshes.push( mesh );

            }

            renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            container.appendChild( renderer.domElement );

        }

        //

        function generateFragmentShader() {

            return fragmentShader.replace( 'XXX', Math.random() + ',' + Math.random() + ',' + Math.random() );

        }

        function render() {

            for ( let i = 0; i < N; i ++ ) {

                const mesh = meshes[ i ];
                mesh.material = new THREE.ShaderMaterial( { vertexShader: vertexShader, fragmentShader: generateFragmentShader() } );

            }

            renderer.render( scene, camera );

            console.log( 'before', renderer.info.programs.length );

            for ( let i = 0; i < N; i ++ ) {

                const mesh = meshes[ i ];
                mesh.material.dispose();

            }

            console.log( 'after', renderer.info.programs.length );

        }
    }
})