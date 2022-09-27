import files from './files.json'
var index = 116
var timer
Page({
	onLoad() {

		const sections = []
		const platform = wx.getSystemInfoSync()
		for (const sectionName of Object.keys(files)) {
			if (sectionName.startsWith("physics_")) {
                const type = platform=="ios"?"js":"wasm"
				if (!sectionName.endsWith("_"+type)) {
                    continue
                }
			}
			sections.push({
				sectionName,
				demos: files[sectionName]
			})
		}
		this.setData({
			sections
		})
     /*   var url = "webgl/"+files["webgl"][index]
        console.error(index,url)
		     wx.navigateTo({
		       url
		})*/
	},
	run() {

		var url = files["webgl"][index]
        console.error(index,url)
        index++
		wx.redirectTo({
			url: "/webgl/" + url 
		})
	},
	onReady() {

		timer = setInterval(() => {
	//	 this.run()
			}, 3000)
	//	this.run()
    },
    onHide(){
        clearInterval(timer)
    }
})
