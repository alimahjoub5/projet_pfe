import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajStockComponent } from './maj-stock.component';

describe('MajStockComponent', () => {
  let component: MajStockComponent;
  let fixture: ComponentFixture<MajStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MajStockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MajStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
