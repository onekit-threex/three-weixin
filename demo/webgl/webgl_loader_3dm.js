// webgl/webgl_loader_3dm.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from 'three-weixin';

import { GUI } from './jsm/libs/lil-gui.module.min.js';
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
        if(getApp().worder){getApp().worder.terminate()}
    },
	async onLoad() {
var that = this
        const canvas3d = this.canvas = await document.createElementAsync("canvas","webgl")


    }
})