
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
	Vector2
} from '../../three/Three';

/**
 * Triangle blur shader
 * based on glfx.js triangle blur shader
 * https://github.com/evanw/glfx.js
 *
 * A basic blur filter, which convolves the image with a
 * pyramid filter. The pyramid filter is separable and is applied as two
 * perpendicular triangle filters.
 */

const TriangleBlurShader = {

	uniforms: {

		'texture': { value: null },
		'delta': { value: new Vector2( 1, 1 ) }

	},

	vertexShader: /* glsl */`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

	fragmentShader: /* glsl */`

		#include <common>

		#define ITERATIONS 10.0

		uniform sampler2D texture;
		uniform vec2 delta;

		varying vec2 vUv;

		void main() {

			vec4 color = vec4( 0.0 );

			float total = 0.0;

		// randomize the lookup values to hide the fixed number of samples

			float offset = rand( vUv );

			for ( float t = -ITERATIONS; t <= ITERATIONS; t ++ ) {

				float percent = ( t + offset - 0.5 ) / ITERATIONS;
				float weight = 1.0 - abs( percent );

				color += texture2D( texture, vUv + delta * percent ) * weight;
				total += weight;

			}

			gl_FragColor = color / total;

		}`

};

export { TriangleBlurShader };
