// webgl_nodes/webgl_nodes_materialx_noise.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import { MeshPhysicalNodeMaterial, add, mul, normalWorld, saturate, timerLocal } from '../jsm/nodes/Nodes.js';

			import {
				mx_perlin_noise_float,
				mx_cell_noise_float,
				mx_worley_noise_float,
				mx_fractal_noise_float
			} from '../jsm/nodes/materialx/functions/lib/mx_noise.js';

			import { nodeFrame } from '../jsm/renderers/webgl/nodes/WebGLNodes.js';

			import Stats from '../jsm/libs/stats.module.js';

			import { OrbitControls } from '../jsm/controls/OrbitControls.js';
			import { HDRCubeTextureLoader } from '../jsm/loaders/HDRCubeTextureLoader.js';

import { GUI } from '../jsm/libs/lil-gui.module.min.js';

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
  async onLoad(){
const canvas3d = this.canvas =await document.createElementAsync("canvas","webgl")
var that = this
let container, stats;

let camera, scene, renderer;

let particleLight;
let group;

init();
animate();

function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;

    scene = new THREE.Scene();

    group = new THREE.Group();
    scene.add( group );

    new HDRCubeTextureLoader()
        .setPath( 'textures/cube/pisaHDR/' )
        .load( [ 'px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr' ],
            function ( hdrTexture ) {

                const geometry = new THREE.SphereGeometry( 80, 64, 32 );

                const offsetNode = timerLocal();
                const customUV = add( mul( normalWorld, 10 ), offsetNode );

                // left top

                let material = new MeshPhysicalNodeMaterial();
                material.colorNode = mx_perlin_noise_float( customUV );

                let mesh = new THREE.Mesh( geometry, material );
                mesh.position.x = - 100;
                mesh.position.y = 100;
                group.add( mesh );

                // right top

                material = new MeshPhysicalNodeMaterial();
                material.colorNode = mx_cell_noise_float( customUV );

                mesh = new THREE.Mesh( geometry, material );
                mesh.position.x = 100;
                mesh.position.y = 100;
                group.add( mesh );

                // left bottom

                material = new MeshPhysicalNodeMaterial();
                material.colorNode = mx_worley_noise_float( customUV, 1, 1 );

                mesh = new THREE.Mesh( geometry, material );
                mesh.position.x = - 100;
                mesh.position.y = - 100;
                group.add( mesh );

                // right bottom

                material = new MeshPhysicalNodeMaterial();
                material.colorNode = saturate( mul( add( mx_fractal_noise_float( mul( customUV, .2 ), 7, 2, .7 ), 1 ), .5 ) );

                mesh = new THREE.Mesh( geometry, material );
                mesh.position.x = 100;
                mesh.position.y = - 100;
                group.add( mesh );

                //

                scene.background = hdrTexture;
                scene.environment = hdrTexture;

            }

        );

    // LIGHTS

    particleLight = new THREE.Mesh(
        new THREE.SphereGeometry( 4, 8, 8 ),
        new THREE.MeshBasicMaterial( { color: 0xffffff } )
    );
    scene.add( particleLight );

    particleLight.add( new THREE.PointLight( 0xffffff, 1 ) );

    renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    //

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    //

    renderer.outputEncoding = THREE.sRGBEncoding;

    //

    stats = new Stats();
    container.appendChild( stats.dom );

    // EVENTS

    new OrbitControls( camera, renderer.domElement );

    window.addEventListener( 'resize', onWindowResize );

}

//

function onWindowResize() {

    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize( width, height );

}

//

function animate() {

    requestId = requestAnimationFrame(animate);

    nodeFrame.update();

    render();

    stats.update();

}

function render() {

    const timer = Date.now() * 0.00025;

    particleLight.position.x = Math.sin( timer * 7 ) * 300;
    particleLight.position.y = Math.cos( timer * 5 ) * 400;
    particleLight.position.z = Math.cos( timer * 3 ) * 300;

    for ( let i = 0; i < group.children.length; i ++ ) {

        const child = group.children[ i ];
        child.rotation.y += 0.005;

    }

    renderer.render( scene, camera );

}
}
})