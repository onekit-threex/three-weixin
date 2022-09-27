
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
import { MathUtils } from '../../three/Three';

const _hsl = {};

class ColorConverter {

	static setHSV( color, h, s, v ) {

		// https://gist.github.com/xpansive/1337890#file-index-js

		h = MathUtils.euclideanModulo( h, 1 );
		s = MathUtils.clamp( s, 0, 1 );
		v = MathUtils.clamp( v, 0, 1 );

		return color.setHSL( h, ( s * v ) / ( ( h = ( 2 - s ) * v ) < 1 ? h : ( 2 - h ) ), h * 0.5 );

	}

	static getHSV( color, target ) {

		color.getHSL( _hsl );

		// based on https://gist.github.com/xpansive/1337890#file-index-js
		_hsl.s *= ( _hsl.l < 0.5 ) ? _hsl.l : ( 1 - _hsl.l );

		target.h = _hsl.h;
		target.s = 2 * _hsl.s / ( _hsl.l + _hsl.s );
		target.v = _hsl.l + _hsl.s;

		return target;

	}

}

export { ColorConverter };
