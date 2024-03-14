import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioritylistComponent } from './prioritylist.component';

describe('PrioritylistComponent', () => {
  let component: PrioritylistComponent;
  let fixture: ComponentFixture<PrioritylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrioritylistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrioritylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
