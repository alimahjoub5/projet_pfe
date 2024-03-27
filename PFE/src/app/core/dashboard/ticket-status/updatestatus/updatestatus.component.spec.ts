import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatestatusComponent } from './updatestatus.component';

describe('UpdatestatusComponent', () => {
  let component: UpdatestatusComponent;
  let fixture: ComponentFixture<UpdatestatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatestatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatestatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
