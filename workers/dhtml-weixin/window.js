


import EventTarget from './core/EventTarget'
import URL from './URL'
import Performance from './Performance'
import Location from './Location'
import requestAnimationFrame from './requestAnimationFrame'
import cancelAnimationFrame from './cancelAnimationFrame'
import createImageBitmap from './createImageBitmap'
import Worker from "./Worker"
// ///////////////////////////////////////////////
class AudioContext {

}
// ///////////////////////////////////////////////

export default class Window extends EventTarget {

   get Int8Array(){
    return Int8Array
  }
   get Uint8Array(){
    return Uint8Array
  }
   get Uint8ClampedArray(){
    return Uint8ClampedArray
  }
   get Int16Array(){
    return Int16Array
  }
   get Uint16Array(){
    return Uint16Array
  }
   get Int32Array(){
    return Int32Array
  }
   get Uint32Array(){
    return Uint32Array
  }
   get Float32Array(){
    return Float32Array
  }
   get Float64Array(){
    return Float64Array
  }
   get BigInt64Array(){
    return BigInt64Array
  }
   get BigUint64Array(){
    return BigUint64Array
  }
  // /////////////////
  
  _getSystemInfoSync(){
      if(! self.systemInfo ){
            self.systemInfo = wx.getSystemInfoSync()
      }
  }
  constructor() {
    super()
    this.URL = URL
    this.AudioContext = AudioContext
    this.performance = new Performance()

    this.setTimeout = setTimeout
    this.clearTimeout = clearTimeout
    this.setInterval = setInterval
    this.clearInterval = clearInterval
  }
get devicePixelRatio(){
    this.  _getSystemInfoSync()
    return systemInfo.pixelRatio
}
get innerWidth(){
    this.  _getSystemInfoSync()
    return systemInfo.windowWidth
}
get innerHeight(){
    this.  _getSystemInfoSync()
    return systemInfo.windowHeight
}
  get Math() {
    return this.Math
  }

  get location() {
    return new Location()
  }

  get requestAnimationFrame() {
    return requestAnimationFrame
  }

  get cancelAnimationFrame() {
    return cancelAnimationFrame
  }

  get createImageBitmap() {
    return createImageBitmap
  }

  get localStorage() {
    return localStorage
  }
  postMessage(json) {
    Worker.self_postMessage(json)
  }
}
