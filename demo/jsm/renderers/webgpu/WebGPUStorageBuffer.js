
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

class WebGPUStorageBuffer extends WebGPUBuffer {

	constructor( name, attribute ) {

		super( name, GPUBindingType.StorageBuffer, attribute.array );

		this.isStorageBuffer = true;

		this.usage |= GPUBufferUsage.VERTEX | GPUBufferUsage.STORAGE;

		this.attribute = attribute;

	}

}

export default WebGPUStorageBuffer;
