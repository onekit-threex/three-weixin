
import {
    Blob,
    btoa,
    createImageBitmap,
    CSSStyleDeclaration,
    performance,
    document,
    DOMParser,
    EventTarget,
    fetch,
    Headers,
    HTMLCanvasElement,
    HTMLImageElement,
    ImageBitmap,
    location,
    navigator,
    Request,
    requestAnimationFrame,
    cancelAnimationFrame,
    Response,
    URL,
    window,
    self,
    WebAssembly,
    Worker,
    XMLHttpRequest,
	ImageData,
    core,
    } from 'dhtml-weixin';
let _id = 0;

class WebGPUProgrammableStage {

	constructor( device, code, type ) {

		this.id = _id ++;

		this.code = code;
		this.type = type;
		this.usedTimes = 0;

		this.stage = {
			module: device.createShaderModule( { code } ),
			entryPoint: 'main'
		};

	}

}

export default WebGPUProgrammableStage;
