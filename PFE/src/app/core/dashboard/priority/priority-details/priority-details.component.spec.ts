import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityDetailsComponent } from './priority-details.component';

describe('PriorityDetailsComponent', () => {
  let component: PriorityDetailsComponent;
  let fixture: ComponentFixture<PriorityDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriorityDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PriorityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
