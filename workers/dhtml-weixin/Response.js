

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
      /* const pages = getCurrentPages()
      const page = pages[pages.length - 1]
      const currentUrl = '/' + page.route
      const abs = '/' + this.request.url
      const rel = PATH.abs2rel(currentUrl, abs)
      // console.error('uuuuuuuuuuuuuuuuuu', currentUrl, abs, rel)
      // eslint-disable-next-line import/no-dynamic-require
      //return require(`${rel}`) */
      return new Promise((resolve) => {
        resolve(this.request.url)
      })
    }
    // /////////////////////////
    return new Promise((resolve, reject) => {
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
          reject(null)
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
