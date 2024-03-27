import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateticketsComponent } from './updatetickets.component';

describe('UpdateticketsComponent', () => {
  let component: UpdateticketsComponent;
  let fixture: ComponentFixture<UpdateticketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateticketsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateticketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
