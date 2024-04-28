import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecommandeComponent } from './updatecommande.component';

describe('UpdatecommandeComponent', () => {
  let component: UpdatecommandeComponent;
  let fixture: ComponentFixture<UpdatecommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatecommandeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatecommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
