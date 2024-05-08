import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietedetailsComponent } from './societedetails.component';

describe('SocietedetailsComponent', () => {
  let component: SocietedetailsComponent;
  let fixture: ComponentFixture<SocietedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocietedetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SocietedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
