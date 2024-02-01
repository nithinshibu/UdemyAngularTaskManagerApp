import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MastersComponent } from './masters.component';
import { ComponentFactoryResolver } from '@angular/core';

describe('MastersComponent', () => {
  let component: MastersComponent;
  let fixture: ComponentFixture<MastersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MastersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MastersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

export class DynamicComponentService {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  resolveComponentFactory(component: any) {
    return this.componentFactoryResolver.resolveComponentFactory(component);
  }
}
