// webgl_postprocessing/webgl_postprocessing_ssr.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from 'three-weixin';

import Stats from './jsm/libs/stats.module.js';

import { OrbitControls } from './jsm/controls/OrbitControls.js';

import { GUI } from './jsm/libs/lil-gui.module.min.js';
import { EffectComposer } from './jsm/postprocessing/EffectComposer.js';
import { SSRPass } from './jsm/postprocessing/SSRPass.js';
import { ShaderPass } from './jsm/postprocessing/ShaderPass.js';
import { GammaCorrectionShader } from './jsm/shaders/GammaCorrectionShader.js';
import { ReflectorForSSRPass } from './jsm/objects/ReflectorForSSRPass.js';

import { DRACOLoader } from './jsm/loaders/DRACOLoader.js';

Page({
  onUnload(){
    cancelAnimationFrame()
    this.renderer.dispose()
    this.renderer.forceContextLoss()
    this.renderer.context = null
    this.renderer.domElement = null
    this.renderer = null
},
    webgl_touch(e){
        const web_e = Event.fix(e)
        window.dispatchEvent(web_e)
        this.canvas && this.canvas.dispatchEvent(web_e)
    },
async onLoad(){
var that = this
const canvas3d = this.canvas = await document.createElementAsync("canvas","webgl")

const params = {
    enableSSR: true,
    autoRotate: true,
    otherMeshes: true,
    groundReflector: true,
};
let composer;
let ssrPass;
let gui;
let stats;
let controls;
let camera, scene, renderer;
const otherMeshes = [];
let groundReflector;
const selects = [];

const container = document.querySelector( '#container' );

// Configure and create Draco decoder.
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( 'js/libs/draco/' );
dracoLoader.setDecoderConfig( { type: 'js' } );

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 15 );
    camera.position.set( 0.13271600513224902, 0.3489546826045913, 0.43921296427927076 );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x443333 );
    scene.fog = new THREE.Fog( 0x443333, 1, 4 );

    // Ground
    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry( 8, 8 ),
        new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010 } )
    );
    plane.rotation.x = - Math.PI / 2;
    plane.position.y = - 0.0001;
    // plane.receiveShadow = true;
    scene.add( plane );

    // Lights
    const hemiLight = new THREE.HemisphereLight( 0x443333, 0x111122 );
    scene.add( hemiLight );

    const spotLight = new THREE.SpotLight();
    spotLight.angle = Math.PI / 16;
    spotLight.penumbra = 0.5;
    // spotLight.castShadow = true;
    spotLight.position.set( - 1, 1, 1 );
    scene.add( spotLight );

    dracoLoader.load( 'models/draco/bunny.drc', function ( geometry ) {

        geometry.computeVertexNormals();

        const material = new THREE.MeshStandardMaterial( { color: 0x606060 } );
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.y = - 0.0365;
        scene.add( mesh );
        selects.push( mesh );

        // Release decoder resources.
        dracoLoader.dispose();

    } );

    let geometry, material, mesh;

    geometry = new THREE.BoxGeometry( .05, .05, .05 );
    material = new THREE.MeshStandardMaterial( { color: 'green' } );
    mesh = new THREE.Mesh( geometry, material );
    mesh.position.set( - .12, .025, .015 );
    scene.add( mesh );
    otherMeshes.push( mesh );
    selects.push( mesh );

    geometry = new THREE.IcosahedronGeometry( .025, 4 );
    material = new THREE.MeshStandardMaterial( { color: 'cyan' } );
    mesh = new THREE.Mesh( geometry, material );
    mesh.position.set( - .05, .025, .08 );
    scene.add( mesh );
    otherMeshes.push( mesh );
    selects.push( mesh );

    geometry = new THREE.ConeGeometry( .025, .05, 64 );
    material = new THREE.MeshStandardMaterial( { color: 'yellow' } );
    mesh = new THREE.Mesh( geometry, material );
    mesh.position.set( - .05, .025, - .055 );
    scene.add( mesh );
    otherMeshes.push( mesh );
    selects.push( mesh );

    geometry = new THREE.PlaneGeometry( 1, 1 );
    groundReflector = new ReflectorForSSRPass( geometry, {
        clipBias: 0.0003,
        textureWidth: window.innerWidth,
        textureHeight: window.innerHeight,
        color: 0x888888,
        useDepthTexture: true,
    } );
    groundReflector.material.depthWrite = false;
    groundReflector.rotation.x = - Math.PI / 2;
    groundReflector.visible = false;
    scene.add( groundReflector );

    // renderer
    renderer = that.renderer = new  THREE.WebGLRenderer({canvas:canvas3d, antialias: false } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    //

    controls = new OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true;
    controls.target.set( 0, 0.0635, 0 );
    controls.update();
    controls.enabled = ! params.autoRotate;

    // STATS

    stats = new Stats();
    container.appendChild( stats.dom );

    window.addEventListener( 'resize', onWindowResize );

    // composer

    composer = new EffectComposer( renderer );
    ssrPass = new SSRPass( {
        renderer,
        scene,
        camera,
        width: innerWidth,
        height: innerHeight,
        groundReflector: params.groundReflector ? groundReflector : null,
        selects: params.groundReflector ? selects : null
    } );

    composer.addPass( ssrPass );
    composer.addPass( new ShaderPass( GammaCorrectionShader ) );

    // GUI

    gui = new GUI( { width: 260 } );
    gui.add( params, 'enableSSR' ).name( 'Enable SSR' );
    gui.add( params, 'groundReflector' ).onChange( () => {

        if ( params.groundReflector ) {

            ssrPass.groundReflector = groundReflector,
            ssrPass.selects = selects;

        } else {

            ssrPass.groundReflector = null,
            ssrPass.selects = null;

        }

    } );
    ssrPass.thickness = 0.018;
    gui.add( ssrPass, 'thickness' ).min( 0 ).max( .1 ).step( .0001 );
    ssrPass.infiniteThick = false;
    gui.add( ssrPass, 'infiniteThick' );
    gui.add( params, 'autoRotate' ).onChange( () => {

        controls.enabled = ! params.autoRotate;

    } );

    const folder = gui.addFolder( 'more settings' );
    folder.add( ssrPass, 'fresnel' ).onChange( ()=>{

        groundReflector.fresnel = ssrPass.fresnel;

    } );
    folder.add( ssrPass, 'distanceAttenuation' ).onChange( ()=>{

        groundReflector.distanceAttenuation = ssrPass.distanceAttenuation;

    } );
    ssrPass.maxDistance = .1;
    groundReflector.maxDistance = ssrPass.maxDistance;
    folder.add( ssrPass, 'maxDistance' ).min( 0 ).max( .5 ).step( .001 ).onChange( ()=>{

        groundReflector.maxDistance = ssrPass.maxDistance;

    } );
    folder.add( params, 'otherMeshes' ).onChange( () => {

        if ( params.otherMeshes ) {

            otherMeshes.forEach( mesh => mesh.visible = true );

        } else {

            otherMeshes.forEach( mesh => mesh.visible = false );

        }

    } );
    folder.add( ssrPass, 'bouncing' );
    folder.add( ssrPass, 'output', {
        'Default': SSRPass.OUTPUT.Default,
        'SSR Only': SSRPass.OUTPUT.SSR,
        'Beauty': SSRPass.OUTPUT.Beauty,
        'Depth': SSRPass.OUTPUT.Depth,
        'Normal': SSRPass.OUTPUT.Normal,
        'Metalness': SSRPass.OUTPUT.Metalness,
    } ).onChange( function ( value ) {

        ssrPass.output = parseInt( value );

    } );
    ssrPass.opacity = 1;
    groundReflector.opacity = ssrPass.opacity;
    folder.add( ssrPass, 'opacity' ).min( 0 ).max( 1 ).onChange( ()=>{

        groundReflector.opacity = ssrPass.opacity;

    } );
    folder.add( ssrPass, 'blur' );
    // folder.open()
    // gui.close()

}


function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    composer.setSize( window.innerWidth, window.innerHeight );
    groundReflector.getRenderTarget().setSize( window.innerWidth, window.innerHeight );
    groundReflector.resolution.set( window.innerWidth, window.innerHeight );

}

function animate() {

    requestAnimationFrame( animate );

    stats.begin();
    render();
    stats.end();

}

function render() {

    if ( params.autoRotate ) {

        const timer = Date.now() * 0.0003;

        camera.position.x = Math.sin( timer ) * 0.5;
        camera.position.y = 0.2135;
        camera.position.z = Math.cos( timer ) * 0.5;
        camera.lookAt( 0, 0.0635, 0 );

    } else {

        controls.update();

    }

    if ( params.enableSSR ) {

        // TODO: groundReflector has full ground info, need use it to solve reflection gaps problem on objects when camera near ground.
        // TODO: the normal and depth info where groundReflector reflected need to be changed.
        composer.render();

    } else {

        renderer.render( scene, camera );

    }

}
}
})