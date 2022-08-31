/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-tabs */
/* eslint-disable no-case-declarations */
/* eslint-disable complexity */
import EventTarget from './EventTarget'

function json2message(json) {
  if (json == null) {
    return null
  }
  if (json instanceof ArrayBuffer) {
    return {
      t: 'ArrayBuffer',
      v: Array.prototype.slice.call(new Uint8Array(json))
    }
  }
  if (json instanceof Int8Array) {
    return {
      t: 'Int8Array',
      v: Array.prototype.slice.call(json)
    }
  }
  if (json instanceof Uint8Array) {
    return {
      t: 'Uint8Array',
      v: Array.prototype.slice.call(json)
    }
  }
  if (json instanceof Uint8ClampedArray) {
    return {
      t: 'Uint8ClampedArray',
      v: Array.prototype.slice.call(json)
    }
  }
  if (json instanceof Int16Array) {
    return {
      t: 'Int16Array',
      v: Array.prototype.slice.call(json)
    }
  }
  if (json instanceof Uint16Array) {
    return {
      t: 'Uint16Array',
      v: Array.prototype.slice.call(json)
    }
  }
  if (json instanceof Int32Array) {
    return {
      t: 'Int32Array',
      v: Array.prototype.slice.call(json)
    }
  }
  if (json instanceof Uint32Array) {
    return {
      t: 'Uint32Array',
      v: Array.prototype.slice.call(json)
    }
  }
  if (json instanceof Uint32Array) {
    return {
      t: 'Uint32Array',
      v: Array.prototype.slice.call(json)
    }
  }
  if (json instanceof Float32Array) {
    return {
      t: 'Float32Array',
      v: Array.prototype.slice.call(json)
    }
  }
  if (json instanceof Float64Array) {
    return {
      t: 'Float64Array',
      v: Array.prototype.slice.call(json)
    }
  }
  /*
  if (json instanceof BigInt64Array) {

    return {
      t: "BigInt64Array",
      v: Array.prototype.slice.call(json)
        }
    }
    if (json instanceof BigUint64Array) {
    return {
      t: "BigUint64Array",
      v: Array.prototype.slice.call(json)
    }
  } */
  if (json instanceof Array) {
    return {
      t: 'Array',
      v: json.map(item => json2message(item))
    }
  }
  if (typeof json === 'boolean') {
    return {
      t: 'Boolean',
      v: json
    }
  }
  if (typeof json === 'number') {
    return {
      t: 'Number',
      v: json
    }
  }
  if (typeof json === 'string') {
    return {
      t: 'String',
      v: json
    }
  }
  const dict = {}
  for (const key of Object.keys(json)) {
    dict[key] = json2message(json[key])
  }
  return {
    t: 'Dict',
    v: dict
  }
}

function message2json(message) {
  if (message == null) {
    return null
  }
  const value = message.v
  switch (message.t) {
    case 'ArrayBuffer':
      return new Uint8Array(value).buffer
    case 'Int8Array':
      return new Int8Array(value)
    case 'Uint8Array':
      return new Uint8Array(value)
    case 'Uint8ClampedArray':
      return new Uint8ClampedArray(value)
    case 'Int16Array':
      return new Int16Array(value)
    case 'Uint16Array':
      return new Uint16Array(value)
    case 'Int32Array':
      return new Int32Array(value)
    case 'Uint32Array':
      return new Uint32Array(value)
    case 'Float32Array':
      return new Float32Array(value)
    case 'Float64Array':
      return new Float64Array(value)
    /*
  case 'BigInt64Array':
    return new BigInt64Array(value)
  case 'BigUint64Array':
    return new BigUint64Array(value) */
    case 'Array':
      return value.map(item => message2json(item))
    case 'Boolean':
    case 'String':
    case 'Number':
      return value
    case 'Dict':
      const dict = {}
      for (const key of Object.keys(value)) {
        dict[key] = message2json(value[key])
      }
      return dict
    default:
      throw new Error(message.t)
  }
}
export default class Worker extends EventTarget {
  static self_onmessage (data) {
    return message2json(data.msg.data)
  }

  static self_postMessage(json) {
    return worker.postMessage(json2message(json))
  }
  // /////////////////
  constructor(url) {
    super()
    console.log('[Worker]', url)
    const createNewWorker = () => {
      const worker = wx.createWorker('workers/' + url, {
        useExperimentalWorker: true
      })
      worker.onMessage((msg) => {
        if (this.onmessage) {
          this.onmessage({
            data: message2json(msg)
          })
        }
        if (this._all_event_handlers.message) {
          this._all_event_handlers.message.forEach(handler => {
            handler.apply(this)
          })
        }
      })
      // 监听 worker 被系统回收事件
      worker.onProcessKilled(() => {
        // 重新创建一个worker
        createNewWorker()
      })
      this._worker = worker
    }
    createNewWorker()
    getApp().worker = this
  }

  postMessage(json) {
    const message = json2message(json)
    // console.error(message)
    this._worker.postMessage(message)
  }

  terminate() {
    this._worker.terminate()
  }
}
