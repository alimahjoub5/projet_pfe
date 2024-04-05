import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTicketGroupComponent } from './assign-ticket-group.component';

describe('AssignTicketGroupComponent', () => {
  let component: AssignTicketGroupComponent;
  let fixture: ComponentFixture<AssignTicketGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignTicketGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignTicketGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
