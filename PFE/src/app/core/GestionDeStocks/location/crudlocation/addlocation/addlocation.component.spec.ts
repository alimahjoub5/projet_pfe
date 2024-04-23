import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlocationComponent } from './addlocation.component';

describe('AddlocationComponent', () => {
  let component: AddlocationComponent;
  let fixture: ComponentFixture<AddlocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddlocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddlocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
