import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsocieteComponent } from './addsociete.component';

describe('AddsocieteComponent', () => {
  let component: AddsocieteComponent;
  let fixture: ComponentFixture<AddsocieteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddsocieteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddsocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
