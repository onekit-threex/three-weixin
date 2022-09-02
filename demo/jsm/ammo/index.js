import window_Ammo from './wx.ammo.wasm'
//import JsAmmo from "./ammo"
module.exports = function () {
	return new Promise((callback, fail) => {
        /*
        const useJS = true//typeof WebAssembly !== 'object' || this.decoderConfig.type === 'js';
        const librariesPending = [];

		if ( useJS ) {
            const Ammo = JsAmmo().oB
            console.error(Ammo)
            getApp().onekit_ammo = Ammo//require("./ammo")()
        }else{
            
        }
     */
		window_Ammo.instantiate('jsm/ammo/ammo.wasm.wasm').then(
			() => {
				callback()
			}
		).catch(fail)
	})
}