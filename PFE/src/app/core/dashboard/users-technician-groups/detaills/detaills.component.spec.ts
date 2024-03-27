import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaillsComponent } from './detaills.component';

describe('DetaillsComponent', () => {
  let component: DetaillsComponent;
  let fixture: ComponentFixture<DetaillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetaillsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetaillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
