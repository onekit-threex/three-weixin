export default class ImageBitmap {
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
}
