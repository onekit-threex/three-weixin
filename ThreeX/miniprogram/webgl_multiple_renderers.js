// webgl/webgl_multiple_renderers.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin';

const THREE = requirePlugin('ThreeX');
Page({
	async onLoad() {
var that = this
        this.canvas = await document.createElementAsync("canvas","webgl")
    }
})