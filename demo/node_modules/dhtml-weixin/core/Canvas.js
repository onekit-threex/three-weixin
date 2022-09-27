import HTMLImageElement from "../HTMLImageElement";
import HTMLCanvasElement from "../HTMLCanvasElement";
import ImageBitmap from "../ImageBitmap";
import Base64 from "./Base64";
import Blob from "../Blob";
export default class Canvas {
	/*
	static x2image(x, tobase64, toBuffer) {
		if (!x) {
			return x;
		}
		var img;
		if (x instanceof HTMLImageElement) {
			img = x.wx_element;
		} else if (x instanceof ImageBitmap) {
			img = x.wx_element;
		} else if (x instanceof HTMLCanvasElement) {
			img = x.wx_element;
			if (tobase64) {
				img = img.toDataURL();
				if (toBuffer) {
					const prev = "data:image/png;base64,";
					img = img.substring(prev.length);
					img = Base64.base64ToArrayBuffer(img);
				}
			}
		} else {
			img = x;
		}
		return img;
	}*/
	static fix(canvas, canvas_image) {
		if (canvas.wx_element) {
			canvas = canvas.wx_element;
		}
		if (canvas_image.wx_element) {
			canvas_image = canvas_image.wx_element;
		}
		return new Promise((callback, reject) => {
			try {
				var image = canvas.createImage();
				image.onload = function () {
					var result = new HTMLCanvasElement(canvas_image)
					result.image = image
					callback(result);
				};
				image.onerror = function (e) {
					reject(e)
				}
				image.src = canvas_image.toDataURL();

			} catch (e) {
				reject(e)
			}
		});
    }
	static toImage(canvas, canvas_image) {
		if (canvas.wx_element) {
			canvas = canvas.wx_element;
		}
		if (canvas_image.wx_element) {
			canvas_image = canvas_image.wx_element;
		}
		return new Promise((callback, reject) => {
			try {
				var image = canvas.createImage();
				image.onload = function () {
					callback(image);
				};
				image.onerror = function (e) {
					reject(e)
				}
				image.src = canvas_image.toDataURL();

			} catch (e) {
				reject(e)
			}
		});
    }
	static toBlob(canvas, callback, type, quality) {
		const base64 = canvas.toDataURL(type, quality);
		const prev = `data:${type};base64,`;
		const buffer = Base64.base64ToArrayBuffer(base64.substring(prev.length));
		const blob = new Blob([buffer]);
		callback(blob);
	}

	static putImageData(
		ctx,
		imageData,
		dx,
		dy,
		dirtyX,
		dirtyY,
		dirtyWidth,
		dirtyHeight
	) {
		const data = imageData.data;
		const height = imageData.height;
		const width = imageData.width;
		dirtyX = dirtyX || 0;
		dirtyY = dirtyY || 0;
		dirtyWidth = dirtyWidth !== undefined ? dirtyWidth : width;
		dirtyHeight = dirtyHeight !== undefined ? dirtyHeight : height;
		const limitBottom = dirtyY + dirtyHeight;
		const limitRight = dirtyX + dirtyWidth;
		for (let y = dirtyY; y < limitBottom; y++) {
			for (let x = dirtyX; x < limitRight; x++) {
				const pos = y * width + x;
				ctx.fillStyle = `rgba(${data[pos * 4 + 0]}, ${data[pos * 4 + 1]}, ${
          data[pos * 4 + 2]
        }, ${data[pos * 4 + 3] / 255})`;
				ctx.fillRect(x + dx, y + dy, 1, 1);
			}
		}
	}
}
