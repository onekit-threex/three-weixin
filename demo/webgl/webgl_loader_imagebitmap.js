// webgl/webgl_loader_imagebitmap.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
Page({   
 onShareAppMessage() {
        return {
            title: "ThreeX 元宇宙利器",
            path:"/index",
            imageUrl:"/ThreeX.jpg"
        }
    },
    onShareTimeline() {
        return {
            title: "ThreeX 元宇宙利器",
            query:"/index",
            imageUrl:"/ThreeX.jpg"
        }
    },
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

        let camera, scene, renderer;
        let group, cubes;

        init();
        animate();

        function addImageBitmap() {

            new THREE.ImageBitmapLoader()
                .load( 'textures/planets/earth_atmos_2048.jpg?' + performance.now(),async function ( imageBitmap ) {

                    const texture = new THREE.CanvasTexture(await core.Canvas.fix( imageBitmap ));
                    const material = new THREE.MeshBasicMaterial( { map: texture } );

                    /* ImageBitmap should be disposed when done with it
                       Can't be done until it's actually uploaded to WebGLTexture */

                    // imageBitmap.close();

                    addCube( material );

                }, function ( p ) {

                    console.log( p );

                }, function ( e ) {

                    console.log( e );

                } );

        }

        function addImage() {

            new THREE.ImageLoader()
                .setCrossOrigin( '*' )
                .load( 'textures/planets/earth_atmos_2048.jpg?' + performance.now(),async function ( image ) {

                    const texture = new THREE.CanvasTexture(await core.Canvas.fix( image ));
                    const material = new THREE.MeshBasicMaterial( { color: 0xff8888, map: texture } );
                    addCube( material );

                } );

        }

        const geometry = new THREE.BoxGeometry( 1, 1, 1 );

        function addCube( material ) {

            const cube = new THREE.Mesh( geometry, material );
            cube.position.set( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
            cube.rotation.set( Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI );
            cubes.add( cube );

        }

        function init() {

            const container = document.createElement( 'div' );
            document.body.appendChild( container );

            // CAMERA

            camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 1500 );
            camera.position.set( 0, 4, 7 );
            camera.lookAt( 0, 0, 0 );

            // SCENE

            scene = new THREE.Scene();

            //

            group = new THREE.Group();
            scene.add( group );

            group.add( new THREE.GridHelper( 4, 12, 0x888888, 0x444444 ) );

            cubes = new THREE.Group();
            group.add( cubes );

            // RENDERER

            renderer = that.renderer = new  THREE.WebGLRenderer({canvas:canvas3d, antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            container.appendChild( renderer.domElement );

            // TESTS

            setTimeout( addImage, 300 );
            setTimeout( addImage, 600 );
            setTimeout( addImage, 900 );
            setTimeout( addImageBitmap, 1300 );
            setTimeout( addImageBitmap, 1600 );
            setTimeout( addImageBitmap, 1900 );

            // EVENTS

            window.addEventListener( 'resize', onWindowResize );

        }

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

        }

        function animate() {

            group.rotation.y = performance.now() / 3000;

            renderer.render( scene, camera );

            requestAnimationFrame( animate );

        }

    }
})