import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepriorityComponent } from './createpriority.component';

describe('CreatepriorityComponent', () => {
  let component: CreatepriorityComponent;
  let fixture: ComponentFixture<CreatepriorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatepriorityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatepriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
