import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfournisseurComponent } from './addfournisseur.component';

describe('AddfournisseurComponent', () => {
  let component: AddfournisseurComponent;
  let fixture: ComponentFixture<AddfournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddfournisseurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddfournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
