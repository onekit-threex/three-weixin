
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
import { LabelElement } from '../../libs/flow.module.js';
import { BaseNode } from '../core/BaseNode.js';
import { MathNode, UniformNode } from 'three/nodes';

const NULL_VALUE = new UniformNode( 0 );

export class DotEditor extends BaseNode {

	constructor() {

		const node = new MathNode( MathNode.DOT, NULL_VALUE, NULL_VALUE );

		super( 'Dot Product', 1, node, 175 );

		const aElement = new LabelElement( 'A' ).setInput( 3 );
		const bElement = new LabelElement( 'B' ).setInput( 3 );

		aElement.onConnect( () => {

			node.aNode = aElement.getLinkedObject() || NULL_VALUE;

		} );

		bElement.onConnect( () => {

			node.bNode = bElement.getLinkedObject() || NULL_VALUE;

		} );

		this.add( aElement )
			.add( bElement );

	}

}