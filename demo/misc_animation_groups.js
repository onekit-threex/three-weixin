// misc/misc_animation_groups.js
import {document,window,requestAnimationFrame,Event} from 'dhtml-weixin';
import * as THREE from 'three-weixin';

import Stats from './jsm/libs/stats.module.js';
Page({
  async onLoad(){
getApp().canvas = await document.createElementAsync("canvas","webgl")
let stats, clock;
let scene, camera, renderer, mixer;

init();
animate();

function init() {

    scene = new THREE.Scene();

    //

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 50, 50, 100 );
    camera.lookAt( scene.position );

    // all objects of this animation group share a common animation state

    const animationGroup = new THREE.AnimationObjectGroup();

    //

    const geometry = new THREE.BoxGeometry( 5, 5, 5 );
    const material = new THREE.MeshBasicMaterial( { transparent: true } );

    //

    for ( let i = 0; i < 5; i ++ ) {

        for ( let j = 0; j < 5; j ++ ) {

            const mesh = new THREE.Mesh( geometry, material );

            mesh.position.x = 32 - ( 16 * i );
            mesh.position.y = 0;
            mesh.position.z = 32 - ( 16 * j );

            scene.add( mesh );
            animationGroup.add( mesh );

        }

    }

    // create some keyframe tracks

    const xAxis = new THREE.Vector3( 1, 0, 0 );
    const qInitial = new THREE.Quaternion().setFromAxisAngle( xAxis, 0 );
    const qFinal = new THREE.Quaternion().setFromAxisAngle( xAxis, Math.PI );
    const quaternionKF = new THREE.QuaternionKeyframeTrack( '.quaternion', [ 0, 1, 2 ], [ qInitial.x, qInitial.y, qInitial.z, qInitial.w, qFinal.x, qFinal.y, qFinal.z, qFinal.w, qInitial.x, qInitial.y, qInitial.z, qInitial.w ] );

    const colorKF = new THREE.ColorKeyframeTrack( '.material.color', [ 0, 1, 2 ], [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ], THREE.InterpolateDiscrete );
    const opacityKF = new THREE.NumberKeyframeTrack( '.material.opacity', [ 0, 1, 2 ], [ 1, 0, 1 ] );

    // create clip

    const clip = new THREE.AnimationClip( 'default', 3, [ quaternionKF, colorKF, opacityKF ] );

    // apply the animation group to the mixer as the root object

    mixer = new THREE.AnimationMixer( animationGroup );

    const clipAction = mixer.clipAction( clip );
    clipAction.play();

    //

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    //

    stats = new Stats();
    document.body.appendChild( stats.dom );

    //

    clock = new THREE.Clock();

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

    render();

}

function render() {

    const delta = clock.getDelta();

    if ( mixer ) {

        mixer.update( delta );

    }

    renderer.render( scene, camera );

    stats.update();

}
}
})