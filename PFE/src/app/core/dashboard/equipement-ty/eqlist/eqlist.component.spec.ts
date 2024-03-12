import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EqlistComponent } from './eqlist.component';

describe('EqlistComponent', () => {
  let component: EqlistComponent;
  let fixture: ComponentFixture<EqlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EqlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EqlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
