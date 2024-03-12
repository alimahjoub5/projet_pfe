import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutergrpComponent } from './ajoutergrp.component';

describe('AjoutergrpComponent', () => {
  let component: AjoutergrpComponent;
  let fixture: ComponentFixture<AjoutergrpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutergrpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutergrpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
