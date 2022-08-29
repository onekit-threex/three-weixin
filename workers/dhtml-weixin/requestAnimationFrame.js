export default function requestAnimationFrame(callback) {
  return getApp().canvas.requestAnimationFrame(callback)
}
