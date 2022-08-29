export default {
    compile: function(bufferSource){
        console.error("[WXWebAssembly.compile]",bufferSource)
        return WXWebAssembly.instantiate(bufferSource)
    },
  
    instantiate: function(bufferSource, importObject){
        console.error("[WXWebAssembly.instantiate]",bufferSource,importObject)
        return WXWebAssembly.instantiate(bufferSource,importObject)
    },
  
    validate: WXWebAssembly.validate || function(){return true},
  
    Module: WXWebAssembly.Module,
  
    Global: WXWebAssembly.Global,
  
    Instance: WXWebAssembly.Instance,
  
    Memory: WXWebAssembly.Memory,
  
    Table: WXWebAssembly.Table,
  
    Tag: WXWebAssembly.Tag,
  
    CompileError: Error,
  
    LinkError: Error,
  
    RuntimeError: Error,
  
    Exception: Error
  }
  