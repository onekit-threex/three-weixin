module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1663342576243, function(require, module, exports) {
var __TEMP__ = require('./Blob');var Blob = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./createImageBitmap');var createImageBitmap = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./CSSStyleDeclaration');var CSSStyleDeclaration = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./document');var Document = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./fetch');var fetch = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Headers');var Headers = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./HTMLImageElement');var HTMLImageElement = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./HTMLCanvasElement');var HTMLCanvasElement = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./ImageBitmap');var ImageBitmap = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./navigator');var navigator = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Request');var Request = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./requestAnimationFrame');var requestAnimationFrame = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./cancelAnimationFrame');var cancelAnimationFrame = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Response');var Response = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./URL');var URL = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./window');var Window = __REQUIRE_DEFAULT__(__TEMP__);
const WebAssembly = require("./WebAssembly");
var __TEMP__ = require('./Worker');var Worker = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./XMLHttpRequest');var XMLHttpRequest = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Location');var Location = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./core/xmldom/dom-parser');var DOMParser = __TEMP__['DOMParser'];
var __TEMP__ = require('./core/index');var core = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./EventTarget');var EventTarget = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Element');var Element = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Node');var Node = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Event');var Event = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Performance');var Performance = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./btoa');var btoa = __REQUIRE_DEFAULT__(__TEMP__);
const performance = new Performance();
const document = new Document();
const window = new Window();
const self = window;
const location = new Location();
module.exports = {
  Blob,
  btoa,
  createImageBitmap,
  CSSStyleDeclaration,
  performance,
  document,
  DOMParser,
  EventTarget,
  Element,
  fetch,
  Headers,
  HTMLCanvasElement,
  HTMLImageElement,
  ImageBitmap,
  location,
  navigator,
  Node,
  Event,
  Request,
  requestAnimationFrame,
  cancelAnimationFrame,
  Response,
  self,
  URL,
  window,
  WebAssembly,
  Worker,
  XMLHttpRequest,
  core,
};

}, function(modId) {var map = {"./Blob":1663342576244,"./createImageBitmap":1663342576245,"./CSSStyleDeclaration":1663342576253,"./document":1663342576254,"./fetch":1663342576271,"./Headers":1663342576273,"./HTMLImageElement":1663342576246,"./HTMLCanvasElement":1663342576262,"./ImageBitmap":1663342576263,"./navigator":1663342576274,"./Request":1663342576275,"./requestAnimationFrame":1663342576260,"./cancelAnimationFrame":1663342576261,"./Response":1663342576272,"./URL":1663342576256,"./window":1663342576255,"./WebAssembly":1663342576276,"./Worker":1663342576264,"./XMLHttpRequest":1663342576277,"./Location":1663342576259,"./core/xmldom/dom-parser":1663342576278,"./core/index":1663342576282,"./EventTarget":1663342576247,"./Element":1663342576268,"./Node":1663342576269,"./Event":1663342576249,"./Performance":1663342576258,"./btoa":1663342576251}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576244, function(require, module, exports) {
/* eslint-disable camelcase */
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Blob {
  constructor(array, options) {
    this.array = array
    this.options = options
  }
  get size(){
    return this.array[0].length
  }
  arrayBuffer(){
    return this.array[0]
  }
};exports.default = Blob

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576245, function(require, module, exports) {
/* eslint-disable no-unused-vars */
var __TEMP__ = require('./HTMLImageElement');var HTMLImageElement = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./core/Page');var Page = __REQUIRE_DEFAULT__(__TEMP__);

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function createImageBitmap(src, options) {
  return new Promise((resolve) => {
    const canvas = Page.current.canvas
    const img = new HTMLImageElement(canvas)
    img.onload = function() {
      resolve(img)
    }
    img.src = src
  })
};exports.default = createImageBitmap

}, function(modId) { var map = {"./HTMLImageElement":1663342576246,"./core/Page":1663342576252}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576246, function(require, module, exports) {
/* eslint-disable prefer-spread */
/* eslint-disable no-console */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */
/* eslint-disable no-cond-assign */
var __TEMP__ = require('./EventTarget');var EventTarget = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./core/Base64');var Base64 = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./core/Page');var Page = __REQUIRE_DEFAULT__(__TEMP__);
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class HTMLImageElement extends EventTarget {
	constructor(canvas2d) {
		super();
		const canvas = canvas2d || Page.current.canvas;
		this.wx_element = canvas.createImage();
		this.wx_element.onload = () => {
			if (this.onload) {
				this.onload.call(this);
			}
			if (this._all_event_handlers.load) {
				this._all_event_handlers.load.forEach((handler) => {
					handler.call(this);
				});
			}
		};
		this.wx_element.onerror = (e) => {
			if (this.onerror) {
				this.onerror.call(this, e);
			}
			if (this._all_event_handlers.error) {
				this._all_event_handlers.error.forEach((handler) => {
					handler.call(this, e);
				});
			}
		};
		this.onekit_image = this;
	}
	get width() {
		return this.wx_element.width;
	}
	get height() {
		return this.wx_element.height;
	}
	get data() {
		return this.wx_element.data;
	}
	get complete() {
		return this.wx_element.complete;
	}
	set crossOrigin(crossOrigin) {
		this._crossOrigin = crossOrigin;
	}

	get crossOrigin() {
		return this._crossOrigin;
	}

	set src(src) {
		const onekit_debug = Page.getApp().onekit_debug
		if (onekit_debug) {
			if (src.startsWith("data:")) {
				console[onekit_debug]("[image]", "blob");
			} else {
				console[onekit_debug]("[image]", src);
			}
		}
		this._src = src;

		if (src.startsWith("blob:")) {
			try {
				const arrayBuffer = Page.current.DataURL[src].array[0]
				const base64 = "data:image/png;base64," + Base64.arrayBufferToBase64(arrayBuffer)
				this.wx_element.src = base64
			} catch (ex) {
				console.error(ex);
			}
		} else {
			this.wx_element.src = src;
		}
	}

	get src() {
		return this._src;
	}
};exports.default = HTMLImageElement

}, function(modId) { var map = {"./EventTarget":1663342576247,"./core/Base64":1663342576250,"./core/Page":1663342576252}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576247, function(require, module, exports) {
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
var __TEMP__ = require('./core/ArrayX');var ArrayX = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Event');var Event = __REQUIRE_DEFAULT__(__TEMP__);

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class EventTarget {
  constructor() {
    this._all_event_handlers = {};
  }

  addEventListener(type, handler) {
    if (!this._all_event_handlers[type]) {
      this._all_event_handlers[type] = [];
    }
    this._all_event_handlers[type].push(handler);
  }

  removeEventListener(type, handler) {
    this._all_event_handlers[type] = ArrayX.remove(
      this._all_event_handlers[type],
      handler
    );
  }

  createEvent(type) {
    return new Event(type);
  }
  dispatchEvent(e) {
    setTimeout(() => {
      var type = e.type;
      switch (e.type) {
        case "touchstart":
          type = "pointerdown";
          break;
        case "touchmove":
          type = "pointermove";
         /* const prev_e = this._prev_e;
          if (prev_e) {
            if (
              Math.abs(prev_e.clientX - e.clientX) < 5 &&
              Math.abs(prev_e.clientY - e.clientY) < 5
            ) {
              return;
            }
          }
          this._prev_e = e;*/
          break;
        case "touchend":
          type = "pointerup";
          break;
        case "touchcancel":
          type = "pointercancel";
          break;
        default:
          break;
      }
      const event_handlers = this._all_event_handlers[type] || [];
      for (var event_handler of event_handlers) {
        event_handler.call(this, e);
      }
    }, 1);
  }
};exports.default = EventTarget

}, function(modId) { var map = {"./core/ArrayX":1663342576248,"./Event":1663342576249}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576248, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = {
  remove(array, item) {
    const index = array.indexOf(item)
    if (index > -1) {
      array.splice(index, 1)
    }
    return array
  }
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576249, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Event {
    
    static fix(wx_e){
        const web_e = new Event(wx_e.type)
        web_e.button = null;
        web_e.ctrlKey = false;
        web_e.metaKey = false;
        web_e.shiftKey = false;
        web_e.code = "";
        web_e.pointerType = "touch";
        //
        if(wx_e.changedTouches.length>0){
            const touch = wx_e.changedTouches[0]
            web_e.pointerId = touch.identifier || 2;
            web_e.pageX = touch.x;
            web_e.pageY = touch.y;
            web_e.clientX = touch.x-wx_e.currentTarget.offsetLeft;
            web_e.clientY = touch.y-wx_e.currentTarget.offsetTop;
            //
            web_e.offsetX = web_e.clientX;
            web_e.offsetY = web_e.clientY;
            web_e.deltaX = web_e.offsetX;
            web_e.deltaY = web_e.offsetY;
        }
        return web_e
    }
    
    //////////////////////////////////////////////////////////////

    constructor(type, options) {
        this.type = type
        this.options = options
    }
    preventDefault() {

    }
};exports.default = Event

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576250, function(require, module, exports) {
/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-var */
/* eslint-disable no-mixed-operators */
/* eslint-disable vars-on-top */
/* eslint-disable no-bitwise */
var __TEMP__ = require('../btoa');var btoa = __REQUIRE_DEFAULT__(__TEMP__);
function b64ToUint6(nChr) {
  return nChr > 64 && nChr < 91
    ? nChr - 65
    : nChr > 96 && nChr < 123
      ? nChr - 71
      : nChr > 47 && nChr < 58
        ? nChr + 4
        : nChr === 43
          ? 62
          : nChr === 47
            ? 63
            : 0
}
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Base64 {
  static arrayBufferToBase64(array) {
  //  return String.fromCharCode.apply(null, new Int8Array(buffer))
  
      let binary = ''
      const bytes = new Uint8Array(array)
      const len = bytes.byteLength
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i])
      }
      return btoa(binary)
  }

  static base64ToArrayBuffer(sBase64, nBlockSize) {
    const
      sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ''); const nInLen = sB64Enc.length
    const nOutLen = nBlockSize ? Math.ceil((nInLen * 3 + 1 >>> 2) / nBlockSize) * nBlockSize : nInLen * 3 + 1 >>> 2; const
      aBytes = new Int8Array(nOutLen)

    for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
      nMod4 = nInIdx & 3
      nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4
      if (nMod4 === 3 || nInLen - nInIdx === 1) {
        for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
          aBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255
        }
        nUint24 = 0
      }
    }

    return aBytes.buffer
  }
};exports.default = Base64

}, function(modId) { var map = {"../btoa":1663342576251}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576251, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function btoa(string) {
  const b64 =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  string = String(string);
  let bitmap;
  let a;
  let b;
  let c;
  let result = "";
  let i = 0;
  const rest = string.length % 3; // To determine the final padding

  for (; i < string.length; ) {
    if (
      (a = string.charCodeAt(i++)) > 255 ||
      (b = string.charCodeAt(i++)) > 255 ||
      (c = string.charCodeAt(i++)) > 255
    ) {
      throw new TypeError(
        "Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range."
      );
    }

    bitmap = (a << 16) | (b << 8) | c;
    result +=
      b64.charAt((bitmap >> 18) & 63) +
      b64.charAt((bitmap >> 12) & 63) +
      b64.charAt((bitmap >> 6) & 63) +
      b64.charAt(bitmap & 63);
  }

  // If there's need of padding, replace the last 'A's with equal signs
  return rest ? result.slice(0, rest - 3) + "===".substring(rest) : result;
};exports.default = btoa

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576252, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Page{
    static get current(){
        const pages = this.getCurrentPages()
        return pages[pages.length-1]
    }
    static getCurrentPages(){
        if(typeof requireMiniProgram =="undefined"){
            return getCurrentPages()
        }else{
            return requireMiniProgram().getCurrentPages()
        }
    }
    static getApp(){
        if(typeof requireMiniProgram =="undefined"){
            return getApp()
        }else{
            return requireMiniProgram().getApp()
        }
    }
};exports.default = Page
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576253, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class CSSStyleDeclaration {
  constructor() {
    this.fill = ''
    this['fill-opacity'] = ''
    this['fill-rule'] = ''
    this.opacity = ''
    this.stroke = ''
    this['stroke-opacity'] = ''
    this['stroke-width'] = ''
    this['stroke-linejoin'] = ''
    this['stroke-linecap'] = ''
    this['stroke-miterlimit'] = ''
    this.visibility = ''
  }

  static parse(css) {
    const style = new CSSStyleDeclaration()
    const pairs = css.split(';')
    for (const pair of pairs) {
      if (!pair) {
        continue
      }
      if (!pair.includes(':')) {
        continue
      }
      const kv = pair.trim().split(':')
      style[kv[0].trim()] = kv[1].trim()
    }
    return style
  }
};exports.default = CSSStyleDeclaration

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576254, function(require, module, exports) {
/* eslint-disable no-redeclare */
/* eslint-disable import/export */
/* eslint-disable no-use-before-define */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
var __TEMP__ = require('./HTMLImageElement');var HTMLImageElement = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./window');var Window = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Location');var Location = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./EventTarget');var EventTarget = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./core/Page');var Page = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Style');var Style = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Element');var Element = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./ClassCollection');var ClassCollection = __REQUIRE_DEFAULT__(__TEMP__);
const window = new Window()
function getPage() {
  const pages = Page.getCurrentPages();
  return pages[pages.length - 1];
}
class HTMLElement extends Element {
  constructor(wx_element) {
    super();
    this.wx_element = wx_element;
    this.style = new Style();
    this.classList = new ClassCollection();
    this._children = [];
    this._childNodes = [];
    this.textContent = "";
  }

  get ownerDocument() {
    return new Document();
  }

  get parentElement() {
    return new HTMLElement();
  }
  set id(id) {
    this._id = id;
    this.wx_key = id;
  }
  get id() {
    return this._id;
  }
  get children() {
    return this._children;
  }
  get childNodes() {
    return this._childNodes;
  }
  set innerHTML(innerHTML) {
    if (typeof innerHTML != "string") {
      return;
    }
    innerHTML = innerHTML.replaceAll("<br/>", "\n");
    innerHTML = innerHTML.replaceAll("<br>", "\n");
    innerHTML = innerHTML.replaceAll("&nbsp;", " ");
    const page = getPage();
    const key = `${this.wx_key}_innerHTML`;
    const data = {};
    data[key] = innerHTML;
    page.setData(data);
  }
  get innerHTML() {
    return this._innerHTML;
  }
  append() {}
  appendChild() {}
  removeChild() {}
  remove() {}

  insertBefore() {}

  setAttribute() {}

  toggleAttribute() {}

  click() {}

  getBoundingClientRect() {
		if (this.wx_element) {
			return {
				left: 0,
				top:0,
				width: this.wx_element.width/window.devicePixelRatio,
				height: this.wx_element.height/window.devicePixelRatio,
			};
		}
		return {
			left: 0,
			top: 0,
			width: 0,
			height: 0
		};
  }
  play() {}
  setPointerCapture() {}
  releasePointerCapture() {}
  get clientWidth() {
    return this.wx_element ? this.wx_element.width : 0;
  }
  get clientHeight() {
    return this.wx_element ? this.wx_element.height : 0;
  }
}

class Head extends HTMLElement {}

class Body extends HTMLElement {}

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Document extends EventTarget {
  constructor() {
    super();
    this.window = window;
  }

  get body() {
    return new Body();
  }

  get head() {
    return new Head();
  }

  async createElementAsync(nodeName, canvasType = "2d", THIS) {
    switch (nodeName) {
      case "canvas":
        return new Promise((resolve) => {
          var query = wx.createSelectorQuery();
          if (THIS) {
            query = query.in(THIS);
          }
          query
            .select(`#canvas_${canvasType}`)
            .fields({ node: true })
            .exec((res) => {
              const canvas = res[0].node;
              if (canvasType === "2d") {
                const context = canvas.getContext("2d");
                context.clearRect(0, 0, 10000, 10000);
              }
              resolve(canvas);
            });
        });
      default:
        console.error("createElementAsync", nodeName);
        throw new Error(nodeName);
    }
  }

  async getElementByIdAsync(id) {
    return new Promise((resolve) => {
      const query = wx.createSelectorQuery();
      query
        .select(`#${id}`)
        .fields({ node: true })
        .exec((res) => {
          resolve(res[0].node);
        });
    });
  }

  async getElementsByTagNameAsync(tagName) {
    return new Promise((resolve) => {
      const query = wx.createSelectorQuery();
      query
        .select(tagName)
        .fields({ node: true })
        .exec((res) => {
          resolve(res[0].node);
        });
    });
  }

  async getElementsByClassNameAsync(className) {
    return new Promise((resolve) => {
      const query = wx.createSelectorQuery();
      query
        .select(`.${className}`)
        .fields({ node: true })
        .exec((res) => {
          resolve(res[0].node);
        });
    });
  }

  createElement(nodeName, canvasType = "2d",canvas) {
    switch (nodeName) {
      case "canvas":
        return wx.createOffscreenCanvas({ type: canvasType });
      case "img":
        return new HTMLImageElement(canvas);
      default:
        return new HTMLElement();
    }
  }

  createElementNS(namesspace, nodeName, canvasType) {
    return this.createElement(nodeName, canvasType);
  }

  get documentElement() {
    return new HTMLElement();
  }

  getElementById() {
    return new HTMLElement();
  }

  getElementsByTagName() {
    return [];
  }

  getElementsByClassName() {
    return [];
  }

  querySelector() {
    return new HTMLElement();
  }

  get location() {
    return new Location();
  }

  querySelectorAll() {
    return [];
  }
};exports.default = Document

}, function(modId) { var map = {"./HTMLImageElement":1663342576246,"./window":1663342576255,"./Location":1663342576259,"./EventTarget":1663342576247,"./core/Page":1663342576252,"./Style":1663342576266,"./Element":1663342576268,"./ClassCollection":1663342576270}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576255, function(require, module, exports) {
/* eslint-disable no-undef */
/* eslint-disable getter-return */
/* eslint-disable class-methods-use-this */
var __TEMP__ = require('./EventTarget');var EventTarget = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./URL');var URL = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Performance');var Performance = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Location');var Location = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./requestAnimationFrame');var requestAnimationFrame = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./cancelAnimationFrame');var cancelAnimationFrame = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./createImageBitmap');var createImageBitmap = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./HTMLImageElement');var HTMLImageElement = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./HTMLCanvasElement');var HTMLCanvasElement = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./ImageBitmap');var ImageBitmap = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Worker');var Worker = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./btoa');var btoa = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./AudioContext');var AudioContext = __REQUIRE_DEFAULT__(__TEMP__);
// ///////////////////////////////////////////////

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Window extends EventTarget {
  get btoa() {
    return btoa
  }
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
    if (!this.onekit_systemInfo) {
      this.onekit_systemInfo = wx.getSystemInfoSync()
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
  get HTMLImageElement() {
    return HTMLImageElement
  }
  get HTMLCanvasElement() {
    return HTMLCanvasElement
  }
  get ImageBitmap() {
    return ImageBitmap
  }
  get devicePixelRatio() {
    this._getSystemInfoSync()
    return this.onekit_systemInfo.pixelRatio
  }

  get innerWidth() {
    this._getSystemInfoSync()
    return this.onekit_systemInfo.windowWidth
  }

  get innerHeight() {
    this._getSystemInfoSync()
    return this.onekit_systemInfo.windowHeight
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
};exports.default = Window

}, function(modId) { var map = {"./EventTarget":1663342576247,"./URL":1663342576256,"./Performance":1663342576258,"./Location":1663342576259,"./requestAnimationFrame":1663342576260,"./cancelAnimationFrame":1663342576261,"./createImageBitmap":1663342576245,"./HTMLImageElement":1663342576246,"./HTMLCanvasElement":1663342576262,"./ImageBitmap":1663342576263,"./Worker":1663342576264,"./btoa":1663342576251,"./AudioContext":1663342576265}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576256, function(require, module, exports) {
var __TEMP__ = require('./core/GUID');var GUID = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./core/Page');var Page = __REQUIRE_DEFAULT__(__TEMP__);
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class URL {
  static createObjectURL(blob) {
    const guid = GUID();
    const url = `blob:http://localhost/${guid}`;
    try {
  const page = Page.current
if(!page.DataURL){
    page.DataURL = {}
}
page.DataURL[url] = blob
    } catch (ex) {
      console.error(ex);
    }
    return url;
  }

  static revokeObjectURL(url) {
    try {
        delete  Page.current.DataURL[url]
    } catch (ex) {
      console.error(ex);
    }
  }
};exports.default = URL

}, function(modId) { var map = {"./core/GUID":1663342576257,"./core/Page":1663342576252}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576257, function(require, module, exports) {
/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function GUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0; const
      v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
};exports.default = GUID

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576258, function(require, module, exports) {
/* eslint-disable class-methods-use-this */
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Performance {
  constructor() {
    this.wx_performance = wx.getPerformance();
  }
  now() {
    return this.wx_performance.now();
  }
};exports.default = Performance

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576259, function(require, module, exports) {
/* eslint-disable class-methods-use-this */
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Location {
  constructor() {
    this.hash = ''
    this.search = ''
    this.href = ''
  }
};exports.default = Location

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576260, function(require, module, exports) {
var __TEMP__ = require('./core/Page');var Page = __REQUIRE_DEFAULT__(__TEMP__);
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function requestAnimationFrame(callback,canvas=Page.current.canvas) {
  if(!canvas){
    return
  }
  if(canvas && canvas.wx_element){
    canvas = canvas.wx_element
  }
  const requestId = canvas.requestAnimationFrame(callback)
  return requestId
};exports.default = requestAnimationFrame

}, function(modId) { var map = {"./core/Page":1663342576252}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576261, function(require, module, exports) {
var __TEMP__ = require('./core/Page');var Page = __REQUIRE_DEFAULT__(__TEMP__);
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function cancelAnimationFrame(requestId,canvas=Page.current.canvas) {
	try {
		if(!canvas){
			return
		  }
		if (!requestId) {
			return
		}
		if (canvas && canvas.wx_element) {
			canvas = canvas.wx_element
		}
		canvas.cancelAnimationFrame(requestId)
	} catch (ex) {
		console.error(ex)
	}
};exports.default = cancelAnimationFrame

}, function(modId) { var map = {"./core/Page":1663342576252}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576262, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class HTMLCanvasElement {
  constructor(wx_element) {
    this.wx_element = wx_element;
  }
  get width() {
    return this.wx_element.width;
  }
  get height() {
    return this.wx_element.height;
  }
};exports.default = HTMLCanvasElement

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576263, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class ImageBitmap {
  constructor(wx_element) {
    this.wx_element = wx_element;
  }
  get width() {
    return this.wx_element.width;
  }
  get height() {
    return this.wx_element.height;
  }
  get data() {
    return this.wx_element.data;
  }
};exports.default = ImageBitmap

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576264, function(require, module, exports) {
/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-tabs */
/* eslint-disable no-case-declarations */
/* eslint-disable complexity */
var __TEMP__ = require('./EventTarget');var EventTarget = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./core/Page');var Page = __REQUIRE_DEFAULT__(__TEMP__);
function json2message(json) {
  if (json == null) {
    return null;
  }
  if (json instanceof ArrayBuffer) {
    return {
      t: "ArrayBuffer",
      v: json,
    };
  }
  if (json instanceof Int8Array) {
    return {
      t: "Int8Array",
      v: json.buffer,
    };
  }
  if (json instanceof Uint8Array) {
    return {
      t: "Uint8Array",
      v: json.buffer,
    };
  }
  if (json instanceof Uint8ClampedArray) {
    return {
      t: "Uint8ClampedArray",
      v: json.buffer,
    };
  }
  if (json instanceof Int16Array) {
    return {
      t: "Int16Array",
      v: json.buffer,
    };
  }
  if (json instanceof Uint16Array) {
    return {
      t: "Uint16Array",
      v: json.buffer,
    };
  }
  if (json instanceof Int32Array) {
    return {
      t: "Int32Array",
      v: json.buffer,
    };
  }
  if (json instanceof Uint32Array) {
    return {
      t: "Uint32Array",
      v: json.buffer,
    };
  }
  if (json instanceof Uint32Array) {
    return {
      t: "Uint32Array",
      v: json.buffer,
    };
  }
  if (json instanceof Float32Array) {
    return {
      t: "Float32Array",
      v: json.buffer,
    };
  }
  if (json instanceof Float64Array) {
    return {
      t: "Float64Array",
      v: json.buffer,
    };
  }
  if (json instanceof Array) {
    return {
      t: "Array",
      v: json.map((item) => json2message(item)),
    };
  }
  if (typeof json === "boolean") {
    return {
      t: "Boolean",
      v: json,
    };
  }
  if (typeof json === "number") {
    return {
      t: "Number",
      v: json,
    };
  }
  if (typeof json === "string") {
    return {
      t: "String",
      v: json,
    };
  }
  const dict = {};
  for (const key of Object.keys(json)) {
    dict[key] = json2message(json[key]);
  }
  return {
    t: "Dict",
    v: dict,
  };
}

function message2json(message) {
  if (message == null) {
    return null;
  }
  const value = message.v;
  switch (message.t) {
    case "ArrayBuffer":
      return value;
    case "Int8Array":
      return new Int8Array(value);
    case "Uint8Array":
      return new Uint8Array(value);
    case "Uint8ClampedArray":
      return new Uint8ClampedArray(value);
    case "Int16Array":
      return new Int16Array(value);
    case "Uint16Array":
      return new Uint16Array(value);
    case "Int32Array":
      return new Int32Array(value);
    case "Uint32Array":
      return new Uint32Array(value);
    case "Float32Array":
      return new Float32Array(value);
    case "Float64Array":
      return new Float64Array(value);

    case "Array":
      return value.map((item) => message2json(item));
    case "Boolean":
    case "String":
    case "Number":
      return value;
    case "Dict":
      const dict = {};
      for (const key of Object.keys(value)) {
        dict[key] = message2json(value[key]);
      }
      return dict;
    default:
      throw new Error(message.t);
  }
}
/*
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
*/
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Worker extends EventTarget {
  static self_onmessage(msg) {
    return { data: message2json(msg) };
  }

  static self_postMessage(json) {
    return worker.postMessage(json2message(json));
  }
  // /////////////////
  constructor(url) {
    super();
		const onekit_debug = Page.getApp().onekit_debug
    if (onekit_debug) {
      console[onekit_debug]("[Worker]", url);
    }
    const createNewWorker = () => {
      const worker = wx.createWorker("workers/" + url, {
        useExperimentalWorker: true,
      });
      worker.onMessage((msg) => {
        if (this.onmessage) {
          this.onmessage({
            data: message2json(msg),
          });
        }
        if (this._all_event_handlers.message) {
          this._all_event_handlers.message.forEach((handler) => {
            handler.apply(this);
          });
        }
      });
      // 监听 worker 被系统回收事件
      worker.onProcessKilled(() => {
        // 重新创建一个worker
        createNewWorker();
      });
      this._worker = worker;
    };
    createNewWorker();
  }

  postMessage(json) {
    const message = json2message(json);
    // console.error(message)
    this._worker.postMessage(message);
  }

  terminate() {
    this._worker.terminate();
  }
};exports.default = Worker

}, function(modId) { var map = {"./EventTarget":1663342576247,"./core/Page":1663342576252}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576265, function(require, module, exports) {
class Gain {
    constructor(wx_gain) {
        this.wx_gain = wx_gain
    }
    connect() {

    }
}
class BufferSource {
    constructor(wx_source) {
        this.wx_source = wx_source
    }
    get playbackRate(){
        return this.wx_source.playbackRate
    }
    set buffer(buffer){
        this.wx_source.buffer = buffer
    }
    set loop(loop){
        this.wx_source.loop = loop
    }
    set loopStart(loopStart){
        this.wx_source.loopStart = loopStart
    }
    set loopEnd(loopEnd){
        this.wx_source.loopEnd = loopEnd
    }
    set onended(onended){
        this.wx_source.onended = onended
    }
    start(when, offset, duration){
        this.wx_source.start(  when, offset, duration)
    }
    stop(){
        this.wx_source.stop( )
    }
    connect(data){
        this.wx_source.connect( data)
    }
}
class Panner {
    constructor(wx_panner) {
        this.wx_panner = wx_panner
    }
    set panningModel(panningModel) {
        this.wx_panner.panningModel = panningModel
    }
    connect(gain) {
      //  this.wx_panner.connct(gain.wx_gain)
    }
}
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class AudioContext {
    constructor() {
        this.wx_context = wx.createWebAudioContext()
    }
    createBufferSource() {
        return new BufferSource(this.wx_context.createBufferSource())
    }
    createPanner() {
        return new Panner(this.wx_context.createPanner())
    }
    get currentTime() {
        return this.wx_context.currentTime
    }
    get destination() {
        return this.wx_context.destination
    }
    createGain() {
        return new Gain(this.wx_context.createGain())
    }
    createMediaElementSource(mediaElement) {

    }
    createMediaStreamSource(mediaStream) {

    }
    decodeAudioData(arrayBuffer, successCallback, errorCallback) {
        this.wx_context.decodeAudioData(arrayBuffer, buffer => {
            successCallback(buffer)
        }, err => {
            errorCallback(err)
        })
    }
};exports.default = AudioContext
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576266, function(require, module, exports) {

/* eslint-disable class-methods-use-this */
var __TEMP__ = require('./core/String');var String = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./core/Page');var Page = __REQUIRE_DEFAULT__(__TEMP__);
function fix(value){
    if(value.endsWith("px")){
        value = value.substring(0,value.length-2)
    }
    return value
}
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Style {
	constructor(element) {
		//this.element = element;
		this.styles = {};
		this.value = "";
	}
	set cssText(cssText) {
		this._cssText = cssText;
	}

	get cssText() {
		return this._cssText;
	}

	setProperty() {}
	run(key, value) {
		return
        if(!this.element){
            return
        }
		if(!this.element.wx_key){
			return
		}
		/*
		function dict2string(dict) {
		  var string = "";
		  for (const key of Object.keys(dict)) {
		    string += `${String.fromHump(key)}:${dict[key]};`;
		  }
		  return string;
		}
		const data = {};
		data[`${this.element.wx_key}_style`] = dict2string(this.styles);*/

		const data = {};
		this.value += `${String.fromHump(key)}:${value};`;
		data[`${this.element.wx_key}_style`] = this.value
		//
		if (!this.page) {
			const pages = page.getCurrentPages();
			this.page = pages[pages.length - 1];
		}
		if(!this.page){
			return
		}
		//this.page.setData(data);
	}
	set display(value) {
		//this.styles.display = value;
		this.run("display", value);
	}
	set pointerEvents(value) {
		//this.styles.pointerEvents = value;
		this.run("pointerEvents", value);
	}

	set margin(value) {
		//this.styles.margin = value;
		this.run("margin", value);
	}
	set marginBottom(value) {
		//this.styles.marginBottom = value;
		this.run("marginBottom", value);
	}
	set marginTop(value) {
		//this.styles.marginTop = value;
		this.run("marginTop", value);
	}
	set marginLeft(value) {
		//this.styles.marginLeft = value;
		this.run("marginLeft", value);
	}
	set marginRight(value) {
		//this.styles.marginRight = value;
		this.run("marginRight", value);
	}

	set padding(value) {
		//this.styles.padding = value;
		this.run("padding", value);
	}
	set paddingBottom(value) {
		//this.styles.paddingBottom = value;
		this.run("paddingBottom", value);
	}
	set paddingTop(value) {
		//this.styles.paddingTop = value;
		this.run("paddingTop", value);
	}
	set paddingLeft(value) {
		//this.styles.paddingLeft = value;
		this.run("paddingLeft", value);
	}
	set paddingRight(value) {
		//this.styles.paddingRight = value;
		this.run("paddingRight", value);
	}

	set position(value) {
		//this.styles.position = value;
		this.run("position", value);
	}
	set backfaceVisibility(value) {
		//this.styles.backfaceVisibility = value;
		this.run("backfaceVisibility", value);
	}
	set transformStyle(value) {
		//this.styles.transformStyle = value;
		this.run("transformStyle", value);
	}
	set fontFamily(value) {
		//this.styles.fontFamily = value;
		this.run("fontFamily", value);
	}
	set fontSize(value) {
		//this.styles.fontSize = value;
		this.run("fontSize", value);
	}
	set fontStyle(value) {
		//this.styles.fontStyle = value;
		this.run("fontStyle", value);
	}
	set fontWeight(value) {
		//this.styles.fontWeight = value;
		this.run("fontWeight", value);
	}
	set letterSpacing(value) {
		//this.styles.letterSpacing = value;
		this.run("letterSpacing", value);
	}
	set color(value) {
		//this.styles.color = value;
		this.run("color", value);
	}
	set background(value) {
		//this.styles.background = value;
		this.run("background", value);
	}
	set backgroundColor(value) {
		//this.styles.backgroundColor = value;
		this.run("backgroundColor", value);
	}
	set touchAction(value) {
		//this.styles.touchAction = value;
		this.run("touchAction", value);
	}
	set visibility(value) {
		//this.styles.visibility = value;
		this.run("visibility", value);
	}
	set zoom(value) {
		//this.styles.zoom = value;
		this.run("zoom", value);
	}
	set userSelect(value) {
		//this.styles.userSelect = value;
		this.run("userSelect", value);
	}
	set overflow(value) {
		//this.styles.overflow = value;
		this.run("overflow", value);
	}

	set width(value0) {
		this.run("width", value0);
	}
	set height(value0) {
		this.run("height", value0);
	}
	set left(value0) {
		this.run("left", value0);
	}
	set right(value0) {
		this.run("right", value0);
	}
	set top(value0) {
		this.run("top", value0);
	}
	set bottom(value0) {
		this.run("bottom", value0);
    }


	set opacity(value) {
		//this.styles.opacity = value;
		this.run("opacity", value);
	}
	set transform(value) {
		//this.styles.transform = value;
		this.run("transform", value);
	}
	set transformOrigin(value) {
		//this.styles.transformOrigin = value;
		this.run("transformOrigin", value);
	}
};exports.default = Style

}, function(modId) { var map = {"./core/String":1663342576267,"./core/Page":1663342576252}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576267, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class String {
  static fromHump(s) {
    return s.replace(/([A-Z])/g, "-$1").toLowerCase();
  }
  static toHump(name) {
    return name.replace(/\-(\w)/g, function (all, letter) {
      console.log(all); //"_T"
      console.log(letter); //"T"
      return letter.toUpperCase();
    });
  }
};exports.default = String

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576268, function(require, module, exports) {
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
var __TEMP__ = require('./Node');var Node = __REQUIRE_DEFAULT__(__TEMP__);

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Element extends Node {
  constructor() {
    super()
  }
};exports.default = Element

}, function(modId) { var map = {"./Node":1663342576269}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576269, function(require, module, exports) {
/* eslint-disable no-useless-constructor */
var __TEMP__ = require('./EventTarget');var EventTarget = __REQUIRE_DEFAULT__(__TEMP__);

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Node extends EventTarget {
  constructor() {
    super()
  }
};exports.default = Node

}, function(modId) { var map = {"./EventTarget":1663342576247}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576270, function(require, module, exports) {
/* eslint-disable class-methods-use-this */
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class ClassCollection {
  constructor(element){
  //  this.element = element
    this.classes = []
  }
  add(className) {
   // this.element.wx_key = className
  }

  remove() {

  }

  toggle() {

  }
};exports.default = ClassCollection

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576271, function(require, module, exports) {
var __TEMP__ = require('./Response');var Response = __REQUIRE_DEFAULT__(__TEMP__);

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function fetch(request) {
  return new Promise((resolve) => {
    resolve(new Response(null, {status: 200}, request))
  })
};exports.default = fetch

}, function(modId) { var map = {"./Response":1663342576272}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576272, function(require, module, exports) {
/* eslint-disable handle-callback-err */
/* eslint-disable no-console */
var __TEMP__ = require('./core/Base64');var Base64 = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./core/Page');var Page = __REQUIRE_DEFAULT__(__TEMP__);
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Response {
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
		const onekit_debug = Page.getApp().onekit_debug
    if(onekit_debug){
      console[onekit_debug]('[fetch]', this.request.url, responseType, dataType)
    }
    if (this.request.url.endsWith('.js')) {
      return new Promise((resolve) => {
        resolve(this.request.url)
      })
    }
    if (this.request.url.startsWith('data:')) {
      return new Promise((resolve) => {
        console.error("[fetch] base64 ??????????????????")
        const BASE64 = 'base64,'
        const url = this.request.url.substring(this.request.url.indexOf(BASE64) + BASE64.length)
        resolve(Base64.base64ToArrayBuffer(url))
      })
    }
    // /////////////////////////
    return new Promise((resolve,reject) => {
      wx.request({
        url: this.request.url,
        headers: ((this.request.options || {}).headers || {}).data || {},
        responseType,
        dataType,
        success(res) {
          resolve(res.data)
        },
        fail: (e) => {
          console.error('[fetch.fail]', this.request.url,e)
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
};exports.default = Response

}, function(modId) { var map = {"./core/Base64":1663342576250,"./core/Page":1663342576252}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576273, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Headers {
  constructor(data) {
    this.data = data
  }
};exports.default = Headers

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576274, function(require, module, exports) {
class Navigator {
  constructor() {
    const systemInfo = wx.getSystemInfoSync()
    this.userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36";
    this.platform = systemInfo.platform;
    this.mediaDevices = {
      getUserMedia() {
        return new Promise((resolve) => {
          resolve();
        });
      },
    };
  }
}

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = new Navigator();

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576275, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Request {
  constructor(url, options = {}) {
    this.url = url
    this.options = options
  }
};exports.default = Request

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576276, function(require, module, exports) {
module.exports = {
  compile: WXWebAssembly.compile,

  compileStreaming: WXWebAssembly.compileStreaming,

  instantiate: WXWebAssembly.instantiate,

  instantiateStreaming: WXWebAssembly.compileStreaming,

  validate: WXWebAssembly.validate || function() { return true },

  Module: WXWebAssembly.Module,

  Global: WXWebAssembly.Global,

  Instance: WXWebAssembly.Instance,

  Memory: WXWebAssembly.Memory,

  Table: WXWebAssembly.Table,

  Tag: WXWebAssembly.Tag,

  CompileError: Error,

  LinkError: Error,

  RuntimeError: Error,

  Exception: Error
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576277, function(require, module, exports) {
/* eslint-disable camelcase */
var __TEMP__ = require('./EventTarget');var EventTarget = __REQUIRE_DEFAULT__(__TEMP__);

function run(cb, wx_object) {
  return new Promise((resolve, reject) => {
    wx_object.success = resolve;
    wx_object.fail = reject;
    cb(wx.request(wx_object));
  });
}
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class XMLHttpRequest extends EventTarget {
  constructor() {
    super();
    this._responseType = "text";
  }

  open(method, url, async = true, user, password) {
    this._method = method;
    this._url = url;
    this._async = async;
    this._user = user;
    this._password = password;
  }

  async send(body) {
    const callback = (res) => {
      this._response = res.data;
      if (this._responseType === "text") {
        this._responseText = this._response;
      }
      if (this.onload) {
        this.onload.apply(this);
      }
      if (this._all_event_handlers.load) {
        this._all_event_handlers.load.forEach((handler) => {
          handler.apply(this);
        });
      }
    };
    const wx_object = {
      url: this._url,
      dataType: "text",
      responseType: this._responseType,
      method: this._method,
      data: body,
    };
    if (this._async) {
      wx_object.success = (res) => {
        callback.call(this, res);
      };
      wx_object.fail = console.error
      this._task = wx.request(wx_object);
    } else {
      try {
        const res = await run((task) => {
          this._task = task;
        }, wx_object);
        callback.call(this, res);
      } catch (ex) {
        console.error(ex);
      }
    }
  }

  set responseType(responseType) {
    this._responseType = responseType;
  }

  get responseType() {
    return this._responseType;
  }

  get status() {
    return this.response.status;
  }

  get response() {
    return this._response;
  }

  get responseText() {
    return this._responseText;
  }

  set onload(onload) {
    this._onload = onload;
  }

  get onload() {
    return this._onload;
  }

  set onerror(onerror) {
    this._onerror = onerror;
  }

  get onerror() {
    return this._onerror;
  }
};exports.default = XMLHttpRequest

}, function(modId) { var map = {"./EventTarget":1663342576247}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576278, function(require, module, exports) {
/* eslint-disable */
function DOMParser(options) {
  this.options = options || {locator: {}}
}

DOMParser.prototype.parseFromString = function(source, mimeType) {
  const options = this.options
  const sax = new XMLReader()
  const domBuilder = options.domBuilder || new DOMHandler()// contentHandler and LexicalHandler
  const errorHandler = options.errorHandler
  const locator = options.locator
  const defaultNSMap = options.xmlns || {}
  const isHTML = /\/x?html?$/.test(mimeType)// mimeType.toLowerCase().indexOf('html') > -1;
  	const entityMap = isHTML ? htmlEntity.entityMap : {
    lt: '<', gt: '>', amp: '&', quot: '"', apos: "'"
  }
  if (locator) {
    domBuilder.setDocumentLocator(locator)
  }

  sax.errorHandler = buildErrorHandler(errorHandler, domBuilder, locator)
  sax.domBuilder = options.domBuilder || domBuilder
  if (isHTML) {
    defaultNSMap[''] = 'http://www.w3.org/1999/xhtml'
  }
  defaultNSMap.xml = defaultNSMap.xml || 'http://www.w3.org/XML/1998/namespace'
  if (source) {
    sax.parse(source, defaultNSMap, entityMap)
  } else {
    sax.errorHandler.error('invalid doc source')
  }
  return domBuilder.doc
}
function buildErrorHandler(errorImpl, domBuilder, locator) {
  if (!errorImpl) {
    if (domBuilder instanceof DOMHandler) {
      return domBuilder
    }
    errorImpl = domBuilder
  }
  const errorHandler = {}
  const isCallback = errorImpl instanceof Function
  locator = locator || {}
  function build(key) {
    let fn = errorImpl[key]
    if (!fn && isCallback) {
      fn = errorImpl.length == 2 ? function(msg) { errorImpl(key, msg) } : errorImpl
    }
    errorHandler[key] = fn && function(msg) {
      fn('[xmldom ' + key + ']\t' + msg + _locator(locator))
    } || function() {}
  }
  build('warning')
  build('error')
  build('fatalError')
  return errorHandler
}

// console.log('#\n\n\n\n\n\n\n####')
/**
 * +ContentHandler+ErrorHandler
 * +LexicalHandler+EntityResolver2
 * -DeclHandler-DTDHandler
 *
 * DefaultHandler:EntityResolver, DTDHandler, ContentHandler, ErrorHandler
 * DefaultHandler2:DefaultHandler,LexicalHandler, DeclHandler, EntityResolver2
 * @link http://www.saxproject.org/apidoc/org/xml/sax/helpers/DefaultHandler.html
 */
function DOMHandler() {
  this.cdata = false
}
function position(locator, node) {
  node.lineNumber = locator.lineNumber
  node.columnNumber = locator.columnNumber
}
/**
 * @see org.xml.sax.ContentHandler#startDocument
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
 */
DOMHandler.prototype = {
  startDocument() {
    	this.doc = new DOMImplementation().createDocument(null, null, null)
    	if (this.locator) {
        	this.doc.documentURI = this.locator.systemId
    	}
  },
  startElement(namespaceURI, localName, qName, attrs) {
    const doc = this.doc
	    const el = doc.createElementNS(namespaceURI, qName || localName)
	    const len = attrs.length
	    appendElement(this, el)
	    this.currentElement = el

    this.locator && position(this.locator, el)
	    for (let i = 0; i < len; i++) {
	        var namespaceURI = attrs.getURI(i)
	        const value = attrs.getValue(i)
	        var qName = attrs.getQName(i)
      const attr = doc.createAttributeNS(namespaceURI, qName)
      this.locator && position(attrs.getLocator(i), attr)
      attr.value = attr.nodeValue = value
      el.setAttributeNode(attr)
	    }
  },
  endElement(namespaceURI, localName, qName) {
    const current = this.currentElement
    const tagName = current.tagName
    this.currentElement = current.parentNode
  },
  startPrefixMapping(prefix, uri) {
  },
  endPrefixMapping(prefix) {
  },
  processingInstruction(target, data) {
	    const ins = this.doc.createProcessingInstruction(target, data)
	    this.locator && position(this.locator, ins)
	    appendElement(this, ins)
  },
  ignorableWhitespace(ch, start, length) {
  },
  characters(chars, start, length) {
    chars = _toString.apply(this, arguments)
    // console.log(chars)
    if (chars) {
      if (this.cdata) {
        var charNode = this.doc.createCDATASection(chars)
      } else {
        var charNode = this.doc.createTextNode(chars)
      }
      if (this.currentElement) {
        this.currentElement.appendChild(charNode)
      } else if (/^\s*$/.test(chars)) {
        this.doc.appendChild(charNode)
        // process xml
      }
      this.locator && position(this.locator, charNode)
    }
  },
  skippedEntity(name) {
  },
  endDocument() {
    this.doc.normalize()
  },
  setDocumentLocator (locator) {
	    if (this.locator = locator) { // && !('lineNumber' in locator)){
	    	locator.lineNumber = 0
	    }
  },
  // LexicalHandler
  comment(chars, start, length) {
    chars = _toString.apply(this, arguments)
	    const comm = this.doc.createComment(chars)
	    this.locator && position(this.locator, comm)
	    appendElement(this, comm)
  },

  startCDATA() {
	    // used in characters() methods
	    this.cdata = true
  },
  endCDATA() {
	    this.cdata = false
  },

  startDTD(name, publicId, systemId) {
    const impl = this.doc.implementation
	    if (impl && impl.createDocumentType) {
	        const dt = impl.createDocumentType(name, publicId, systemId)
	        this.locator && position(this.locator, dt)
	        appendElement(this, dt)
	    }
  },
  /**
	 * @see org.xml.sax.ErrorHandler
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
	 */
  warning(error) {
    console.warn('[xmldom warning]\t' + error, _locator(this.locator))
  },
  error(error) {
    console.error('[xmldom error]\t' + error, _locator(this.locator))
  },
  fatalError(error) {
    console.error('[xmldom fatalError]\t' + error, _locator(this.locator))
	    throw error
  }
}
function _locator(l) {
  if (l) {
    return '\n@' + (l.systemId || '') + '#[line:' + l.lineNumber + ',col:' + l.columnNumber + ']'
  }
}
function _toString(chars, start, length) {
  if (typeof chars === 'string') {
    return chars.substr(start, length)
  } else { // java sax connect width xmldom on rhino(what about: "? && !(chars instanceof String)")
    if (chars.length >= start + length || start) {
      return new java.lang.String(chars, start, length) + ''
    }
    return chars
  }
}

/*
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/LexicalHandler.html
 * used method of org.xml.sax.ext.LexicalHandler:
 *  #comment(chars, start, length)
 *  #startCDATA()
 *  #endCDATA()
 *  #startDTD(name, publicId, systemId)
 *
 *
 * IGNORED method of org.xml.sax.ext.LexicalHandler:
 *  #endDTD()
 *  #startEntity(name)
 *  #endEntity(name)
 *
 *
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/DeclHandler.html
 * IGNORED method of org.xml.sax.ext.DeclHandler
 * 	#attributeDecl(eName, aName, type, mode, value)
 *  #elementDecl(name, model)
 *  #externalEntityDecl(name, publicId, systemId)
 *  #internalEntityDecl(name, value)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/EntityResolver2.html
 * IGNORED method of org.xml.sax.EntityResolver2
 *  #resolveEntity(String name,String publicId,String baseURI,String systemId)
 *  #resolveEntity(publicId, systemId)
 *  #getExternalSubset(name, baseURI)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/DTDHandler.html
 * IGNORED method of org.xml.sax.DTDHandler
 *  #notationDecl(name, publicId, systemId) {};
 *  #unparsedEntityDecl(name, publicId, systemId, notationName) {};
 */
'endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl'.replace(/\w+/g, function(key) {
  DOMHandler.prototype[key] = function() { return null }
})

/* Private static helpers treated below as private instance methods, so don't need to add these to the public API; we might use a Relator to also get rid of non-standard public properties */
function appendElement (hander, node) {
  if (!hander.currentElement) {
    hander.doc.appendChild(node)
  } else {
    hander.currentElement.appendChild(node)
  }
}// appendChild and setAttributeNS are preformance key

// if(typeof require == 'function'){
var htmlEntity = require('./entities')
var XMLReader = require('./sax').XMLReader
var DOMImplementation = exports.DOMImplementation = require('./dom').DOMImplementation
exports.XMLSerializer = require('./dom').XMLSerializer

exports.DOMParser = DOMParser
// }

}, function(modId) { var map = {"./entities":1663342576279,"./sax":1663342576280,"./dom":1663342576281}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576279, function(require, module, exports) {
exports.entityMap = {
  lt: '<',
  gt: '>',
  amp: '&',
  quot: '"',
  apos: "'",
  Agrave: 'À',
  Aacute: 'Á',
  Acirc: 'Â',
  Atilde: 'Ã',
  Auml: 'Ä',
  Aring: 'Å',
  AElig: 'Æ',
  Ccedil: 'Ç',
  Egrave: 'È',
  Eacute: 'É',
  Ecirc: 'Ê',
  Euml: 'Ë',
  Igrave: 'Ì',
  Iacute: 'Í',
  Icirc: 'Î',
  Iuml: 'Ï',
  ETH: 'Ð',
  Ntilde: 'Ñ',
  Ograve: 'Ò',
  Oacute: 'Ó',
  Ocirc: 'Ô',
  Otilde: 'Õ',
  Ouml: 'Ö',
  Oslash: 'Ø',
  Ugrave: 'Ù',
  Uacute: 'Ú',
  Ucirc: 'Û',
  Uuml: 'Ü',
  Yacute: 'Ý',
  THORN: 'Þ',
  szlig: 'ß',
  agrave: 'à',
  aacute: 'á',
  acirc: 'â',
  atilde: 'ã',
  auml: 'ä',
  aring: 'å',
  aelig: 'æ',
  ccedil: 'ç',
  egrave: 'è',
  eacute: 'é',
  ecirc: 'ê',
  euml: 'ë',
  igrave: 'ì',
  iacute: 'í',
  icirc: 'î',
  iuml: 'ï',
  eth: 'ð',
  ntilde: 'ñ',
  ograve: 'ò',
  oacute: 'ó',
  ocirc: 'ô',
  otilde: 'õ',
  ouml: 'ö',
  oslash: 'ø',
  ugrave: 'ù',
  uacute: 'ú',
  ucirc: 'û',
  uuml: 'ü',
  yacute: 'ý',
  thorn: 'þ',
  yuml: 'ÿ',
  nbsp: ' ',
  iexcl: '¡',
  cent: '¢',
  pound: '£',
  curren: '¤',
  yen: '¥',
  brvbar: '¦',
  sect: '§',
  uml: '¨',
  copy: '©',
  ordf: 'ª',
  laquo: '«',
  not: '¬',
  shy: '­­',
  reg: '®',
  macr: '¯',
  deg: '°',
  plusmn: '±',
  sup2: '²',
  sup3: '³',
  acute: '´',
  micro: 'µ',
  para: '¶',
  middot: '·',
  cedil: '¸',
  sup1: '¹',
  ordm: 'º',
  raquo: '»',
  frac14: '¼',
  frac12: '½',
  frac34: '¾',
  iquest: '¿',
  times: '×',
  divide: '÷',
  forall: '∀',
  part: '∂',
  exist: '∃',
  empty: '∅',
  nabla: '∇',
  isin: '∈',
  notin: '∉',
  ni: '∋',
  prod: '∏',
  sum: '∑',
  minus: '−',
  lowast: '∗',
  radic: '√',
  prop: '∝',
  infin: '∞',
  ang: '∠',
  and: '∧',
  or: '∨',
  cap: '∩',
  cup: '∪',
  int: '∫',
  there4: '∴',
  sim: '∼',
  cong: '≅',
  asymp: '≈',
  ne: '≠',
  equiv: '≡',
  le: '≤',
  ge: '≥',
  sub: '⊂',
  sup: '⊃',
  nsub: '⊄',
  sube: '⊆',
  supe: '⊇',
  oplus: '⊕',
  otimes: '⊗',
  perp: '⊥',
  sdot: '⋅',
  Alpha: 'Α',
  Beta: 'Β',
  Gamma: 'Γ',
  Delta: 'Δ',
  Epsilon: 'Ε',
  Zeta: 'Ζ',
  Eta: 'Η',
  Theta: 'Θ',
  Iota: 'Ι',
  Kappa: 'Κ',
  Lambda: 'Λ',
  Mu: 'Μ',
  Nu: 'Ν',
  Xi: 'Ξ',
  Omicron: 'Ο',
  Pi: 'Π',
  Rho: 'Ρ',
  Sigma: 'Σ',
  Tau: 'Τ',
  Upsilon: 'Υ',
  Phi: 'Φ',
  Chi: 'Χ',
  Psi: 'Ψ',
  Omega: 'Ω',
  alpha: 'α',
  beta: 'β',
  gamma: 'γ',
  delta: 'δ',
  epsilon: 'ε',
  zeta: 'ζ',
  eta: 'η',
  theta: 'θ',
  iota: 'ι',
  kappa: 'κ',
  lambda: 'λ',
  mu: 'μ',
  nu: 'ν',
  xi: 'ξ',
  omicron: 'ο',
  pi: 'π',
  rho: 'ρ',
  sigmaf: 'ς',
  sigma: 'σ',
  tau: 'τ',
  upsilon: 'υ',
  phi: 'φ',
  chi: 'χ',
  psi: 'ψ',
  omega: 'ω',
  thetasym: 'ϑ',
  upsih: 'ϒ',
  piv: 'ϖ',
  OElig: 'Œ',
  oelig: 'œ',
  Scaron: 'Š',
  scaron: 'š',
  Yuml: 'Ÿ',
  fnof: 'ƒ',
  circ: 'ˆ',
  tilde: '˜',
  ensp: ' ',
  emsp: ' ',
  thinsp: ' ',
  zwnj: '‌',
  zwj: '‍',
  lrm: '‎',
  rlm: '‏',
  ndash: '–',
  mdash: '—',
  lsquo: '‘',
  rsquo: '’',
  sbquo: '‚',
  ldquo: '“',
  rdquo: '”',
  bdquo: '„',
  dagger: '†',
  Dagger: '‡',
  bull: '•',
  hellip: '…',
  permil: '‰',
  prime: '′',
  Prime: '″',
  lsaquo: '‹',
  rsaquo: '›',
  oline: '‾',
  euro: '€',
  trade: '™',
  larr: '←',
  uarr: '↑',
  rarr: '→',
  darr: '↓',
  harr: '↔',
  crarr: '↵',
  lceil: '⌈',
  rceil: '⌉',
  lfloor: '⌊',
  rfloor: '⌋',
  loz: '◊',
  spades: '♠',
  clubs: '♣',
  hearts: '♥',
  diams: '♦'
}
// for(var  n in exports.entityMap){console.log(exports.entityMap[n].charCodeAt())}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576280, function(require, module, exports) {
/* eslint-disable */
// [4]   	NameStartChar	   ::=   	":" | [A-Z] | "_" | [a-z] | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x2FF] | [#x370-#x37D] | [#x37F-#x1FFF] | [#x200C-#x200D] | [#x2070-#x218F] | [#x2C00-#x2FEF] | [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
// [4a]   	NameChar	   ::=   	NameStartChar | "-" | "." | [0-9] | #xB7 | [#x0300-#x036F] | [#x203F-#x2040]
// [5]   	Name	   ::=   	NameStartChar (NameChar)*
const nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/// \u10000-\uEFFFF
const nameChar = new RegExp('[\\-\\.0-9' + nameStartChar.source.slice(1, -1) + '\\u00B7\\u0300-\\u036F\\u203F-\\u2040]')
const tagNamePattern = new RegExp('^' + nameStartChar.source + nameChar.source + '*(?:\:' + nameStartChar.source + nameChar.source + '*)?$')
// var tagNamePattern = /^[a-zA-Z_][\w\-\.]*(?:\:[a-zA-Z_][\w\-\.]*)?$/
// var handlers = 'resolveEntity,getExternalSubset,characters,endDocument,endElement,endPrefixMapping,ignorableWhitespace,processingInstruction,setDocumentLocator,skippedEntity,startDocument,startElement,startPrefixMapping,notationDecl,unparsedEntityDecl,error,fatalError,warning,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,comment,endCDATA,endDTD,endEntity,startCDATA,startDTD,startEntity'.split(',')

// S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
// S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
const S_TAG = 0// tag name offerring
const S_ATTR = 1// attr name offerring
const S_ATTR_SPACE = 2// attr name end and space offer
const S_EQ = 3//= space?
const S_ATTR_NOQUOT_VALUE = 4// attr value(no quot value only)
const S_ATTR_END = 5// attr value end and no space(quot end)
const S_TAG_SPACE = 6// (attr value end || tag end ) && (space offer)
const S_TAG_CLOSE = 7// closed el<el />

function XMLReader() {

}

XMLReader.prototype = {
  parse(source, defaultNSMap, entityMap) {
    const domBuilder = this.domBuilder
    domBuilder.startDocument()
    _copy(defaultNSMap, defaultNSMap = {})
    parse(source, defaultNSMap, entityMap,
      domBuilder, this.errorHandler)
    domBuilder.endDocument()
  }
}
function parse(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
  function fixedFromCharCode(code) {
    // String.prototype.fromCharCode does not supports
    // > 2 bytes unicode chars directly
    if (code > 0xffff) {
      code -= 0x10000
      const surrogate1 = 0xd800 + (code >> 10)
				 const surrogate2 = 0xdc00 + (code & 0x3ff)

      return String.fromCharCode(surrogate1, surrogate2)
    } else {
      return String.fromCharCode(code)
    }
  }
  function entityReplacer(a) {
    const k = a.slice(1, -1)
    if (k in entityMap) {
      return entityMap[k]
    } else if (k.charAt(0) === '#') {
      return fixedFromCharCode(parseInt(k.substr(1).replace('x', '0x')))
    } else {
      errorHandler.error('entity not found:' + a)
      return a
    }
  }
  function appendText(end) { // has some bugs
    if (end > start) {
      const xt = source.substring(start, end).replace(/&#?\w+;/g, entityReplacer)
      locator && position(start)
      domBuilder.characters(xt, 0, end - start)
      start = end
    }
  }
  function position(p, m) {
    while (p >= lineEnd && (m = linePattern.exec(source))) {
      lineStart = m.index
      lineEnd = lineStart + m[0].length
      locator.lineNumber++
      // console.log('line++:',locator,startPos,endPos)
    }
    locator.columnNumber = p - lineStart + 1
  }
  var lineStart = 0
  var lineEnd = 0
  var linePattern = /.*(?:\r\n?|\n)|.*$/g
  var locator = domBuilder.locator

  const parseStack = [{currentNSMap: defaultNSMapCopy}]
  const closeMap = {}
  var start = 0
  while (true) {
    try {
      var tagStart = source.indexOf('<', start)
      if (tagStart < 0) {
        if (!source.substr(start).match(/^\s*$/)) {
          const doc = domBuilder.doc
	    			const text = doc.createTextNode(source.substr(start))
	    			doc.appendChild(text)
	    			domBuilder.currentElement = text
        }
        return
      }
      if (tagStart > start) {
        appendText(tagStart)
      }
      switch (source.charAt(tagStart + 1)) {
        case '/':
          var end = source.indexOf('>', tagStart + 3)
          var tagName = source.substring(tagStart + 2, end)
          var config = parseStack.pop()
          if (end < 0) {
	        		tagName = source.substring(tagStart + 2).replace(/[\s<].*/, '')
	        		// console.error('#@@@@@@'+tagName)
	        		errorHandler.error('end tag name: ' + tagName + ' is not complete:' + config.tagName)
	        		end = tagStart + 1 + tagName.length
	        	} else if (tagName.match(/\s</)) {
	        		tagName = tagName.replace(/[\s<].*/, '')
	        		errorHandler.error('end tag name: ' + tagName + ' maybe not complete')
	        		end = tagStart + 1 + tagName.length
          }
          // console.error(parseStack.length,parseStack)
          // console.error(config);
          var localNSMap = config.localNSMap
          var endMatch = config.tagName == tagName
          var endIgnoreCaseMach = endMatch || config.tagName && config.tagName.toLowerCase() == tagName.toLowerCase()
		        if (endIgnoreCaseMach) {
		        	domBuilder.endElement(config.uri, config.localName, tagName)
            if (localNSMap) {
              for (const prefix in localNSMap) {
                domBuilder.endPrefixMapping(prefix)
              }
            }
            if (!endMatch) {
		            	errorHandler.fatalError('end tag name: ' + tagName + ' is not match the current start tagName:' + config.tagName)
            }
		        } else {
		        	parseStack.push(config)
		        }

          end++
          break
          // end elment
        case '?':// <?...?>
          locator && position(tagStart)
          end = parseInstruction(source, tagStart, domBuilder)
          break
        case '!':// <!doctype,<![CDATA,<!--
          locator && position(tagStart)
          end = parseDCC(source, tagStart, domBuilder, errorHandler)
          break
        default:
          locator && position(tagStart)
          var el = new ElementAttributes()
          var currentNSMap = parseStack[parseStack.length - 1].currentNSMap
          // elStartEnd
          var end = parseElementStartPart(source, tagStart, el, currentNSMap, entityReplacer, errorHandler)
          var len = el.length


          if (!el.closed && fixSelfClosed(source, end, el.tagName, closeMap)) {
            el.closed = true
            if (!entityMap.nbsp) {
              errorHandler.warning('unclosed xml attribute')
            }
          }
          if (locator && len) {
            const locator2 = copyLocator(locator, {})
            // try{//attribute position fixed
            for (let i = 0; i < len; i++) {
              const a = el[i]
              position(a.offset)
              a.locator = copyLocator(locator, {})
            }
            // }catch(e){console.error('@@@@@'+e)}
            domBuilder.locator = locator2
            if (appendElement(el, domBuilder, currentNSMap)) {
              parseStack.push(el)
            }
            domBuilder.locator = locator
          } else if (appendElement(el, domBuilder, currentNSMap)) {
            parseStack.push(el)
          }


          if (el.uri === 'http://www.w3.org/1999/xhtml' && !el.closed) {
            end = parseHtmlSpecialContent(source, end, el.tagName, entityReplacer, domBuilder)
          } else {
            end++
          }
      }
    } catch (e) {
      errorHandler.error('element parse error: ' + e)
      // errorHandler.error('element parse error: '+e);
      end = -1
      // throw e;
    }
    if (end > start) {
      start = end
    } else {
      // TODO: 这里有可能sax回退，有位置错误风险
      appendText(Math.max(tagStart, start) + 1)
    }
  }
}
function copyLocator(f, t) {
  t.lineNumber = f.lineNumber
  t.columnNumber = f.columnNumber
  return t
}

/**
 * @see #appendElement(source,elStartEnd,el,selfClosed,entityReplacer,domBuilder,parseStack);
 * @return end of the elementStartPart(end of elementEndPart for selfClosed el)
 */
function parseElementStartPart(source, start, el, currentNSMap, entityReplacer, errorHandler) {
  let attrName
  var value
  let p = ++start
  let s = S_TAG// status
  while (true) {
    let c = source.charAt(p)
    switch (c) {
      case '=':
        if (s === S_ATTR) { // attrName
          attrName = source.slice(start, p)
          s = S_EQ
        } else if (s === S_ATTR_SPACE) {
          s = S_EQ
        } else {
          // fatalError: equal must after attrName or space after attrName
          throw new Error('attribute equal must after attrName')
        }
        break
      case '\'':
      case '"':
        if (s === S_EQ || s === S_ATTR // || s == S_ATTR_SPACE
        ) { // equal
          if (s === S_ATTR) {
            errorHandler.warning('attribute value must after "="')
            attrName = source.slice(start, p)
          }
          start = p + 1
          p = source.indexOf(c, start)
          if (p > 0) {
            value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer)
            el.add(attrName, value, start - 1)
            s = S_ATTR_END
          } else {
            // fatalError: no end quot match
            throw new Error('attribute value no end \'' + c + '\' match')
          }
        } else if (s == S_ATTR_NOQUOT_VALUE) {
          value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer)
          // console.log(attrName,value,start,p)
          el.add(attrName, value, start)
          // console.dir(el)
          errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c + ')!!')
          start = p + 1
          s = S_ATTR_END
        } else {
          // fatalError: no equal before
          throw new Error('attribute value must after "="')
        }
        break
      case '/':
        switch (s) {
          case S_TAG:
            el.setTagName(source.slice(start, p))
          case S_ATTR_END:
          case S_TAG_SPACE:
          case S_TAG_CLOSE:
            s = S_TAG_CLOSE
            el.closed = true
          case S_ATTR_NOQUOT_VALUE:
          case S_ATTR:
          case S_ATTR_SPACE:
            break
            // case S_EQ:
          default:
            throw new Error("attribute invalid close char('/')")
        }
        break
      case '':// end document
        // throw new Error('unexpected end of input')
        errorHandler.error('unexpected end of input')
        if (s == S_TAG) {
          el.setTagName(source.slice(start, p))
        }
        return p
      case '>':
        switch (s) {
          case S_TAG:
            el.setTagName(source.slice(start, p))
          case S_ATTR_END:
          case S_TAG_SPACE:
          case S_TAG_CLOSE:
            break// normal
          case S_ATTR_NOQUOT_VALUE:// Compatible state
          case S_ATTR:
            value = source.slice(start, p)
            if (value.slice(-1) === '/') {
              el.closed = true
              value = value.slice(0, -1)
            }
          case S_ATTR_SPACE:
            if (s === S_ATTR_SPACE) {
              value = attrName
            }
            if (s == S_ATTR_NOQUOT_VALUE) {
              errorHandler.warning('attribute "' + value + '" missed quot(")!!')
              el.add(attrName, value.replace(/&#?\w+;/g, entityReplacer), start)
            } else {
              if (currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' || !value.match(/^(?:disabled|checked|selected)$/i)) {
                errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!')
              }
              el.add(value, value, start)
            }
            break
          case S_EQ:
            throw new Error('attribute value missed!!')
        }
        //			console.log(tagName,tagNamePattern,tagNamePattern.test(tagName))
        return p
        /* xml space '\x20' | #x9 | #xD | #xA; */
      case '\u0080':
        c = ' '
      default:
        if (c <= ' ') { // space
          switch (s) {
            case S_TAG:
              el.setTagName(source.slice(start, p))// tagName
              s = S_TAG_SPACE
              break
            case S_ATTR:
              attrName = source.slice(start, p)
              s = S_ATTR_SPACE
              break
            case S_ATTR_NOQUOT_VALUE:
              var value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer)
              errorHandler.warning('attribute "' + value + '" missed quot(")!!')
              el.add(attrName, value, start)
            case S_ATTR_END:
              s = S_TAG_SPACE
              break
				// case S_TAG_SPACE:
				// case S_EQ:
				// case S_ATTR_SPACE:
				//	void();break;
				// case S_TAG_CLOSE:
					// ignore warning
          }
        } else { // not space
          // S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
          // S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
          switch (s) {
            // case S_TAG:void();break;
            // case S_ATTR:void();break;
            // case S_ATTR_NOQUOT_VALUE:void();break;
            case S_ATTR_SPACE:
              var tagName = el.tagName
              if (currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' || !attrName.match(/^(?:disabled|checked|selected)$/i)) {
                errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead2!!')
              }
              el.add(attrName, attrName, start)
              start = p
              s = S_ATTR
              break
            case S_ATTR_END:
              errorHandler.warning('attribute space is required"' + attrName + '"!!')
            case S_TAG_SPACE:
              s = S_ATTR
              start = p
              break
            case S_EQ:
              s = S_ATTR_NOQUOT_VALUE
              start = p
              break
            case S_TAG_CLOSE:
              throw new Error("elements closed character '/' and '>' must be connected to")
          }
        }
    }// end outer switch
    // console.log('p++',p)
    p++
  }
}
/**
 * @return true if has new namespace define
 */
function appendElement(el, domBuilder, currentNSMap) {
  const tagName = el.tagName
  let localNSMap = null
  // var currentNSMap = parseStack[parseStack.length-1].currentNSMap;
  var i = el.length
  while (i--) {
    var a = el[i]
    const qName = a.qName
    const value = a.value
    var nsp = qName.indexOf(':')
    if (nsp > 0) {
      var prefix = a.prefix = qName.slice(0, nsp)
      var localName = qName.slice(nsp + 1)
      var nsPrefix = prefix === 'xmlns' && localName
    } else {
      localName = qName
      prefix = null
      nsPrefix = qName === 'xmlns' && ''
    }
    // can not set prefix,because prefix !== ''
    a.localName = localName
    // prefix == null for no ns prefix attribute
    if (nsPrefix !== false) { // hack!!
      if (localNSMap == null) {
        localNSMap = {}
        // console.log(currentNSMap,0)
        _copy(currentNSMap, currentNSMap = {})
        // console.log(currentNSMap,1)
      }
      currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value
      a.uri = 'http://www.w3.org/2000/xmlns/'
      domBuilder.startPrefixMapping(nsPrefix, value)
    }
  }
  var i = el.length
  while (i--) {
    a = el[i]
    var prefix = a.prefix
    if (prefix) { // no prefix attribute has no namespace
      if (prefix === 'xml') {
        a.uri = 'http://www.w3.org/XML/1998/namespace'
      } if (prefix !== 'xmlns') {
        a.uri = currentNSMap[prefix || '']

        // {console.log('###'+a.qName,domBuilder.locator.systemId+'',currentNSMap,a.uri)}
      }
    }
  }
  var nsp = tagName.indexOf(':')
  if (nsp > 0) {
    prefix = el.prefix = tagName.slice(0, nsp)
    localName = el.localName = tagName.slice(nsp + 1)
  } else {
    prefix = null// important!!
    localName = el.localName = tagName
  }
  // no prefix element has default namespace
  const ns = el.uri = currentNSMap[prefix || '']
  domBuilder.startElement(ns, localName, tagName, el)
  // endPrefixMapping and startPrefixMapping have not any help for dom builder
  // localNSMap = null
  if (el.closed) {
    domBuilder.endElement(ns, localName, tagName)
    if (localNSMap) {
      for (prefix in localNSMap) {
        domBuilder.endPrefixMapping(prefix)
      }
    }
  } else {
    el.currentNSMap = currentNSMap
    el.localNSMap = localNSMap
    // parseStack.push(el);
    return true
  }
}
function parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
  if (/^(?:script|textarea)$/i.test(tagName)) {
    const elEndStart = source.indexOf('</' + tagName + '>', elStartEnd)
    let text = source.substring(elStartEnd + 1, elEndStart)
    if (/[&<]/.test(text)) {
      if (/^script$/i.test(tagName)) {
        // if(!/\]\]>/.test(text)){
        // lexHandler.startCDATA();
        domBuilder.characters(text, 0, text.length)
        // lexHandler.endCDATA();
        return elEndStart
        // }
      }// }else{//text area
      text = text.replace(/&#?\w+;/g, entityReplacer)
      domBuilder.characters(text, 0, text.length)
      return elEndStart
      // }
    }
  }
  return elStartEnd + 1
}
function fixSelfClosed(source, elStartEnd, tagName, closeMap) {
  // if(tagName in closeMap){
  let pos = closeMap[tagName]
  if (pos == null) {
    // console.log(tagName)
    pos = source.lastIndexOf('</' + tagName + '>')
    if (pos < elStartEnd) { // 忘记闭合
      pos = source.lastIndexOf('</' + tagName)
    }
    closeMap[tagName] = pos
  }
  return pos < elStartEnd
  // }
}
function _copy(source, target) {
  for (const n in source) { target[n] = source[n] }
}
function parseDCC(source, start, domBuilder, errorHandler) { // sure start with '<!'
  const next = source.charAt(start + 2)
  switch (next) {
    case '-':
      if (source.charAt(start + 3) === '-') {
        var end = source.indexOf('-->', start + 4)
        // append comment source.substring(4,end)//<!--
        if (end > start) {
          domBuilder.comment(source, start + 4, end - start - 4)
          return end + 3
        } else {
          errorHandler.error('Unclosed comment')
          return -1
        }
      } else {
        // error
        return -1
      }
    default:
      if (source.substr(start + 3, 6) == 'CDATA[') {
        var end = source.indexOf(']]>', start + 9)
        domBuilder.startCDATA()
        domBuilder.characters(source, start + 9, end - start - 9)
        domBuilder.endCDATA()
        return end + 3
      }
      // <!DOCTYPE
      // startDTD(java.lang.String name, java.lang.String publicId, java.lang.String systemId)
      var matchs = split(source, start)
      var len = matchs.length
      if (len > 1 && /!doctype/i.test(matchs[0][0])) {
        const name = matchs[1][0]
        const pubid = len > 3 && /^public$/i.test(matchs[2][0]) && matchs[3][0]
        const sysid = len > 4 && matchs[4][0]
        const lastMatch = matchs[len - 1]
        domBuilder.startDTD(name, pubid && pubid.replace(/^(['"])(.*?)\1$/, '$2'),
          sysid && sysid.replace(/^(['"])(.*?)\1$/, '$2'))
        domBuilder.endDTD()

        return lastMatch.index + lastMatch[0].length
      }
  }
  return -1
}


function parseInstruction(source, start, domBuilder) {
  const end = source.indexOf('?>', start)
  if (end) {
    const match = source.substring(start, end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/)
    if (match) {
      const len = match[0].length
      domBuilder.processingInstruction(match[1], match[2])
      return end + 2
    } else { // error
      return -1
    }
  }
  return -1
}

/**
 * @param source
 */
function ElementAttributes(source) {

}
ElementAttributes.prototype = {
  setTagName(tagName) {
    if (!tagNamePattern.test(tagName)) {
      throw new Error('invalid tagName:' + tagName)
    }
    this.tagName = tagName
  },
  add(qName, value, offset) {
    if (!tagNamePattern.test(qName)) {
      throw new Error('invalid attribute:' + qName)
    }
    this[this.length++] = {qName, value, offset}
  },
  length: 0,
  getLocalName(i) { return this[i].localName },
  getLocator(i) { return this[i].locator },
  getQName(i) { return this[i].qName },
  getURI(i) { return this[i].uri },
  getValue(i) { return this[i].value }
//	,getIndex:function(uri, localName)){
//		if(localName){
//
//		}else{
//			var qName = uri
//		}
//	},
//	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
//	getType:function(uri,localName){}
//	getType:function(i){},
}


function split(source, start) {
  let match
  const buf = []
  const reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g
  reg.lastIndex = start
  reg.exec(source)// skip <
  while (match = reg.exec(source)) {
    buf.push(match)
    if (match[1]) return buf
  }
}

exports.XMLReader = XMLReader

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576281, function(require, module, exports) {
/* eslint-disable */
/*
 * DOM Level 2
 * Object DOMException
 * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
 */
var __TEMP__ = require('../../CSSStyleDeclaration');var CSSStyleDeclaration = __REQUIRE_DEFAULT__(__TEMP__);
function copy(src, dest) {
  for (const p in src) {
    dest[p] = src[p]
  }
}
/**
^\w+\.prototype\.([_\w]+)\s*=\s*((?:.*\{\s*?[\r\n][\s\S]*?^})|\S.*?(?=[;\r\n]));?
^\w+\.prototype\.([_\w]+)\s*=\s*(\S.*?(?=[;\r\n]));?
 */
function _extends(Class, Super) {
  let pt = Class.prototype
  if (!(pt instanceof Super)) {
    function t() { }
    t.prototype = Super.prototype
    t = new t()
    copy(pt, t)
    Class.prototype = pt = t
  }
  if (pt.constructor != Class) {
    if (typeof Class !== 'function') {
      console.error('unknow Class:' + Class)
    }
    pt.constructor = Class
  }
}
const htmlns = 'http://www.w3.org/1999/xhtml'
// Node Types
const NodeType = {}
const ELEMENT_NODE = NodeType.ELEMENT_NODE = 1
const ATTRIBUTE_NODE = NodeType.ATTRIBUTE_NODE = 2
const TEXT_NODE = NodeType.TEXT_NODE = 3
const CDATA_SECTION_NODE = NodeType.CDATA_SECTION_NODE = 4
const ENTITY_REFERENCE_NODE = NodeType.ENTITY_REFERENCE_NODE = 5
const ENTITY_NODE = NodeType.ENTITY_NODE = 6
const PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7
const COMMENT_NODE = NodeType.COMMENT_NODE = 8
const DOCUMENT_NODE = NodeType.DOCUMENT_NODE = 9
const DOCUMENT_TYPE_NODE = NodeType.DOCUMENT_TYPE_NODE = 10
const DOCUMENT_FRAGMENT_NODE = NodeType.DOCUMENT_FRAGMENT_NODE = 11
const NOTATION_NODE = NodeType.NOTATION_NODE = 12

// ExceptionCode
const ExceptionCode = {}
const ExceptionMessage = {}
const INDEX_SIZE_ERR = ExceptionCode.INDEX_SIZE_ERR = ((ExceptionMessage[1] = 'Index size error'), 1)
const DOMSTRING_SIZE_ERR = ExceptionCode.DOMSTRING_SIZE_ERR = ((ExceptionMessage[2] = 'DOMString size error'), 2)
const HIERARCHY_REQUEST_ERR = ExceptionCode.HIERARCHY_REQUEST_ERR = ((ExceptionMessage[3] = 'Hierarchy request error'), 3)
const WRONG_DOCUMENT_ERR = ExceptionCode.WRONG_DOCUMENT_ERR = ((ExceptionMessage[4] = 'Wrong document'), 4)
const INVALID_CHARACTER_ERR = ExceptionCode.INVALID_CHARACTER_ERR = ((ExceptionMessage[5] = 'Invalid character'), 5)
const NO_DATA_ALLOWED_ERR = ExceptionCode.NO_DATA_ALLOWED_ERR = ((ExceptionMessage[6] = 'No data allowed'), 6)
const NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = ((ExceptionMessage[7] = 'No modification allowed'), 7)
const NOT_FOUND_ERR = ExceptionCode.NOT_FOUND_ERR = ((ExceptionMessage[8] = 'Not found'), 8)
const NOT_SUPPORTED_ERR = ExceptionCode.NOT_SUPPORTED_ERR = ((ExceptionMessage[9] = 'Not supported'), 9)
const INUSE_ATTRIBUTE_ERR = ExceptionCode.INUSE_ATTRIBUTE_ERR = ((ExceptionMessage[10] = 'Attribute in use'), 10)
// level2
const INVALID_STATE_ERR = ExceptionCode.INVALID_STATE_ERR = ((ExceptionMessage[11] = 'Invalid state'), 11)
const SYNTAX_ERR = ExceptionCode.SYNTAX_ERR = ((ExceptionMessage[12] = 'Syntax error'), 12)
const INVALID_MODIFICATION_ERR = ExceptionCode.INVALID_MODIFICATION_ERR = ((ExceptionMessage[13] = 'Invalid modification'), 13)
const NAMESPACE_ERR = ExceptionCode.NAMESPACE_ERR = ((ExceptionMessage[14] = 'Invalid namespace'), 14)
const INVALID_ACCESS_ERR = ExceptionCode.INVALID_ACCESS_ERR = ((ExceptionMessage[15] = 'Invalid access'), 15)


function DOMException(code, message) {
  if (message instanceof Error) {
    var error = message
  } else {
    error = this
    Error.call(this, ExceptionMessage[code])
    this.message = ExceptionMessage[code]
    if (Error.captureStackTrace) Error.captureStackTrace(this, DOMException)
  }
  error.code = code
  if (message) this.message = this.message + ': ' + message
  return error
}
DOMException.prototype = Error.prototype
copy(ExceptionCode, DOMException)
/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-536297177
 * The NodeList interface provides the abstraction of an ordered collection of nodes, without defining or constraining how this collection is implemented. NodeList objects in the DOM are live.
 * The items in the NodeList are accessible via an integral index, starting from 0.
 */
function NodeList() {
}
NodeList.prototype = {
  /**
   * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
   * @standard level1
   */
  length: 0,
  /**
   * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
   * @standard level1
   * @param index  unsigned long
   *   Index into the collection.
   * @return Node
   * 	The node at the indexth position in the NodeList, or null if that is not a valid index.
   */
  item(index) {
    return this[index] || null
  },
  toString(isHTML, nodeFilter) {
    for (var buf = [], i = 0; i < this.length; i++) {
      serializeToString(this[i], buf, isHTML, nodeFilter)
    }
    return buf.join('')
  }
}
function LiveNodeList(node, refresh) {
  this._node = node
  this._refresh = refresh
  _updateLiveList(this)
}
function _updateLiveList(list) {
  const inc = list._node._inc || list._node.ownerDocument._inc
  if (list._inc != inc) {
    const ls = list._refresh(list._node)
    // console.log(ls.length)
    __set__(list, 'length', ls.length)
    copy(ls, list)
    list._inc = inc
  }
}
LiveNodeList.prototype.item = function (i) {
  _updateLiveList(this)
  return this[i]
}

_extends(LiveNodeList, NodeList)

function NamedNodeMap() {
}

function _findNodeIndex(list, node) {
  let i = list.length
  while (i--) {
    if (list[i] === node) { return i }
  }
}

function _addNamedNode(el, list, newAttr, oldAttr) {
  if (oldAttr) {
    list[_findNodeIndex(list, oldAttr)] = newAttr
  } else {
    list[list.length++] = newAttr
  }
  if (el) {
    newAttr.ownerElement = el
    const doc = el.ownerDocument
    if (doc) {
      oldAttr && _onRemoveAttribute(doc, el, oldAttr)
      _onAddAttribute(doc, el, newAttr)
    }
  }
}
function _removeNamedNode(el, list, attr) {
  // console.log('remove attr:'+attr)
  let i = _findNodeIndex(list, attr)
  if (i >= 0) {
    const lastIndex = list.length - 1
    while (i < lastIndex) {
      list[i] = list[++i]
    }
    list.length = lastIndex
    if (el) {
      const doc = el.ownerDocument
      if (doc) {
        _onRemoveAttribute(doc, el, attr)
        attr.ownerElement = null
      }
    }
  } else {
    throw DOMException(NOT_FOUND_ERR, new Error(el.tagName + '@' + attr))
  }
}
NamedNodeMap.prototype = {
  length: 0,
  item: NodeList.prototype.item,
  getNamedItem(key) {
    //		if(key.indexOf(':')>0 || key == 'xmlns'){
    //			return null;
    //		}
    // console.log()
    let i = this.length
    while (i--) {
      const attr = this[i]
      // console.log(attr.nodeName,key)
      if (attr.nodeName == key) {
        return attr
      }
    }
  },
  setNamedItem(attr) {
    const el = attr.ownerElement
    if (el && el != this._ownerElement) {
      throw new DOMException(INUSE_ATTRIBUTE_ERR)
    }
    const oldAttr = this.getNamedItem(attr.nodeName)
    _addNamedNode(this._ownerElement, this, attr, oldAttr)
    return oldAttr
  },
  /* returns Node */
  setNamedItemNS(attr) { // raises: WRONG_DOCUMENT_ERR,NO_MODIFICATION_ALLOWED_ERR,INUSE_ATTRIBUTE_ERR
    const el = attr.ownerElement; let
      oldAttr
    if (el && el != this._ownerElement) {
      throw new DOMException(INUSE_ATTRIBUTE_ERR)
    }
    oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName)
    _addNamedNode(this._ownerElement, this, attr, oldAttr)
    return oldAttr
  },

  /* returns Node */
  removeNamedItem(key) {
    const attr = this.getNamedItem(key)
    _removeNamedNode(this._ownerElement, this, attr)
    return attr
  }, // raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR

  // for level2
  removeNamedItemNS(namespaceURI, localName) {
    const attr = this.getNamedItemNS(namespaceURI, localName)
    _removeNamedNode(this._ownerElement, this, attr)
    return attr
  },
  getNamedItemNS(namespaceURI, localName) {
    let i = this.length
    while (i--) {
      const node = this[i]
      if (node.localName == localName && node.namespaceURI == namespaceURI) {
        return node
      }
    }
    return null
  }
}
/**
 * @see http://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490
 */
function DOMImplementation(/* Object */ features) {
  this._features = {}
  if (features) {
    for (const feature in features) {
      this._features = features[feature]
    }
  }
}

DOMImplementation.prototype = {
  hasFeature(/* string */ feature, /* string */ version) {
    const versions = this._features[feature.toLowerCase()]
    if (versions && (!version || version in versions)) {
      return true
    } else {
      return false
    }
  },
  // Introduced in DOM Level 2:
  createDocument(namespaceURI, qualifiedName, doctype) { // raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR,WRONG_DOCUMENT_ERR
    const doc = new Document()
    doc.implementation = this
    doc.childNodes = new NodeList()
    doc.doctype = doctype
    if (doctype) {
      doc.appendChild(doctype)
    }
    if (qualifiedName) {
      const root = doc.createElementNS(namespaceURI, qualifiedName)
      doc.appendChild(root)
    }
    return doc
  },
  // Introduced in DOM Level 2:
  createDocumentType(qualifiedName, publicId, systemId) { // raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR
    const node = new DocumentType()
    node.name = qualifiedName
    node.nodeName = qualifiedName
    node.publicId = publicId
    node.systemId = systemId
    // Introduced in DOM Level 2:
    // readonly attribute DOMString        internalSubset;

    // TODO:..
    //  readonly attribute NamedNodeMap     entities;
    //  readonly attribute NamedNodeMap     notations;
    return node
  }
}


/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247
 */

function Node() {
}

Node.prototype = {
  firstChild: null,
  lastChild: null,
  previousSibling: null,
  nextSibling: null,
  attributes: null,
  parentNode: null,
  childNodes: null,
  ownerDocument: null,
  nodeValue: null,
  namespaceURI: null,
  prefix: null,
  localName: null,
  // Modified in DOM Level 2:
  insertBefore(newChild, refChild) { // raises
    return _insertBefore(this, newChild, refChild)
  },
  replaceChild(newChild, oldChild) { // raises
    this.insertBefore(newChild, oldChild)
    if (oldChild) {
      this.removeChild(oldChild)
    }
  },
  removeChild(oldChild) {
    return _removeChild(this, oldChild)
  },
  appendChild(newChild) {
    return this.insertBefore(newChild, null)
  },
  hasChildNodes() {
    return this.firstChild != null
  },
  cloneNode(deep) {
    return cloneNode(this.ownerDocument || this, this, deep)
  },
  // Modified in DOM Level 2:
  normalize() {
    let child = this.firstChild
    while (child) {
      const next = child.nextSibling
      if (next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE) {
        this.removeChild(next)
        child.appendData(next.data)
      } else {
        child.normalize()
        child = next
      }
    }
  },
  // Introduced in DOM Level 2:
  isSupported(feature, version) {
    return this.ownerDocument.implementation.hasFeature(feature, version)
  },
  // Introduced in DOM Level 2:
  hasAttributes() {
    return this.attributes.length > 0
  },
  lookupPrefix(namespaceURI) {
    let el = this
    while (el) {
      const map = el._nsMap
      // console.dir(map)
      if (map) {
        for (const n in map) {
          if (map[n] == namespaceURI) {
            return n
          }
        }
      }
      el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode
    }
    return null
  },
  // Introduced in DOM Level 3:
  lookupNamespaceURI(prefix) {
    let el = this
    while (el) {
      const map = el._nsMap
      // console.dir(map)
      if (map) {
        if (prefix in map) {
          return map[prefix]
        }
      }
      el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode
    }
    return null
  },
  // Introduced in DOM Level 3:
  isDefaultNamespace(namespaceURI) {
    const prefix = this.lookupPrefix(namespaceURI)
    return prefix == null
  }
}


function _xmlEncoder(c) {
  return c == '<' && '&lt;' ||
    c == '>' && '&gt;' ||
    c == '&' && '&amp;' ||
    c == '"' && '&quot;' ||
    '&#' + c.charCodeAt() + ';'
}


copy(NodeType, Node)
copy(NodeType, Node.prototype)

/**
 * @param callback return true for continue,false for break
 * @return boolean true: break visit;
 */
function _visitNode(node, callback) {
  if (callback(node)) {
    return true
  }
  if (node = node.firstChild) {
    do {
      if (_visitNode(node, callback)) { return true }
    } while (node = node.nextSibling)
  }
}


function Document() {
}
function _onAddAttribute(doc, el, newAttr) {
  doc && doc._inc++
  const ns = newAttr.namespaceURI
  if (ns == 'http://www.w3.org/2000/xmlns/') {
    // update namespace
    el._nsMap[newAttr.prefix ? newAttr.localName : ''] = newAttr.value
  }
}
function _onRemoveAttribute(doc, el, newAttr, remove) {
  doc && doc._inc++
  const ns = newAttr.namespaceURI
  if (ns == 'http://www.w3.org/2000/xmlns/') {
    // update namespace
    delete el._nsMap[newAttr.prefix ? newAttr.localName : '']
  }
}
function _onUpdateChild(doc, el, newChild) {
  if (doc && doc._inc) {
    doc._inc++
    // update childNodes
    const cs = el.childNodes
    if (newChild) {
      cs[cs.length++] = newChild
    } else {
      // console.log(1)
      let child = el.firstChild
      let i = 0
      while (child) {
        cs[i++] = child
        child = child.nextSibling
      }
      cs.length = i
    }
  }
}

function _removeChild(parentNode, child) {
  const previous = child.previousSibling
  const next = child.nextSibling
  if (previous) {
    previous.nextSibling = next
  } else {
    parentNode.firstChild = next
  }
  if (next) {
    next.previousSibling = previous
  } else {
    parentNode.lastChild = previous
  }
  _onUpdateChild(parentNode.ownerDocument, parentNode)
  return child
}
/**
 * preformance key(refChild == null)
 */
function _insertBefore(parentNode, newChild, nextChild) {
  const cp = newChild.parentNode
  if (cp) {
    cp.removeChild(newChild)// remove and update
  }
  if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
    var newFirst = newChild.firstChild
    if (newFirst == null) {
      return newChild
    }
    var newLast = newChild.lastChild
  } else {
    newFirst = newLast = newChild
  }
  const pre = nextChild ? nextChild.previousSibling : parentNode.lastChild

  newFirst.previousSibling = pre
  newLast.nextSibling = nextChild


  if (pre) {
    pre.nextSibling = newFirst
  } else {
    parentNode.firstChild = newFirst
  }
  if (nextChild == null) {
    parentNode.lastChild = newLast
  } else {
    nextChild.previousSibling = newLast
  }
  do {
    newFirst.parentNode = parentNode
  } while (newFirst !== newLast && (newFirst = newFirst.nextSibling))
  _onUpdateChild(parentNode.ownerDocument || parentNode, parentNode)
  // console.log(parentNode.lastChild.nextSibling == null)
  if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
    newChild.firstChild = newChild.lastChild = null
  }
  return newChild
}
function _appendSingleChild(parentNode, newChild) {
  const cp = newChild.parentNode
  if (cp) {
    var pre = parentNode.lastChild
    cp.removeChild(newChild)// remove and update
    var pre = parentNode.lastChild
  }
  var pre = parentNode.lastChild
  newChild.parentNode = parentNode
  newChild.previousSibling = pre
  newChild.nextSibling = null
  if (pre) {
    pre.nextSibling = newChild
  } else {
    parentNode.firstChild = newChild
  }
  parentNode.lastChild = newChild
  _onUpdateChild(parentNode.ownerDocument, parentNode, newChild)
  return newChild
  // console.log("__aa",parentNode.lastChild.nextSibling == null)
}
Document.prototype = {
  // implementation : null,
  nodeName: '#document',
  nodeType: DOCUMENT_NODE,
  doctype: null,
  documentElement: null,
  _inc: 1,

  insertBefore(newChild, refChild) { // raises
    if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
      let child = newChild.firstChild
      while (child) {
        const next = child.nextSibling
        this.insertBefore(child, refChild)
        child = next
      }
      return newChild
    }
    if (this.documentElement == null && newChild.nodeType == ELEMENT_NODE) {
      this.documentElement = newChild
    }

    return _insertBefore(this, newChild, refChild), (newChild.ownerDocument = this), newChild
  },
  removeChild(oldChild) {
    if (this.documentElement == oldChild) {
      this.documentElement = null
    }
    return _removeChild(this, oldChild)
  },
  // Introduced in DOM Level 2:
  importNode(importedNode, deep) {
    return importNode(this, importedNode, deep)
  },
  // Introduced in DOM Level 2:
  getElementById(id) {
    let rtv = null
    _visitNode(this.documentElement, function (node) {
      if (node.nodeType == ELEMENT_NODE) {
        if (node.getAttribute('id') == id) {
          rtv = node
          return true
        }
      }
    })
    return rtv
  },

  // document factory method:
  createElement(tagName) {
    const node = new Element()
    node.ownerDocument = this
    node.nodeName = tagName
    node.tagName = tagName
    node.childNodes = new NodeList()
    const attrs = node.attributes = new NamedNodeMap()
    attrs._ownerElement = node
    return node
  },
  createDocumentFragment() {
    const node = new DocumentFragment()
    node.ownerDocument = this
    node.childNodes = new NodeList()
    return node
  },
  createTextNode(data) {
    const node = new Text()
    node.ownerDocument = this
    node.appendData(data)
    return node
  },
  createComment(data) {
    const node = new Comment()
    node.ownerDocument = this
    node.appendData(data)
    return node
  },
  createCDATASection(data) {
    const node = new CDATASection()
    node.ownerDocument = this
    node.appendData(data)
    return node
  },
  createProcessingInstruction(target, data) {
    const node = new ProcessingInstruction()
    node.ownerDocument = this
    node.tagName = node.target = target
    node.nodeValue = node.data = data
    return node
  },
  createAttribute(name) {
    const node = new Attr()
    node.ownerDocument = this
    node.name = name
    node.nodeName = name
    node.localName = name
    node.specified = true
    return node
  },
  createEntityReference(name) {
    const node = new EntityReference()
    node.ownerDocument = this
    node.nodeName = name
    return node
  },
  // Introduced in DOM Level 2:
  createElementNS(namespaceURI, qualifiedName) {
    const node = new Element()
    const pl = qualifiedName.split(':')
    const attrs = node.attributes = new NamedNodeMap()
    node.childNodes = new NodeList()
    node.ownerDocument = this
    node.nodeName = qualifiedName
    node.tagName = qualifiedName
    node.namespaceURI = namespaceURI
    if (pl.length == 2) {
      node.prefix = pl[0]
      node.localName = pl[1]
    } else {
      // el.prefix = null;
      node.localName = qualifiedName
    }
    attrs._ownerElement = node
    return node
  },
  // Introduced in DOM Level 2:
  createAttributeNS(namespaceURI, qualifiedName) {
    const node = new Attr()
    const pl = qualifiedName.split(':')
    node.ownerDocument = this
    node.nodeName = qualifiedName
    node.name = qualifiedName
    node.namespaceURI = namespaceURI
    node.specified = true
    if (pl.length == 2) {
      node.prefix = pl[0]
      node.localName = pl[1]
    } else {
      // el.prefix = null;
      node.localName = qualifiedName
    }
    return node
  }
}
_extends(Document, Node)


function Element() {
  this._nsMap = {}
}
Element.prototype = {
  nodeType: ELEMENT_NODE,
  hasAttribute(name) {
    return this.getAttributeNode(name) != null
  },
  getAttribute(name) {
    const attr = this.getAttributeNode(name)
    return attr && attr.value || ''
  },
  getAttributeNode(name) {
    return this.attributes.getNamedItem(name)
  },
  setAttribute(name, value) {
    const attr = this.ownerDocument.createAttribute(name)
    attr.value = attr.nodeValue = '' + value
    this.setAttributeNode(attr)
  },
  removeAttribute(name) {
    const attr = this.getAttributeNode(name)
    attr && this.removeAttributeNode(attr)
  },

  // four real opeartion method
  appendChild(newChild) {
    if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
      return this.insertBefore(newChild, null)
    } else {
      return _appendSingleChild(this, newChild)
    }
  },
  setAttributeNode(newAttr) {
    const value = newAttr.value
    if(newAttr.name=="style"){
      
      this.style = CSSStyleDeclaration.parse(value)
    }
    this.attributes[newAttr.name] = { value, textContent: value == null ? "" : value.toString() }
    return this.attributes.setNamedItem(newAttr)
  },
  setAttributeNodeNS(newAttr) {
    return this.attributes.setNamedItemNS(newAttr)
  },
  removeAttributeNode(oldAttr) {
    // console.log(this == oldAttr.ownerElement)
    return this.attributes.removeNamedItem(oldAttr.nodeName)
  },
  // get real attribute name,and remove it by removeAttributeNode
  removeAttributeNS(namespaceURI, localName) {
    const old = this.getAttributeNodeNS(namespaceURI, localName)
    old && this.removeAttributeNode(old)
  },

  hasAttributeNS(namespaceURI, localName) {
    return this.getAttributeNodeNS(namespaceURI, localName) != null
  },
  getAttributeNS(namespaceURI, localName) {
    const attr = this.getAttributeNodeNS(namespaceURI, localName)
    return attr && attr.value || ''
  },
  setAttributeNS(namespaceURI, qualifiedName, value) {
    const attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName)
    attr.value = attr.nodeValue = '' + value
    this.setAttributeNode(attr)
  },
  getAttributeNodeNS(namespaceURI, localName) {
    return this.attributes.getNamedItemNS(namespaceURI, localName)
  },

  getElementsByTagName(tagName) {
    return new LiveNodeList(this, function (base) {
      const ls = []
      _visitNode(base, function (node) {
        if (node !== base && node.nodeType == ELEMENT_NODE && (tagName === '*' || node.tagName == tagName
        || node.tagName.endsWith(":"+tagName))) {
          ls.push(node)
        }
      })
      return ls
    })
  },
  getElementsByTagNameNS(namespaceURI, localName) {
    return new LiveNodeList(this, function (base) {
      const ls = []
      _visitNode(base, function (node) {
        if (node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === '*' || node.namespaceURI === namespaceURI) && (localName === '*' || node.localName == localName)) {
          ls.push(node)
        }
      })
      return ls
    })
  }
}

Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName
Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS
Element.prototype.querySelectorAll = function (selector) {
  const paths = selector.split(" ")
  let parents = [this]
  for (const path of paths) {
    const temp = []
    for (const parent of parents) {
      const children = parent.getElementsByTagName(path)
      for (var i = 0; i < children.length; i++) {
        temp.push(children[i])
      }
    }
    parents = temp.concat();
  }
  return parents
}
Element.prototype.querySelector = function (selector) {
  return this.querySelectorAll(selector)[0]
}
Document.prototype.querySelectorAll = Element.prototype.querySelectorAll 
Document.prototype.querySelector = Element.prototype.querySelector 

_extends(Element, Node)
function Attr() {
}
Attr.prototype.nodeType = ATTRIBUTE_NODE
_extends(Attr, Node)


function CharacterData() {
}
CharacterData.prototype = {
  data: '',
  substringData(offset, count) {
    return this.data.substring(offset, offset + count)
  },
  appendData(text) {
    text = this.data + text
    this.nodeValue = this.data = text
    this.length = text.length
  },
  insertData(offset, text) {
    this.replaceData(offset, 0, text)
  },
  appendChild(newChild) {
    throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR])
  },
  deleteData(offset, count) {
    this.replaceData(offset, count, '')
  },
  replaceData(offset, count, text) {
    const start = this.data.substring(0, offset)
    const end = this.data.substring(offset + count)
    text = start + text + end
    this.nodeValue = this.data = text
    this.length = text.length
  }
}
_extends(CharacterData, Node)
function Text() {
}
Text.prototype = {
  nodeName: '#text',
  nodeType: TEXT_NODE,
  splitText(offset) {
    let text = this.data
    const newText = text.substring(offset)
    text = text.substring(0, offset)
    this.data = this.nodeValue = text
    this.length = text.length
    const newNode = this.ownerDocument.createTextNode(newText)
    if (this.parentNode) {
      this.parentNode.insertBefore(newNode, this.nextSibling)
    }
    return newNode
  }
}
_extends(Text, CharacterData)
function Comment() {
}
Comment.prototype = {
  nodeName: '#comment',
  nodeType: COMMENT_NODE
}
_extends(Comment, CharacterData)

function CDATASection() {
}
CDATASection.prototype = {
  nodeName: '#cdata-section',
  nodeType: CDATA_SECTION_NODE
}
_extends(CDATASection, CharacterData)


function DocumentType() {
}
DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE
_extends(DocumentType, Node)

function Notation() {
}
Notation.prototype.nodeType = NOTATION_NODE
_extends(Notation, Node)

function Entity() {
}
Entity.prototype.nodeType = ENTITY_NODE
_extends(Entity, Node)

function EntityReference() {
}
EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE
_extends(EntityReference, Node)

function DocumentFragment() {
}
DocumentFragment.prototype.nodeName = '#document-fragment'
DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE
_extends(DocumentFragment, Node)


function ProcessingInstruction() {
}
ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE
_extends(ProcessingInstruction, Node)
function XMLSerializer() { }
XMLSerializer.prototype.serializeToString = function (node, isHtml, nodeFilter) {
  return nodeSerializeToString.call(node, isHtml, nodeFilter)
}
Node.prototype.toString = nodeSerializeToString
function nodeSerializeToString(isHtml, nodeFilter) {
  const buf = []
  const refNode = this.nodeType == 9 && this.documentElement || this
  var prefix = refNode.prefix
  const uri = refNode.namespaceURI

  if (uri && prefix == null) {
    // console.log(prefix)
    var prefix = refNode.lookupPrefix(uri)
    if (prefix == null) {
      // isHTML = true;
      var visibleNamespaces = [
        { namespace: uri, prefix: null }
        // {namespace:uri,prefix:''}
      ]
    }
  }
  serializeToString(this, buf, isHtml, nodeFilter, visibleNamespaces)
  // console.log('###',this.nodeType,uri,prefix,buf.join(''))
  return buf.join('')
}
function needNamespaceDefine(node, isHTML, visibleNamespaces) {
  const prefix = node.prefix || ''
  const uri = node.namespaceURI
  if (!prefix && !uri) {
    return false
  }
  if (prefix === 'xml' && uri === 'http://www.w3.org/XML/1998/namespace' ||
    uri == 'http://www.w3.org/2000/xmlns/') {
    return false
  }

  let i = visibleNamespaces.length
  // console.log('@@@@',node.tagName,prefix,uri,visibleNamespaces)
  while (i--) {
    const ns = visibleNamespaces[i]
    // get namespace prefix
    // console.log(node.nodeType,node.tagName,ns.prefix,prefix)
    if (ns.prefix == prefix) {
      return ns.namespace != uri
    }
  }
  // console.log(isHTML,uri,prefix=='')
  // if(isHTML && prefix ==null && uri == 'http://www.w3.org/1999/xhtml'){
  //	return false;
  // }
  // node.flag = '11111'
  // console.error(3,true,node.flag,node.prefix,node.namespaceURI)
  return true
}
function serializeToString(node, buf, isHTML, nodeFilter, visibleNamespaces) {
  if (nodeFilter) {
    node = nodeFilter(node)
    if (node) {
      if (typeof node === 'string') {
        buf.push(node)
        return
      }
    } else {
      return
    }
    // buf.sort.apply(attrs, attributeSorter);
  }
  switch (node.nodeType) {
    case ELEMENT_NODE:
      if (!visibleNamespaces) visibleNamespaces = []
      var startVisibleNamespaces = visibleNamespaces.length
      var attrs = node.attributes
      var len = attrs.length
      var child = node.firstChild
      var nodeName = node.tagName

      isHTML = (htmlns === node.namespaceURI) || isHTML
      buf.push('<', nodeName)


      for (var i = 0; i < len; i++) {
        var attr = attrs.item(i)
        if (attr.prefix == 'xmlns') {
          visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value })
        } else if (attr.nodeName == 'xmlns') {
          visibleNamespaces.push({ prefix: '', namespace: attr.value })
        }
      }
      for (var i = 0; i < len; i++) {
        var attr = attrs.item(i)
        if (needNamespaceDefine(attr, isHTML, visibleNamespaces)) {
          var prefix = attr.prefix || ''
          var uri = attr.namespaceURI
          var ns = prefix ? ' xmlns:' + prefix : ' xmlns'
          buf.push(ns, '="', uri, '"')
          visibleNamespaces.push({ prefix, namespace: uri })
        }
        serializeToString(attr, buf, isHTML, nodeFilter, visibleNamespaces)
      }
      // add namespace for current node
      if (needNamespaceDefine(node, isHTML, visibleNamespaces)) {
        var prefix = node.prefix || ''
        var uri = node.namespaceURI
        var ns = prefix ? ' xmlns:' + prefix : ' xmlns'
        buf.push(ns, '="', uri, '"')
        visibleNamespaces.push({ prefix, namespace: uri })
      }

      if (child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)) {
        buf.push('>')
        // if is cdata child node
        if (isHTML && /^script$/i.test(nodeName)) {
          while (child) {
            if (child.data) {
              buf.push(child.data)
            } else {
              serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces)
            }
            child = child.nextSibling
          }
        } else {
          while (child) {
            serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces)
            child = child.nextSibling
          }
        }
        buf.push('</', nodeName, '>')
      } else {
        buf.push('/>')
      }
      // remove added visible namespaces
      // visibleNamespaces.length = startVisibleNamespaces;
      return
    case DOCUMENT_NODE:
    case DOCUMENT_FRAGMENT_NODE:
      var child = node.firstChild
      while (child) {
        serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces)
        child = child.nextSibling
      }
      return
    case ATTRIBUTE_NODE:
      return buf.push(' ', node.name, '="', node.value.replace(/[<&"]/g, _xmlEncoder), '"')
    case TEXT_NODE:
      return buf.push(node.data.replace(/[<&]/g, _xmlEncoder))
    case CDATA_SECTION_NODE:
      return buf.push('<![CDATA[', node.data, ']]>')
    case COMMENT_NODE:
      return buf.push('<!--', node.data, '-->')
    case DOCUMENT_TYPE_NODE:
      var pubid = node.publicId
      var sysid = node.systemId
      buf.push('<!DOCTYPE ', node.name)
      if (pubid) {
        buf.push(' PUBLIC "', pubid)
        if (sysid && sysid != '.') {
          buf.push('" "', sysid)
        }
        buf.push('">')
      } else if (sysid && sysid != '.') {
        buf.push(' SYSTEM "', sysid, '">')
      } else {
        const sub = node.internalSubset
        if (sub) {
          buf.push(' [', sub, ']')
        }
        buf.push('>')
      }
      return
    case PROCESSING_INSTRUCTION_NODE:
      return buf.push('<?', node.target, ' ', node.data, '?>')
    case ENTITY_REFERENCE_NODE:
      return buf.push('&', node.nodeName, ';')
    // case ENTITY_NODE:
    // case NOTATION_NODE:
    default:
      buf.push('??', node.nodeName)
  }
}
function importNode(doc, node, deep) {
  let node2
  switch (node.nodeType) {
    case ELEMENT_NODE:
      node2 = node.cloneNode(false)
      node2.ownerDocument = doc

    case DOCUMENT_FRAGMENT_NODE:
      break
    case ATTRIBUTE_NODE:
      deep = true
      break
    // case ENTITY_REFERENCE_NODE:
    // case PROCESSING_INSTRUCTION_NODE:
    // //case TEXT_NODE:
    // case CDATA_SECTION_NODE:
    // case COMMENT_NODE:
    //	deep = false;
    //	break;
    // case DOCUMENT_NODE:
    // case DOCUMENT_TYPE_NODE:
    // cannot be imported.
    // case ENTITY_NODE:
    // case NOTATION_NODE：
    // can not hit in level3
    // default:throw e;
  }
  if (!node2) {
    node2 = node.cloneNode(false)// false
  }
  node2.ownerDocument = doc
  node2.parentNode = null
  if (deep) {
    let child = node.firstChild
    while (child) {
      node2.appendChild(importNode(doc, child, deep))
      child = child.nextSibling
    }
  }
  return node2
}
//
function cloneNode(doc, node, deep) {
  const node2 = new node.constructor()
  for (const n in node) {
    const v = node[n]
    if (typeof v !== 'object') {
      if (v != node2[n]) {
        node2[n] = v
      }
    }
  }
  if (node.childNodes) {
    node2.childNodes = new NodeList()
  }
  node2.ownerDocument = doc
  switch (node2.nodeType) {
    case ELEMENT_NODE:
      var attrs = node.attributes
      var attrs2 = node2.attributes = new NamedNodeMap()
      var len = attrs.length
      attrs2._ownerElement = node2
      for (let i = 0; i < len; i++) {
        node2.setAttributeNode(cloneNode(doc, attrs.item(i), true))
      }
      break
    case ATTRIBUTE_NODE:
      deep = true
  }
  if (deep) {
    let child = node.firstChild
    while (child) {
      node2.appendChild(cloneNode(doc, child, deep))
      child = child.nextSibling
    }
  }
  return node2
}

function __set__(object, key, value) {
  object[key] = value
}
// do dynamic
try {
  if (Object.defineProperty) {
    Object.defineProperty(Element.prototype, 'outerHTML', {
      get() {
        return new XMLSerializer().serializeToString(this)
      },
      set(){

      }
    })
    Object.defineProperty(Element.prototype, 'innerHTML', {
      get() {
        var html = new XMLSerializer().serializeToString(this)
        html = html.substring(html.indexOf(">"))
        html = html.substring(0,html.lastIndexOf("</"))
        return html
      },
      set(){
        
      }
    })
    Object.defineProperty(Element.prototype, 'firstElementChild', {
      get() {
        return this.firstChild
      }
    })
    Object.defineProperty(Element.prototype, 'nextElementSibling', {
      get() {
        return this.nextSibling
      }
    })
    Object.defineProperty(LiveNodeList.prototype, 'length', {
      get() {
        _updateLiveList(this)
        return this.$$length
      }
    })
    Object.defineProperty(Node.prototype, 'textContent', {
      get() {
        return getTextContent(this)
      },
      set(data) {
        switch (this.nodeType) {
          case ELEMENT_NODE:
          case DOCUMENT_FRAGMENT_NODE:
            while (this.firstChild) {
              this.removeChild(this.firstChild)
            }
            if (data || String(data)) {
              this.appendChild(this.ownerDocument.createTextNode(data))
            }
            break
          default:
            // TODO:
            this.data = data
            this.value = data
            this.nodeValue = data
        }
      }
    })

    function getTextContent(node) {
      switch (node.nodeType) {
        case ELEMENT_NODE:
        case DOCUMENT_FRAGMENT_NODE:
          var buf = []
          node = node.firstChild
          while (node) {
            if (node.nodeType !== 7 && node.nodeType !== 8) {
              buf.push(getTextContent(node))
            }
            node = node.nextSibling
          }
          return buf.join('')
        default:
          return node.nodeValue
      }
    }
    __set__ = function (object, key, value) {
      // console.log(value)
      object['$$' + key] = value
    }
  }
} catch (e) { // ie8
}

// if(typeof require == 'function'){
exports.DOMImplementation = DOMImplementation
exports.XMLSerializer = XMLSerializer
// }

}, function(modId) { var map = {"../../CSSStyleDeclaration":1663342576253}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576282, function(require, module, exports) {
var __TEMP__ = require('./ArrayX');var ArrayX = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Base64');var Base64 = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Canvas');var Canvas = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./GUID');var GUID = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Page');var Page = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./String');var String = __REQUIRE_DEFAULT__(__TEMP__);
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = {
  ArrayX,
  GUID,
  Base64,
  Canvas,
  String,
  Page
};

}, function(modId) { var map = {"./ArrayX":1663342576248,"./Base64":1663342576250,"./Canvas":1663342576283,"./GUID":1663342576257,"./Page":1663342576252,"./String":1663342576267}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663342576283, function(require, module, exports) {
var __TEMP__ = require('../HTMLImageElement');var HTMLImageElement = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('../ImageBitmap');var ImageBitmap = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('../HTMLCanvasElement');var HTMLCanvasElement = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./Base64');var Base64 = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('../Blob');var Blob = __REQUIRE_DEFAULT__(__TEMP__);
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });class Canvas {
  static x2image(x,tobase64,toBuffer) {
    if(!x){
      return x
    }
    var img;
    if (x instanceof HTMLImageElement) {
      img = x.wx_element;
    } else if (x instanceof ImageBitmap) {
      img = x.wx_element;
    } else if (x instanceof HTMLCanvasElement) {
      img = x.wx_element;
      if(tobase64){
        img = img.toDataURL()
        if(toBuffer){
          const prev = "data:image/png;base64,"
          img = img.substring(prev.length)
          img = Base64.base64ToArrayBuffer(img)
        }
      }
    } else {
      img = x;
    }
    return img;
  }
  static canvas2image(canvas3d, canvas2d) {
    if (canvas3d.wx_element) {
      canvas3d = canvas3d.wx_element;
    }
    return new Promise((callback) => {
      var image = canvas2d.createImage();
      image.onload = function () {
        callback(image);
      };
      image.src = canvas3d.toDataURL();
    });
  }
  static canvas2img(canvas3d, canvas2d) {
    if (canvas3d.wx_element) {
      canvas3d = canvas3d.wx_element;
    }
    return new Promise((callback) => {
      var img = new HTMLImageElement(canvas2d);
      img.onload = function () {
        callback(img);
      };
      img.src = canvas3d.toDataURL();
    });
  }
  static toBlob(canvas, callback, type, quality) {
    const base64 = canvas.toDataURL(type, quality);
    const prev = `data:${type};base64,`;
    const buffer = Base64.base64ToArrayBuffer(base64.substring(prev.length));
    const blob = new Blob([buffer]);
    callback(blob);
  }
};exports.default = Canvas

}, function(modId) { var map = {"../HTMLImageElement":1663342576246,"../ImageBitmap":1663342576263,"../HTMLCanvasElement":1663342576262,"./Base64":1663342576250,"../Blob":1663342576244}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1663342576243);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map