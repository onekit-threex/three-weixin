// webgl_nodes/webgl_nodes_loader_gltf_iridescence.js
import {document,window,requestAnimationFrame,Event} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
import { NodeMaterial, uv, add, mul, vec2, checker, float, timerLocal } from './jsm/nodes/Nodes.js';

import { nodeFrame } from './jsm/renderers/webgl/nodes/WebGLNodes.js';

import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { RGBELoader } from './jsm/loaders/RGBELoader.js';
Page({
  async onLoad(){
getApp().canvas = await document.createElementAsync("canvas","webgl")


let renderer, scene, camera, controls;

init().catch( function ( err ) {

    console.error( err );

} );

async function init() {

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.setAnimationLoop( render );
    document.body.appendChild( renderer.domElement );

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.25, 20 );
    camera.position.set( 0.35, 0.05, 0.35 );

    controls = new OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', render );
    controls.target.set( 0, 0.2, 0 );
    controls.update();

    const rgbeLoader = new RGBELoader()
        .setPath( 'textures/equirectangular/' );

    const gltfLoader = new GLTFLoader().setPath( 'models/gltf/' );

    const [ texture, gltf ] = await Promise.all( [
        rgbeLoader.loadAsync( 'venice_sunset_1k.hdr' ),
        gltfLoader.loadAsync( 'IridescenceLamp.glb' ),
    ] );

    // nodes

    gltf.scene.traverse( mesh => {

        const material = mesh.material;

        if ( material && material.iridescence > 0 ) {

            const iridescenceFactorNode = checker( mul( add( uv(), vec2( timerLocal( - .05 ), 0 ) ), 20 ) );

            const nodeMaterial = NodeMaterial.fromMaterial( material );
            nodeMaterial.iridescenceNode = iridescenceFactorNode;
            nodeMaterial.iridescenceIORNode = float( 1.3 );
            nodeMaterial.iridescenceThicknessNode = float( 400 );

            mesh.material = nodeMaterial;

        }

    } );

    // environment

    texture.mapping = THREE.EquirectangularReflectionMapping;

    scene.background = texture;
    scene.environment = texture;

    // model

    scene.add( gltf.scene );

    window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function render() {

    nodeFrame.update();

    renderer.render( scene, camera );

}
}
})
