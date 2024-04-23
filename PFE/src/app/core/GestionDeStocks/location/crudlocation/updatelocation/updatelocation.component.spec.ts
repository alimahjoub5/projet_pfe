import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatelocationComponent } from './updatelocation.component';

describe('UpdatelocationComponent', () => {
  let component: UpdatelocationComponent;
  let fixture: ComponentFixture<UpdatelocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatelocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatelocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
