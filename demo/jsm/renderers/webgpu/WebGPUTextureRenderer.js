
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
import { WebGLRenderTarget } from '../../../three/Three';

class WebGPUTextureRenderer {

	constructor( renderer, options = {} ) {

		this.renderer = renderer;

		// @TODO: Consider to introduce WebGPURenderTarget or rename WebGLRenderTarget to just RenderTarget

		this.renderTarget = new WebGLRenderTarget( options );

	}

	getTexture() {

		return this.renderTarget.texture;

	}

	setSize( width, height ) {

		this.renderTarget.setSize( width, height );

	}

	render( scene, camera ) {

		const renderer = this.renderer;
		const renderTarget = this.renderTarget;

		renderer.setRenderTarget( renderTarget );
		renderer.render( scene, camera );
		renderer.setRenderTarget( null );

	}

}

export default WebGPUTextureRenderer;
