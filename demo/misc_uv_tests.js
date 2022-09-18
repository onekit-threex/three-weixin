// tests/misc_uv_tests.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin';
import * as THREE from 'three-weixin';	
import { UVsDebug } from './jsm/utils/UVsDebug.js';
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
const canvas3d = this.canvas = await document.createElementAsync("canvas","webgl")

function test( name, geometry ) {

    const d = document.createElement( 'div' );

    d.innerHTML = '<h3>' + name + '</h3>';

    d.appendChild( UVsDebug( geometry ) );

    document.body.appendChild( d );

}

const points = [];

for ( let i = 0; i < 10; i ++ ) {

    points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 15 + 50, ( i - 5 ) * 2 ) );

}

//

test( 'new THREE.PlaneGeometry( 100, 100, 4, 4 )', new THREE.PlaneGeometry( 100, 100, 4, 4 ) );

test( 'new THREE.SphereGeometry( 75, 12, 6 )', new THREE.SphereGeometry( 75, 12, 6 ) );

test( 'new THREE.IcosahedronGeometry( 30, 1 )', new THREE.IcosahedronGeometry( 30, 1 ) );

test( 'new THREE.OctahedronGeometry( 30, 2 )', new THREE.OctahedronGeometry( 30, 2 ) );

test( 'new THREE.CylinderGeometry( 25, 75, 100, 10, 5 )', new THREE.CylinderGeometry( 25, 75, 100, 10, 5 ) );

test( 'new THREE.BoxGeometry( 100, 100, 100, 4, 4, 4 )', new THREE.BoxGeometry( 100, 100, 100, 4, 4, 4 ) );

test( 'new THREE.LatheGeometry( points, 8 )', new THREE.LatheGeometry( points, 8 ) );

test( 'new THREE.TorusGeometry( 50, 20, 8, 8 )', new THREE.TorusGeometry( 50, 20, 8, 8 ) );

test( 'new THREE.TorusKnotGeometry( 50, 10, 12, 6 )', new THREE.TorusKnotGeometry( 50, 10, 12, 6 ) );

}
})