/* eslint-disable no-unused-vars */
export default function createImageBitmap(src, options) {
  return new Promise((resolve) => {
    const image = getApp().canvas.createImage()
    image.onload = function() {
      resolve(image)
    }
    image.src = src
  })
}
