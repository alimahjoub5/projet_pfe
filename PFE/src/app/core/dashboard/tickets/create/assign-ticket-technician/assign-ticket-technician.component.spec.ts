import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTicketTechnicianComponent } from './assign-ticket-technician.component';

describe('AssignTicketTechnicianComponent', () => {
  let component: AssignTicketTechnicianComponent;
  let fixture: ComponentFixture<AssignTicketTechnicianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignTicketTechnicianComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignTicketTechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
