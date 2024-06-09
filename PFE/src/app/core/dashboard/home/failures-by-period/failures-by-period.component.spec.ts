import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailuresByPeriodComponent } from './failures-by-period.component';

describe('FailuresByPeriodComponent', () => {
  let component: FailuresByPeriodComponent;
  let fixture: ComponentFixture<FailuresByPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FailuresByPeriodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FailuresByPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
