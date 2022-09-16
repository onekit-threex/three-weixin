export default class Event {
    constructor(type, options) {
        this.type = type
        this.options = options
    }
    fix(wx_e){
        this.button = null;
        this.ctrlKey = false;
        this.metaKey = false;
        this.shiftKey = false;
        this.code = "";
        this.pointerType = "touch";
        //
        if(wx_e.changedTouches.length>0){
            const touch = wx_e.changedTouches[0]
            this.pointerId = 2//touch.identifier;
            this.pageX = touch.x;
            this.pageY = touch.y;
            this.clientX = touch.x-wx_e.currentTarget.offsetLeft;
            this.clientY = touch.y-wx_e.currentTarget.offsetTop;
            this.deltaX = this.offsetX;
            this.deltaY = this.offsetY;
        }
    }
    preventDefault() {

    }
}
