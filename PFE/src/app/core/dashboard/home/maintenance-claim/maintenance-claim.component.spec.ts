import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceClaimComponent } from './maintenance-claim.component';

describe('MaintenanceClaimComponent', () => {
  let component: MaintenanceClaimComponent;
  let fixture: ComponentFixture<MaintenanceClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintenanceClaimComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaintenanceClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
