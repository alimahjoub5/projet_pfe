import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdategrpComponent } from './updategrp.component';

describe('UpdategrpComponent', () => {
  let component: UpdategrpComponent;
  let fixture: ComponentFixture<UpdategrpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdategrpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdategrpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
