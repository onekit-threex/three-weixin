
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
class WebGPUBinding {

	constructor( name = '' ) {

		this.name = name;
		this.visibility = null;

		this.type = null; // read-only

		this.isShared = false;

	}

	setVisibility( visibility ) {

		this.visibility = visibility;

	}

}

export default WebGPUBinding;
