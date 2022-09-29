import Base64 from "./core/Base64";
import Page from "./core/Page"
import EventTarget from "./EventTarget"
export default class HTMLImageElement extends EventTarget {
  constructor(canvas2d) {
    super();
    const canvas = canvas2d || Page.current.canvas.wx_element;
    this.image = canvas.createImage();
    this.image.onload = () => {
      if (this.onload) {
        this.onload.call(this);
      }
      if (this._all_event_handlers.load) {
        this._all_event_handlers.load.forEach((handler) => {
          handler.call(this);
        });
      }
    };
    this.image.onerror = (e) => {
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
  get width () {
    return this.image.width;
  }
  get height () {
    return this.image.height;
  }
  get data () {
    return this.image.data;
  }
  get complete () {
    return this.image.complete;
  }
  set crossOrigin (crossOrigin) {
    this._crossOrigin = crossOrigin;
  }

  get crossOrigin () {
    return this._crossOrigin;
  }

  set src (url) {
    const onekit_debug = Page.getApp().onekit_debug
    if (onekit_debug) {
      if (url.startsWith("data:")) {
        console[onekit_debug]("[image]", "blob");
      } else {
        console[onekit_debug]("[image]", url);
      }
    }
    if (url.startsWith('data:')) {
      this._src = url;
      this.image.src = url
      return
    }
    if (url.startsWith("blob:")) {
      try {
        this._src = url;
        const arrayBuffer = Page.current.DataURL[url].array[0]
        const base64 = "data:image/png;base64," + Base64.arrayBufferToBase64(arrayBuffer)
        this.image.src = base64
      } catch (ex) {
        console.error(ex);
      }
      return
    }
    if (url.startsWith("./")) {
      url = url.substring(2)
    }
    if (!url.startsWith("blob:") &&
      !url.startsWith("data:") &&
      !url.startsWith("http://") &&
      !url.startsWith("https://")) {
      url = (Page.getApp().onekit_path || "") + url
    }
    this.image.src = url;

  }

  get src () {
    return this._src;
  }
}
