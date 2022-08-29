// webgl/webgl_materials_texture_filters.js
import {document,window,requestAnimationFrame} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
Page({
	async onLoad() {
        getApp().canvas = await document.createElementAsync("canvas","webgl")
    }
})