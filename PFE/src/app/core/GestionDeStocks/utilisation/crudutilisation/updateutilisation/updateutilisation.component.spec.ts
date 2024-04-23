import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateutilisationComponent } from './updateutilisation.component';

describe('UpdateutilisationComponent', () => {
  let component: UpdateutilisationComponent;
  let fixture: ComponentFixture<UpdateutilisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateutilisationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateutilisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
