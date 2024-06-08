import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostUsedPiecesComponent } from './most-used-pieces.component';

describe('MostUsedPiecesComponent', () => {
  let component: MostUsedPiecesComponent;
  let fixture: ComponentFixture<MostUsedPiecesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostUsedPiecesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostUsedPiecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
