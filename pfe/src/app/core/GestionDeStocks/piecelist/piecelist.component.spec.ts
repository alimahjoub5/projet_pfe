import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiecelistComponent } from './piecelist.component';

describe('PiecelistComponent', () => {
  let component: PiecelistComponent;
  let fixture: ComponentFixture<PiecelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PiecelistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PiecelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
