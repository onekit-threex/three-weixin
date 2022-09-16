// webgl_advanced/webgl_worker_offscreencanvas.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin';


import initJank from './jsm/offscreen/jank.js';
import init from './jsm/offscreen/scene.js';
const THREE = requirePlugin('ThreeX');
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
this.canvas = await document.createElementAsync("canvas","webgl")
const canvas1 = await document.getElementByIdAsync( 'canvas1' );
const canvas2 = await document.getElementByIdAsync( 'canvas2' );

const width = canvas1.clientWidth;
const height = canvas1.clientHeight;
const pixelRatio = window.devicePixelRatio;

init( canvas1, width, height, pixelRatio, './' );
initJank();

// offscreen

if ( 'transferControlToOffscreen' in canvas2 ) {

  const offscreen = canvas2.transferControlToOffscreen();
  const worker = new Worker( 'jsm/offscreen/offscreen.js', { type: 'module' } );
  worker.postMessage( {
    drawingSurface: offscreen,
    width: canvas2.clientWidth,
    height: canvas2.clientHeight,
    pixelRatio: window.devicePixelRatio,
    path: '../../'
  }, [ offscreen ] );

} else {

  document.getElementById( 'message' ).style.display = 'block';

}
}
})