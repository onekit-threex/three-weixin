// webgl/webgl_multiple_canvases_grid.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
Page({
	async onLoad() {
var that = this
        this.canvas = await document.createElementAsync("canvas","webgl")
    }
})