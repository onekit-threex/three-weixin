export default class HTMLCanvasElement {
  constructor(wx_element) {
    this.wx_element = wx_element;
  }
  get width() {
    return this.wx_element.width;
  }
  get height() {
    return this.wx_element.height;
  }
}
