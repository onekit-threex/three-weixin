// webgl_advanced/webgl_gpgpu_protoplanet.js
import {document,window,requestAnimationFrame} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
Page({
  async onLoad(){
getApp().canvas = await document.createElementAsync("canvas","webgl")
}
})