/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
import ArrayX from './core/ArrayX'

export default class EventTarget {
  constructor() {
    this._all_event_handlers = {}
  }

  addEventListener(type, handler) {
    if (!this._all_event_handlers[type]) {
      this._all_event_handlers[type] = []
    }
    this._all_event_handlers[type].push(handler)
  }

  removeEventListener(type, handler) {
    this._all_event_handlers[type] = ArrayX.remove(this._all_event_handlers[type], handler)
  }

  dispatchEvent(e) {
    const type = e.type
    const event_handlers = this._all_event_handlers[type] || []
    for(var event_handler of event_handlers){
      event_handler.call(this,e)
    }
  }
}
