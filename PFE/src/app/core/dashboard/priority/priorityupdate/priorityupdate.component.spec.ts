import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityupdateComponent } from './priorityupdate.component';

describe('PriorityupdateComponent', () => {
  let component: PriorityupdateComponent;
  let fixture: ComponentFixture<PriorityupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriorityupdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PriorityupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
