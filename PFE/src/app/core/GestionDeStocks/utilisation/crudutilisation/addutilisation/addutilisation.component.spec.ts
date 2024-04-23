import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddutilisationComponent } from './addutilisation.component';

describe('AddutilisationComponent', () => {
  let component: AddutilisationComponent;
  let fixture: ComponentFixture<AddutilisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddutilisationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddutilisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
