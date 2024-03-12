import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupeDetailComponent } from './groupe-detail.component';

describe('GroupeDetailComponent', () => {
  let component: GroupeDetailComponent;
  let fixture: ComponentFixture<GroupeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupeDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
