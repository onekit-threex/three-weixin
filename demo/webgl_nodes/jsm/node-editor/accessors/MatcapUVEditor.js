
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
import { BaseNode } from '../core/BaseNode.js';
import { MatcapUVNode } from 'three/nodes';

export class MatcapUVEditor extends BaseNode {

	constructor() {

		const node = new MatcapUVNode();

		super( 'Matcap UV', 2, node, 200 );

	}

}
