
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
import { LightsNode } from 'three/nodes';

class WebGPURenderState {

	constructor() {

		this.lightsNode = new LightsNode();

		this.lightsArray = [];

	}

	init() {

		this.lightsArray.length = 0;

	}

	pushLight( light ) {

		this.lightsArray.push( light );

	}

	getLightsNode() {

		return this.lightsNode.fromLights( this.lightsArray );

	}

}

class WebGPURenderStates {

	constructor() {

		this.renderStates = new WeakMap();

	}

	get( scene, /* camera */ ) {

		const renderStates = this.renderStates;

		let renderState = renderStates.get( scene );

		if ( renderState === undefined ) {

			renderState = new WebGPURenderState();
			renderStates.set( scene, renderState );

		}

		return renderState;

	}

	dispose() {

		this.renderStates = new WeakMap();

	}

}

export default WebGPURenderStates;
