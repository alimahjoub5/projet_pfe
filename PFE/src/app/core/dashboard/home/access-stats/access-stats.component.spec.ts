import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessStatsComponent } from './access-stats.component';

describe('AccessStatsComponent', () => {
  let component: AccessStatsComponent;
  let fixture: ComponentFixture<AccessStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessStatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
