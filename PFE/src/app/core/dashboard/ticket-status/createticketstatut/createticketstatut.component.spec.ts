import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateticketstatutComponent } from './createticketstatut.component';

describe('CreateticketstatutComponent', () => {
  let component: CreateticketstatutComponent;
  let fixture: ComponentFixture<CreateticketstatutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateticketstatutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateticketstatutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
