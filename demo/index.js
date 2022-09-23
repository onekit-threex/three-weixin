
import files from './files.json'
Page({   
 onShareAppMessage() {
        return {
            title: "ThreeX 元宇宙利器",
            path:"/index",
            imageUrl:"/ThreeX.jpg"
        }
    },
    onShareTimeline() {
        return {
            title: "ThreeX 元宇宙利器",
            query:"/index",
            imageUrl:"/ThreeX.jpg"
        }
    },
    
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
     this.setData({sections})
 
    }
})