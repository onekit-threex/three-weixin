import init from './scene.js';

worker.onMessage(function (e) {
  e = self2.onmessage(e);
	const data = message.data;
	init( data.drawingSurface, data.width, data.height, data.pixelRatio, data.path );

});
