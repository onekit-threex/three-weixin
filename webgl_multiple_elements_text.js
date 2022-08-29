// webgl/webgl_multiple_elements_text.js
import {document,window,requestAnimationFrame} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
Page({
	async onLoad() {
        getApp().canvas = await document.createElementAsync("canvas","webgl")
    }
})