
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
import { NumberInput, Element } from '../../libs/flow.module.js';
import { BaseNode } from '../core/BaseNode.js';
import { UniformNode } from 'three/nodes';

export class FloatEditor extends BaseNode {

	constructor() {

		const node = new UniformNode( 0 );

		super( 'Float', 1, node, 150 );

		const field = new NumberInput().setTagColor( 'red' ).onChange( () => {

			node.value = field.getValue();

		} );

		this.add( new Element().add( field ) );

	}

}