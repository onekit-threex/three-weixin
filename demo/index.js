
import files from './files.json'
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
     this.setData({sections})
 
    }
})