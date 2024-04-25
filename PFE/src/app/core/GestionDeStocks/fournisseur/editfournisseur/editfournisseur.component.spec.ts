import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfournisseurComponent } from './editfournisseur.component';

describe('EditfournisseurComponent', () => {
  let component: EditfournisseurComponent;
  let fixture: ComponentFixture<EditfournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditfournisseurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditfournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
