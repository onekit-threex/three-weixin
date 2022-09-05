import init from './scene.js';
import {self} from "dhtml-weixin"

    
worker.onMessage(function (e) {
e = self2.onmessage(e);
const message = e.data;

	const data = message.data;
	init( data.drawingSurface, data.width, data.height, data.pixelRatio, data.path );

});
