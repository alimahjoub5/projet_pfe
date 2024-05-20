import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannifierComponent } from './plannifier.component';

describe('PlannifierComponent', () => {
  let component: PlannifierComponent;
  let fixture: ComponentFixture<PlannifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlannifierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlannifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
