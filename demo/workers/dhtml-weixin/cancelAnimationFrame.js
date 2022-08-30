export default function cancelAnimationFrame(requestId) {
  getApp().canvas.cancelAnimationFrame(requestId)
}
