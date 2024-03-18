import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusdetailComponent } from './statusdetail.component';

describe('StatusdetailComponent', () => {
  let component: StatusdetailComponent;
  let fixture: ComponentFixture<StatusdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusdetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatusdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
