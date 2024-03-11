import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterComponent } from './ajouter.component';

describe('AjouterComponent', () => {
  let component: AjouterComponent;
  let fixture: ComponentFixture<AjouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
