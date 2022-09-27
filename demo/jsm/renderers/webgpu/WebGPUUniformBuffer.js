
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
import WebGPUBuffer from './WebGPUBuffer.js';
import { GPUBindingType } from './constants.js';

class WebGPUUniformBuffer extends WebGPUBuffer {

	constructor( name, buffer = null ) {

		super( name, GPUBindingType.UniformBuffer, buffer );

		this.isUniformBuffer = true;

		this.usage |= GPUBufferUsage.UNIFORM;

	}

}

export default WebGPUUniformBuffer;
