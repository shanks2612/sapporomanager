import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[focusInvalidInput]'
})
export class FormDirectiveDirective {

  constructor(
    private element: ElementRef
  ) { }

  @HostListener('submit')
  onFormSubmit() {
    const invalidControl = this.element.nativeElement.querySelector('.is-invalid');

    if (invalidControl) {
      invalidControl.focus();
    }
  }

}
