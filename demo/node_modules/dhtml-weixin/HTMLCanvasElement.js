import HTMLElement from "./HTMLElement";
export default class HTMLCanvasElement extends HTMLElement {
  constructor(wx_element) {
    super();
    this.wx_element = wx_element;
  }
  get width() {
    return this.wx_element.width;
  }
  set width(width) {
    this.wx_element.width = width;
  }
  get height() {
    return this.wx_element.height;
  }
  set height(height) {
    this.wx_element.height = height;
  }
  getContext(type, attrs) {
    if (!["2d", "webgl"].includes(type)) {
      return null;
    }
    return this.wx_element.getContext(type, attrs);
  }
  toDataURL( type,  encoderOptions){
    return this.wx_element.toDataURL(type, encoderOptions); 
  }
}
