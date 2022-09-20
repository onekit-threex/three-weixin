export default class Canvas{
    
    static fix(canvas3d, canvas2d) {
        return new Promise((callback) => {
            var image = canvas2d.createImage()
            image.onload = function () {
                callback(image)
            }
            image.src = canvas3d.toDataURL()
        })
    }
}