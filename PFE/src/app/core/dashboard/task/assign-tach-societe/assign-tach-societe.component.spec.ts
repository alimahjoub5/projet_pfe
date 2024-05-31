import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTachSocieteComponent } from './assign-tach-societe.component';

describe('AssignTachSocieteComponent', () => {
  let component: AssignTachSocieteComponent;
  let fixture: ComponentFixture<AssignTachSocieteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignTachSocieteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignTachSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
