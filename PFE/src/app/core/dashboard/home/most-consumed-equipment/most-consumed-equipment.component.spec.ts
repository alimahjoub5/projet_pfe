import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostConsumedEquipmentComponent } from './most-consumed-equipment.component';

describe('MostConsumedEquipmentComponent', () => {
  let component: MostConsumedEquipmentComponent;
  let fixture: ComponentFixture<MostConsumedEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostConsumedEquipmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostConsumedEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
