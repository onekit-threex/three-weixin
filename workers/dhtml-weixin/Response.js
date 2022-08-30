/* eslint-disable handle-callback-err */
/* eslint-disable no-console */
import Base64 from './core/Base64'

export default class Response {
  constructor(body, options = {}, request) {
    if (!request) {
      this.body = body
      this.status = options.status
      this.statusText = options.statusText
      this.headers = options.headers
    }
    this.status = 200
    this.request = request
  }

  _run(responseType, dataType = 'text') {
    console.error('[fetch]', this.request.url, responseType, dataType)

    if (this.request.url.endsWith('.js')) {
      return new Promise((resolve) => {
        resolve(this.request.url)
      })
    }
    if (this.request.url.startsWith('data:')) {
      return new Promise((resolve) => {
        const BASE64 = 'base64,'
        const url = this.request.url.substring(this.request.url.indexOf(BASE64) + BASE64.length)
        resolve(Base64.base64ToArrayBuffer(url))
      })
    }
    // /////////////////////////
    return new Promise((resolve) => {
      wx.request({
        url: this.request.url,
        headers: ((this.request.options || {}).headers || {}).data || {},
        responseType,
        dataType,
        success(res) {
          resolve(res.data)
        },
        fail: () => {
          console.error('[fetch]', this.request.url)
          // eslint-disable-next-line prefer-promise-reject-errors
          // reject(null)
        }
      })
    })
  }

  arrayBuffer() {
    return this._run('arraybuffer')
  }

  // eslint-disable-next-line class-methods-use-this
  blob() {
    throw new Error('[fetch]blob')
  }

  text() {
    return this._run('text')
  }

  json() {
    return this._run('text', 'json')
  }
}
