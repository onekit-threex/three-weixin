
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
import { SelectInput, Element } from '../../libs/flow.module.js';
import { BaseNode } from '../core/BaseNode.js';
import { PositionNode } from 'three/nodes';

export class PositionEditor extends BaseNode {

	constructor() {

		const node = new PositionNode();

		super( 'Position', 3, node, 200 );

		const optionsField = new SelectInput( [
			{ name: 'Local', value: PositionNode.LOCAL },
			{ name: 'World', value: PositionNode.WORLD },
			{ name: 'View', value: PositionNode.VIEW },
			{ name: 'View Direction', value: PositionNode.VIEW_DIRECTION }
		], PositionNode.LOCAL ).onChange( () => {

			node.scope = optionsField.getValue();

			this.invalidate();

		} );

		this.add( new Element().add( optionsField ) );

	}

}
