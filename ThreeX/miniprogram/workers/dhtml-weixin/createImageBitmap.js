/* eslint-disable no-unused-vars */
export default function createImageBitmap(src, options) {
  return new Promise((resolve) => {
    const image = this.canvas.createImage()
    image.onload = function() {
      resolve(image)
    }
    image.src = src
  })
}
