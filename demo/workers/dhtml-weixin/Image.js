/* eslint-disable prefer-spread */
/* eslint-disable no-console */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */
/* eslint-disable no-cond-assign */
import EventTarget from './EventTarget'

function btoa(string) {
  const b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  string = String(string)
  let bitmap; let a; let b; let c
  let result = ''; let i = 0
  const rest = string.length % 3 // To determine the final padding

  for (; i < string.length;) {
    if ((a = string.charCodeAt(i++)) > 255 ||
      (b = string.charCodeAt(i++)) > 255 ||
      (c = string.charCodeAt(i++)) > 255) { throw new TypeError("Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range.") }

    bitmap = (a << 16) | (b << 8) | c
    result += b64.charAt(bitmap >> 18 & 63) + b64.charAt(bitmap >> 12 & 63) +
      b64.charAt(bitmap >> 6 & 63) + b64.charAt(bitmap & 63)
  }

  // If there's need of padding, replace the last 'A's with equal signs
  return rest ? result.slice(0, rest - 3) + '==='.substring(rest) : result
}
export default class Image extends EventTarget {
  constructor() {
    super()
    const canvas = getApp().canvas
    this.wx_image = canvas.createImage()
    this.wx_image.onload = () => {
      if (this.onload) {
        this.onload.call(this.wx_image, this.wx_image)
      }
      if (this._all_event_handlers.load) {
        this._all_event_handlers.load.forEach(handler => {
          handler.call(this.wx_image, this.wx_image)
        })
      }
    }
    this.wx_image.onerror = (e) => {
      if (this.onerror) {
        this.onerror.call(this.wx_image, e)
      }
      if (this._all_event_handlers.error) {
        this._all_event_handlers.error.forEach(handler => {
          handler.call(this.wx_image, e)
        })
      }
    }
  }

  set crossOrigin(crossOrigin) {
    this._crossOrigin = crossOrigin
  }

  get crossOrigin() {
    return this._crossOrigin
  }

  set src(src) {
    console.log('[Image]', src)
    this._src = src
     if (src.startsWith('blob:')) {
      const array = getApp().ObjectURL[src].array[0]

      let binary = ''
      const bytes = new Uint8Array(array)
      const len = bytes.byteLength
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i])
      }
      this.wx_image.src = 'data:image/png;base64,' + btoa(binary)
    } else {
      this.wx_image.src = src
    }
  }

  get src() {
    return this._src
  }
}
