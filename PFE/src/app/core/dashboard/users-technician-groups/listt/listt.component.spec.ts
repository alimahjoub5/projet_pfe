import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtComponent } from './listt.component';

describe('ListtComponent', () => {
  let component: ListtComponent;
  let fixture: ComponentFixture<ListtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
