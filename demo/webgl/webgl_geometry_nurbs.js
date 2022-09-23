// webgl/webgl_geometry_nurbs.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
import Stats from './jsm/libs/stats.module.js';

			import { NURBSCurve } from './jsm/curves/NURBSCurve.js';
			import { NURBSSurface } from './jsm/curves/NURBSSurface.js';
			import { ParametricGeometry } from './jsm/geometries/ParametricGeometry.js';
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

        let container, stats;

        let camera, scene, renderer;
        let group;

        let targetRotation = 0;
        let targetRotationOnPointerDown = 0;

        let pointerX = 0;
        let pointerXOnPointerDown = 0;

        let windowHalfX = window.innerWidth / 2;

        init();
        animate();

        function init() {

            container = document.createElement( 'div' );
            document.body.appendChild( container );

            camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 2000 );
            camera.position.set( 0, 150, 750 );

            scene = new THREE.Scene();
            scene.background = new THREE.Color( 0xf0f0f0 );

            scene.add( new THREE.AmbientLight( 0x808080 ) );

            const light = new THREE.DirectionalLight( 0xffffff, 1 );
            light.position.set( 1, 1, 1 );
            scene.add( light );

            group = new THREE.Group();
            group.position.y = 50;
            scene.add( group );

            // NURBS curve

            const nurbsControlPoints = [];
            const nurbsKnots = [];
            const nurbsDegree = 3;

            for ( let i = 0; i <= nurbsDegree; i ++ ) {

                nurbsKnots.push( 0 );

            }

            for ( let i = 0, j = 20; i < j; i ++ ) {

                nurbsControlPoints.push(
                    new THREE.Vector4(
                        Math.random() * 400 - 200,
                        Math.random() * 400,
                        Math.random() * 400 - 200,
                        1 // weight of control point: higher means stronger attraction
                    )
                );

                const knot = ( i + 1 ) / ( j - nurbsDegree );
                nurbsKnots.push( THREE.MathUtils.clamp( knot, 0, 1 ) );

            }

            const nurbsCurve = new NURBSCurve( nurbsDegree, nurbsKnots, nurbsControlPoints );

            const nurbsGeometry = new THREE.BufferGeometry();
            nurbsGeometry.setFromPoints( nurbsCurve.getPoints( 200 ) );

            const nurbsMaterial = new THREE.LineBasicMaterial( { color: 0x333333 } );

            const nurbsLine = new THREE.Line( nurbsGeometry, nurbsMaterial );
            nurbsLine.position.set( 200, - 100, 0 );
            group.add( nurbsLine );

            const nurbsControlPointsGeometry = new THREE.BufferGeometry();
            nurbsControlPointsGeometry.setFromPoints( nurbsCurve.controlPoints );

            const nurbsControlPointsMaterial = new THREE.LineBasicMaterial( { color: 0x333333, opacity: 0.25, transparent: true } );

            const nurbsControlPointsLine = new THREE.Line( nurbsControlPointsGeometry, nurbsControlPointsMaterial );
            nurbsControlPointsLine.position.copy( nurbsLine.position );
            group.add( nurbsControlPointsLine );

            // NURBS surface

            const nsControlPoints = [
                [
                    new THREE.Vector4( - 200, - 200, 100, 1 ),
                    new THREE.Vector4( - 200, - 100, - 200, 1 ),
                    new THREE.Vector4( - 200, 100, 250, 1 ),
                    new THREE.Vector4( - 200, 200, - 100, 1 )
                ],
                [
                    new THREE.Vector4( 0, - 200, 0, 1 ),
                    new THREE.Vector4( 0, - 100, - 100, 5 ),
                    new THREE.Vector4( 0, 100, 150, 5 ),
                    new THREE.Vector4( 0, 200, 0, 1 )
                ],
                [
                    new THREE.Vector4( 200, - 200, - 100, 1 ),
                    new THREE.Vector4( 200, - 100, 200, 1 ),
                    new THREE.Vector4( 200, 100, - 250, 1 ),
                    new THREE.Vector4( 200, 200, 100, 1 )
                ]
            ];
            const degree1 = 2;
            const degree2 = 3;
            const knots1 = [ 0, 0, 0, 1, 1, 1 ];
            const knots2 = [ 0, 0, 0, 0, 1, 1, 1, 1 ];
            const nurbsSurface = new NURBSSurface( degree1, degree2, knots1, knots2, nsControlPoints );

            const map = new THREE.TextureLoader().load( 'textures/uv_grid_opengl.jpg' );
            map.wrapS = map.wrapT = THREE.RepeatWrapping;
            map.anisotropy = 16;

            function getSurfacePoint( u, v, target ) {

                return nurbsSurface.getPoint( u, v, target );

            }

            const geometry = new ParametricGeometry( getSurfacePoint, 20, 20 );
            const material = new THREE.MeshLambertMaterial( { map: map, side: THREE.DoubleSide } );
            const object = new THREE.Mesh( geometry, material );
            object.position.set( - 200, 100, 0 );
            object.scale.multiplyScalar( 1 );
            group.add( object );

            //

            renderer = that.renderer = new  THREE.WebGLRenderer({canvas:canvas3d, antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            container.appendChild( renderer.domElement );

            stats = new Stats();
            container.appendChild( stats.dom );

            container.style.touchAction = 'none';
            container.addEventListener( 'pointerdown', onPointerDown );

            //

            window.addEventListener( 'resize', onWindowResize );

        }

        function onWindowResize() {

            windowHalfX = window.innerWidth / 2;

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

        }

        //

        function onPointerDown( event ) {

            if ( event.isPrimary === false ) return;

            pointerXOnPointerDown = event.clientX - windowHalfX;
            targetRotationOnPointerDown = targetRotation;

            document.addEventListener( 'pointermove', onPointerMove );
            document.addEventListener( 'pointerup', onPointerUp );

        }

        function onPointerMove( event ) {

            if ( event.isPrimary === false ) return;

            pointerX = event.clientX - windowHalfX;

            targetRotation = targetRotationOnPointerDown + ( pointerX - pointerXOnPointerDown ) * 0.02;

        }

        function onPointerUp() {

            if ( event.isPrimary === false ) return;

            document.removeEventListener( 'pointermove', onPointerMove );
            document.removeEventListener( 'pointerup', onPointerUp );

        }

        //

        function animate() {

            requestAnimationFrame( animate );

            render();
            // //stats.update();

        }

        function render() {

            group.rotation.y += ( targetRotation - group.rotation.y ) * 0.05;
            renderer.render( scene, camera );

        }

    }
})