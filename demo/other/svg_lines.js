// svg/svg_lines.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
import { SVGRenderer } from './jsm/renderers/SVGRenderer.js';
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
 


})