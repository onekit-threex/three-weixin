/* eslint-disable no-undef */
/* eslint-disable getter-return */
/* eslint-disable class-methods-use-this */
import EventTarget from './EventTarget'
import URL from './URL'
import Performance from './Performance'
import Location from './Location'
import requestAnimationFrame from './requestAnimationFrame'
import cancelAnimationFrame from './cancelAnimationFrame'
import createImageBitmap from './createImageBitmap'
import Worker from './Worker'
import AudioContext from "./AudioContext"
// ///////////////////////////////////////////////

export default class Window extends EventTarget {
  get Int8Array() {
    return Int8Array
  }

  get Uint8Array() {
    return Uint8Array
  }

  get Uint8ClampedArray() {
    return Uint8ClampedArray
  }

  get Int16Array() {
    return Int16Array
  }

  get Uint16Array() {
    return Uint16Array
  }

  get Int32Array() {
    return Int32Array
  }

  get Uint32Array() {
    return Uint32Array
  }

  get Float32Array() {
    return Float32Array
  }

  get Float64Array() {
    return Float64Array
  }

  get BigInt64Array() {
    return BigInt64Array
  }

  get BigUint64Array() {
    return BigUint64Array
  }
  // /////////////////

  _getSystemInfoSync() {
    if (!this.systemInfo) {
      this.systemInfo = wx.getSystemInfoSync()
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

  get devicePixelRatio() {
    this._getSystemInfoSync()
    return this.systemInfo.pixelRatio
  }

  get innerWidth() {
    this._getSystemInfoSync()
    return this.systemInfo.windowWidth
  }

  get innerHeight() {
    this._getSystemInfoSync()
    return this.systemInfo.windowHeight
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
    return Worker.self_postMessage(json)
  }
  onmessage(msg) {
    return Worker.self_onmessage(msg)
  }
}
