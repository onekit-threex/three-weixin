import files from './files.json'
var requestId
var index = 0
Page({
	data: {
		server: getApp().onekit_path
	},
	onLoad() {

		const sections = []
		for (const sectionName of Object.keys(files)) {
			sections.push({
				sectionName,
				demos: files[sectionName]
			})
		}
		this.setData({
			sections
		})


		//       wx.navigateTo({
		//    url: '/webgl/webgl_animation_skinning_blending',
		//})
	},
	run() {

		var url = files["webgl"][index++]
		console.error(url)
		wx.redirectTo({
			url: "/webgl/" + url //: '/webgl/webgl_animation_keyframes',
		})
	},
	onReady() {

		//setInterval(() => {
		//  this.run()
		//	}, 3000)
		//this.run()
	}
})
