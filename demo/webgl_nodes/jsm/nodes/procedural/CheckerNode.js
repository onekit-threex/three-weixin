
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
import TempNode from '../core/TempNode.js';
import { ShaderNode, uv, add, mul, floor, mod, sign } from '../shadernode/ShaderNodeBaseElements.js';

const checkerShaderNode = new ShaderNode( ( inputs ) => {

	const uv = mul( inputs.uv, 2.0 );

	const cx = floor( uv.x );
	const cy = floor( uv.y );
	const result = mod( add( cx, cy ), 2.0 );

	return sign( result );

} );

class CheckerNode extends TempNode {

	constructor( uvNode = uv() ) {

		super( 'float' );

		this.uvNode = uvNode;

	}

	generate( builder ) {

		return checkerShaderNode.call( { uv: this.uvNode } ).build( builder );

	}

}

export default CheckerNode;