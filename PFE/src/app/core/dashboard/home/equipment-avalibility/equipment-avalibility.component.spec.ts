import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentAvalibilityComponent } from './equipment-avalibility.component';

describe('EquipmentAvalibilityComponent', () => {
  let component: EquipmentAvalibilityComponent;
  let fixture: ComponentFixture<EquipmentAvalibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentAvalibilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EquipmentAvalibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
