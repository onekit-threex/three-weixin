
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
import {
	DataTextureLoader,
	LinearFilter,
	LinearMipmapLinearFilter
} from '../../../three/Three';

import UTIF from '../libs/utif.module.js';

class TIFFLoader extends DataTextureLoader {

	constructor( manager ) {

		super( manager );

	}

	parse( buffer ) {

		const ifds = UTIF.decode( buffer );
		UTIF.decodeImage( buffer, ifds[ 0 ] );
		const rgba = UTIF.toRGBA8( ifds[ 0 ] );

		return {
			width: ifds[ 0 ].width,
			height: ifds[ 0 ].height,
			data: rgba,
			flipY: true,
			magFilter: LinearFilter,
			minFilter: LinearMipmapLinearFilter
		};

	}

}

export { TIFFLoader };
