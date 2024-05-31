import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierEtatComponent } from './modifier-etat.component';

describe('ModifierEtatComponent', () => {
  let component: ModifierEtatComponent;
  let fixture: ComponentFixture<ModifierEtatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierEtatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifierEtatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
