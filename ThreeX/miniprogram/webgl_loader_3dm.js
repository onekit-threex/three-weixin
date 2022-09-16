// webgl/webgl_loader_3dm.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin';


import { GUI } from './jsm/libs/lil-gui.module.min.js';
const THREE = requirePlugin('ThreeX');
Page({
    onUnload(){
        if(getApp().worder){getApp().worder.terminate()}
    },
	async onLoad() {
var that = this
        this.canvas = await document.createElementAsync("canvas","webgl")


    }
})