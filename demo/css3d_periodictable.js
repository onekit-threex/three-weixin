// css3d/css3d_periodictable.js
import {document,window,requestAnimationFrame,Event} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
Page({
  async onLoad(){
getApp().canvas = await document.createElementAsync("canvas","webgl")
}
})