import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupelistComponent } from './groupelist.component';

describe('GroupelistComponent', () => {
  let component: GroupelistComponent;
  let fixture: ComponentFixture<GroupelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupelistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
