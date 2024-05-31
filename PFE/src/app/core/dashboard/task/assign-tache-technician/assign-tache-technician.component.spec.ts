import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTacheTechnicianComponent } from './assign-tache-technician.component';

describe('AssignTacheTechnicianComponent', () => {
  let component: AssignTacheTechnicianComponent;
  let fixture: ComponentFixture<AssignTacheTechnicianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignTacheTechnicianComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignTacheTechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
