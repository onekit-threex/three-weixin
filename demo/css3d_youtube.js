// css3d/css3d_youtube.js
import {document,window,requestAnimationFrame} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
Page({
  async onLoad(){
getApp().canvas = await document.createElementAsync("canvas","webgl")
}
})