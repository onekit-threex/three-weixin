// physics/physics_ammo_instancing.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { AmmoPhysics } from './jsm/physics/AmmoPhysics.js';
import Stats from './jsm/libs/stats.module.js';
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
getApp().canvas = await document.createElementAsync("canvas","webgl")


let camera, scene, renderer, stats;
let physics, position;

let boxes, spheres;

init();

async function init() {

    physics = await AmmoPhysics();
    position = new THREE.Vector3();

    //

    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.set( - 1, 1.5, 2 );
    camera.lookAt( 0, 0.5, 0 );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x666666 );

    const hemiLight = new THREE.HemisphereLight();
    hemiLight.intensity = 0.35;
    scene.add( hemiLight );

    const dirLight = new THREE.DirectionalLight();
    dirLight.position.set( 5, 5, 5 );
    dirLight.castShadow = true;
    dirLight.shadow.camera.zoom = 2;
    scene.add( dirLight );

    const floor = new THREE.Mesh(
        new THREE.BoxGeometry( 10, 5, 10 ),
        new THREE.ShadowMaterial( { color: 0x111111 } )
    );
    floor.position.y = - 2.5;
    floor.receiveShadow = true;
    scene.add( floor );
    physics.addMesh( floor );

    //

    const material = new THREE.MeshLambertMaterial();

    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();

    // Boxes

    const geometryBox = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
    boxes = new THREE.InstancedMesh( geometryBox, material, 100 );
    boxes.instanceMatrix.setUsage( THREE.DynamicDrawUsage ); // will be updated every frame
    boxes.castShadow = true;
    boxes.receiveShadow = true;
    scene.add( boxes );

    for ( let i = 0; i < boxes.count; i ++ ) {

        matrix.setPosition( Math.random() - 0.5, Math.random() * 2, Math.random() - 0.5 );
        boxes.setMatrixAt( i, matrix );
        boxes.setColorAt( i, color.setHex( 0xffffff * Math.random() ) );

    }

    physics.addMesh( boxes, 1 );

    // Spheres

    const geometrySphere = new THREE.IcosahedronGeometry( 0.075, 3 );
    spheres = new THREE.InstancedMesh( geometrySphere, material, 100 );
    spheres.instanceMatrix.setUsage( THREE.DynamicDrawUsage ); // will be updated every frame
    spheres.castShadow = true;
    spheres.receiveShadow = true;
    scene.add( spheres );

    for ( let i = 0; i < spheres.count; i ++ ) {

        matrix.setPosition( Math.random() - 0.5, Math.random() * 2, Math.random() - 0.5 );
        spheres.setMatrixAt( i, matrix );
        spheres.setColorAt( i, color.setHex( 0xffffff * Math.random() ) );

    }

    physics.addMesh( spheres, 1 );

    //

    renderer = that.renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    document.body.appendChild( renderer.domElement );

    stats = new Stats();
    document.body.appendChild( stats.dom );

    //

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.target.y = 0.5;
    controls.update();

    animate();
    
    setInterval( () => {

        let index = Math.floor( Math.random() * boxes.count );

        position.set( 0, Math.random() + 1, 0 );
        physics.setMeshPosition( boxes, position, index );

        //

        index = Math.floor( Math.random() * spheres.count );

        position.set( 0, Math.random() + 1, 0 );
        physics.setMeshPosition( spheres, position, index );

    }, 1000 / 60 );

}

function animate() {

    requestAnimationFrame( animate );

    renderer.render( scene, camera );

    stats.update();

}
}
})