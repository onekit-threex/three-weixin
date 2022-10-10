/* eslint-disable class-methods-use-this */
export default class Performance {
  constructor() {
    this.wx_performance = wx.getPerformance();
  }
  now() {
    return this.wx_performance.now();
  }
}
