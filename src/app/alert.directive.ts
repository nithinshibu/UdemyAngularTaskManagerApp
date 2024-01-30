import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAlert]',
})
export class AlertDirective implements OnInit {
  @Input('error') error!: string;
  constructor(private elementRef: ElementRef) {}
  ngOnInit(): void {
    this.elementRef.nativeElement.innerHTML = `
    <div class="alert alert-danger fade show" role="alert">
    <span>${this.error}</span>
    </div>
    `;
  }
}
