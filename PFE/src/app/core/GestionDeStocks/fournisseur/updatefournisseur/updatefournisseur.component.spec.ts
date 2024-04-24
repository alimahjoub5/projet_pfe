import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatefournisseurComponent } from './updatefournisseur.component';

describe('UpdatefournisseurComponent', () => {
  let component: UpdatefournisseurComponent;
  let fixture: ComponentFixture<UpdatefournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatefournisseurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatefournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
