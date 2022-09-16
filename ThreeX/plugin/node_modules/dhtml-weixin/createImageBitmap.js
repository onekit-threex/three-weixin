/* eslint-disable no-unused-vars */
import HTMLImageElement from "./HTMLImageElement"
import Page from "./core/Page"

export default function createImageBitmap(src, options) {
  return new Promise((resolve) => {
    const canvas = Page.current.canvas
    const img = new HTMLImageElement(canvas)
    img.onload = function() {
      resolve(img)
    }
    img.src = src
  })
}
