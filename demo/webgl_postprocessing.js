// webgl_postprocessing/webgl_postprocessing.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin';
import * as THREE from 'three-weixin';

import { EffectComposer } from './jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './jsm/postprocessing/RenderPass.js';
import { ShaderPass } from './jsm/postprocessing/ShaderPass.js';

import { RGBShiftShader } from './jsm/shaders/RGBShiftShader.js';
import { DotScreenShader } from './jsm/shaders/DotScreenShader.js';

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
let camera, renderer, composer;
let object;

init();
animate();

function init() {

    renderer = that.renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    //

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 400;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0x000000, 1, 1000 );

    object = new THREE.Object3D();
    scene.add( object );

    const geometry = new THREE.SphereGeometry( 1, 4, 4 );
    const material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );

    for ( let i = 0; i < 100; i ++ ) {

        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.set( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 ).normalize();
        mesh.position.multiplyScalar( Math.random() * 400 );
        mesh.rotation.set( Math.random() * 2, Math.random() * 2, Math.random() * 2 );
        mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50;
        object.add( mesh );

    }

    scene.add( new THREE.AmbientLight( 0x222222 ) );

    const light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 1, 1, 1 );
    scene.add( light );

    // postprocessing

    composer = new EffectComposer( renderer );
    composer.addPass( new RenderPass( scene, camera ) );

    const effect1 = new ShaderPass( DotScreenShader );
    effect1.uniforms[ 'scale' ].value = 4;
    composer.addPass( effect1 );

    const effect2 = new ShaderPass( RGBShiftShader );
    effect2.uniforms[ 'amount' ].value = 0.0015;
    composer.addPass( effect2 );

    //

    window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    composer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    requestAnimationFrame( animate );

    object.rotation.x += 0.005;
    object.rotation.y += 0.01;

    composer.render();

}

}
})