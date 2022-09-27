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
    Event,
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
    core,
    } from 'dhtml-weixin';
import { LinearFilter } from '../../three/constants.js';
import { Texture } from '../../three/textures/Texture.js';

class CameraTexture extends Texture {

	constructor( video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy ) {

		super( video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy );

		//this.isVideoTexture = true;

		this.minFilter = minFilter !== undefined ? minFilter : LinearFilter;
		this.magFilter = magFilter !== undefined ? magFilter : LinearFilter;

		//this.generateMipmaps = false;

		const scope = this;
        const context = wx.createCameraContext();

        const page = core.Page.current
        const canvas = page.canvas.wx_element
        var dirt 
       var listener = context.onCameraFrame((res) => {
         if(dirt){
           return
         }
         dirt=true
            const buffer = res.data
            const base64 = "data:image/jpeg;base64,"+core.Base64.arrayBufferToBase64(buffer)
            const image = canvas.createImage()
            image.onload = ()=>{
            //  dirt=false
              console.error("xxxxx")
              scope.image = image
                scope.needsUpdate = true;
            }
            image.src = base64
            setTimeout(()=>{
              image.onload()
            },100)
        })
        listener.start();

	}

	clone() {

		return new this.constructor( this.image ).copy( this );

	}

	update() {



	}

}

module.exports = { CameraTexture };
