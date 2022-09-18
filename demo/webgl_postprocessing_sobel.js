// webgl_postprocessing/webgl_postprocessing_sobel.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin';
import * as THREE from 'three-weixin';

import { GUI } from './jsm/libs/lil-gui.module.min.js';

import { OrbitControls } from './jsm/controls/OrbitControls.js';

import { EffectComposer } from './jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './jsm/postprocessing/RenderPass.js';
import { ShaderPass } from './jsm/postprocessing/ShaderPass.js';

import { LuminosityShader } from './jsm/shaders/LuminosityShader.js';
import { SobelOperatorShader } from './jsm/shaders/SobelOperatorShader.js';
Page({
  onUnload(){
    cancelAnimationFrame()
    this.renderer.dispose()
    this.renderer.forceContextLoss()
    this.renderer.context = null
    this.renderer.domElement = null
    this.renderer = null
},
async onLoad(){
var that = this
const canvas = this.canvas = await document.createElementAsync("canvas","webgl")
let camera, scene, renderer, composer;

let effectSobel;

const params = {
    enable: true
};

init();
animate();

function init() {

    //

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 200 );
    camera.position.set( 0, 10, 25 );
    camera.lookAt( scene.position );

    //

    const geometry = new THREE.TorusKnotGeometry( 8, 3, 256, 32, 2, 3 );
    const material = new THREE.MeshPhongMaterial( { color: 0xffff00 } );

    const mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    //

    const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
    scene.add( ambientLight );

    const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
    camera.add( pointLight );
    scene.add( camera );

    //

    renderer = that.renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // postprocessing

    composer = new EffectComposer( renderer );
    const renderPass = new RenderPass( scene, camera );
    composer.addPass( renderPass );

    // color to grayscale conversion

    const effectGrayScale = new ShaderPass( LuminosityShader );
    composer.addPass( effectGrayScale );

    // you might want to use a gaussian blur filter before
    // the next pass to improve the result of the Sobel operator

    // Sobel operator

    effectSobel = new ShaderPass( SobelOperatorShader );
    effectSobel.uniforms[ 'resolution' ].value.x = window.innerWidth * window.devicePixelRatio;
    effectSobel.uniforms[ 'resolution' ].value.y = window.innerHeight * window.devicePixelRatio;
    composer.addPass( effectSobel );

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.minDistance = 10;
    controls.maxDistance = 100;

    //

    const gui = new GUI();

    gui.add( params, 'enable' );
    gui.open();

    //

    window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    composer.setSize( window.innerWidth, window.innerHeight );

    effectSobel.uniforms[ 'resolution' ].value.x = window.innerWidth * window.devicePixelRatio;
    effectSobel.uniforms[ 'resolution' ].value.y = window.innerHeight * window.devicePixelRatio;

}

function animate() {

    requestAnimationFrame( animate );

    if ( params.enable === true ) {

        composer.render();

    } else {

        renderer.render( scene, camera );

    }

}
}
})