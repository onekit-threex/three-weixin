// webgl/webgl_loader_texture_rgbm.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin';

const THREE = requirePlugin('ThreeX');
Page({
	async onLoad() {
var that = this
        this.canvas = await document.createElementAsync("canvas","webgl")
    }
})