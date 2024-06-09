import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageAssetLifetimeComponent } from './average-asset-lifetime.component';

describe('AverageAssetLifetimeComponent', () => {
  let component: AverageAssetLifetimeComponent;
  let fixture: ComponentFixture<AverageAssetLifetimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AverageAssetLifetimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AverageAssetLifetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
