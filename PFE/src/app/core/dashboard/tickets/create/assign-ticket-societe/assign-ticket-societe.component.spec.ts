import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTicketSocieteComponent } from './assign-ticket-societe.component';

describe('AssignTicketSocieteComponent', () => {
  let component: AssignTicketSocieteComponent;
  let fixture: ComponentFixture<AssignTicketSocieteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignTicketSocieteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignTicketSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
