// webgl/webgl_loader_3dm.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin';
import * as THREE from 'three-weixin';

import { GUI } from './jsm/libs/lil-gui.module.min.js';
Page({
    onUnload(){
        if(getApp().worder){getApp().worder.terminate()}
    },
	async onLoad() {
var that = this
        const canvas = this.canvas = await document.createElementAsync("canvas","webgl")


    }
})