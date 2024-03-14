import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListstatusComponent } from './liststatus.component';

describe('ListstatusComponent', () => {
  let component: ListstatusComponent;
  let fixture: ComponentFixture<ListstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListstatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
