




import Image from './Image'
import Window from './window'
import Location from './Location'
import EventTarget from './core/EventTarget'

import Style from './Style'
import Element from './core/Element'
import ClassCollection from './ClassCollection'

class HTMLElement extends Element {
  constructor() {
    super()
    this.style = new Style()
    this.classList = new ClassCollection()
    this._children = []
    this.textContent = ''
  }

  get ownerDocument() {
    return new Document()
  }

  get parentElement() {
    return new HTMLElement()
  }

  get children() {
    return this._children
  }

  appendChild() {
    // this._children.push(child)
  }

  removeChild() {
    // this._children.push(child)
  }

  insertBefore() {

  }

  setAttribute() {

  }

  toggleAttribute() {

  }

  click() {

  }

  getBoundingClientRect () {
    return {}
  }
}

class Head extends HTMLElement {

}

class Body extends HTMLElement {

}

export default class Document extends EventTarget {
  constructor() {
    super()
    this.window = new Window()
  }

  get body() {
    return new Body()
  }

  get head() {
    return new Head()
  }

  async createElementAsync(nodeName, canvasType = '2d') {
    switch (nodeName) {
      case 'canvas':
        return new Promise((resolve) => {
          const query = wx.createSelectorQuery()
          query.select(`#canvas_${canvasType}`)
            .fields({node: true})
            .exec((res) => {
              const canvas = res[0].node
              if (canvasType === '2d') {
                const context = canvas.getContext('2d')
                context.clearRect(0, 0, 10000, 10000)
              }
              resolve(canvas)
            })
        })
      default:
        console.error('createElementAsync', nodeName)
        throw new Error(nodeName)
    }
  }

  createElement(nodeName, canvasType = '2d') {
    switch (nodeName) {
      case 'canvas':
        return wx.createOffscreenCanvas({type: canvasType})
      case 'img':
        return new Image()
      default:
        return new HTMLElement()
    }
  }

  createElementNS(namesspace, nodeName, canvasType) {
    return this.createElement(nodeName, canvasType)
  }

  get documentElement() {
    return new HTMLElement()
  }

  getElementById() {
    return new HTMLElement()
  }

  querySelector() {
    return new HTMLElement()
  }

  get location() {
    return new Location()
  }

  querySelectorAll() {
    return []
  }
}
