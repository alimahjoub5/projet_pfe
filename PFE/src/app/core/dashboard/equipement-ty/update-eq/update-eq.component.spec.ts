import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEqComponent } from './update-eq.component';

describe('UpdateEqComponent', () => {
  let component: UpdateEqComponent;
  let fixture: ComponentFixture<UpdateEqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateEqComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateEqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
