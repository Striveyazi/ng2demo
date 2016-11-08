
import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';
@Directive({
    selector:'[myHighlight]'
})
export class HighLightDirective{
    private _defaultColor='red';
    constructor(private el:ElementRef,private renderer:Renderer){}
    @Input('myHighlight')
    highLightColor:string;
    @Input()
    set defaultColor(color:string){
        this._defaultColor = color||this._defaultColor;
    }
    @HostListener('mouseenter') onmouseEnter() {
        console.log(this.highLightColor);
        console.log("test mouse enter");
        this.highlight(this.highLightColor || this._defaultColor);
    }
    @HostListener('mouseleave') onMouseLeave() {
        this.highlight(null);
    }
    private highlight(color:string){
        this.renderer.setElementStyle(this.el.nativeElement,'backgroundColor',color);
    }
}