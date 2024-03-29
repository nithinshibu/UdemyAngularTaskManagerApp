import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTaskStatusComponent } from './update-task-status.component';

describe('UpdateTaskStatusComponent', () => {
  let component: UpdateTaskStatusComponent;
  let fixture: ComponentFixture<UpdateTaskStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateTaskStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateTaskStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
