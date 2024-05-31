import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTachGroupComponent } from './assign-tach-group.component';

describe('AssignTachGroupComponent', () => {
  let component: AssignTachGroupComponent;
  let fixture: ComponentFixture<AssignTachGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignTachGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignTachGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
