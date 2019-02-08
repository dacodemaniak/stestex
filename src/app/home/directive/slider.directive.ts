import { Directive, Output, ElementRef, Renderer, EventEmitter, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appSlider]'
})
export class SliderDirective {
  

  @Output() slider: any = new EventEmitter();

  // tslint:disable-next-line:no-inferrable-types
  private triggered: boolean = false;

  public constructor(
    public element: ElementRef,
    public renderer: Renderer
  ) { 
    console.log('Hello Slider Directive');
  }

  @HostListener('ionDrag') handleDrag(event) {
    console.log('Drag detected');
    if (event.getSlidingRatio() > 1.7 && !this.triggered) {
      this.triggered = true;

      this.renderer.setElementStyle(this.element.nativeElement, 'transition', '0.3s linear');
      this.renderer.setElementStyle(this.element.nativeElement, 'opacity', '0');

      setTimeout(() => {
        this.renderer.setElementStyle(this.element.nativeElement, 'opacity', '1');
          this.slider.emit(true);
      }, 300);
    }
  }
}
