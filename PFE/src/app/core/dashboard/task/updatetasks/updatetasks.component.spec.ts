import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatetasksComponent } from './updatetasks.component';

describe('UpdatetasksComponent', () => {
  let component: UpdatetasksComponent;
  let fixture: ComponentFixture<UpdatetasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatetasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatetasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
