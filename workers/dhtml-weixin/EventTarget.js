/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
import ArrayX from './core/ArrayX'

export default class EventTarget {
  constructor() {
    this._all_event_handlers = {}
  }

  addEventListener(eventName, handler) {
    if (!this._all_event_handlers[eventName]) {
      this._all_event_handlers[eventName] = []
    }
    this._all_event_handlers[eventName].push(handler)
  }

  removeEventListener(eventName, handler) {
    this._all_event_handlers[eventName] = ArrayX.remove(this._all_event_handlers[eventName], handler)
  }

  dispatchEvent() {

  }
}
