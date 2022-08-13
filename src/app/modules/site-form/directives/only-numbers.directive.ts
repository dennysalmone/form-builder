import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: 'input[customOnlyNumbers]'
})
export class OnlyNumbersDirective {


  constructor(private elRef: ElementRef, private element: ElementRef) {
  }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initalValue = this.element.nativeElement.value;
    this.element.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');

    if ( initalValue !== this.element.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
