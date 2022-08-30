
import files from './files.json'
Page({
    onLoad() {
        
      
        const sections = []
     for(const sectionName of Object.keys(files)){
        sections.push({
            sectionName,
            demos:files[sectionName]
        })
     }
     this.setData({sections})
 /*
     wx.navigateTo({
       url: '/webgl/webgl_animation_keyframes',
     })*/
    }
})