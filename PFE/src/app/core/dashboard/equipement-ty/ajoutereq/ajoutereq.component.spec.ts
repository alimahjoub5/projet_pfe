import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutereqComponent } from './ajoutereq.component';

describe('AjoutereqComponent', () => {
  let component: AjoutereqComponent;
  let fixture: ComponentFixture<AjoutereqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutereqComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutereqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
