import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsfourniComponent } from './detailsfourni.component';

describe('DetailsfourniComponent', () => {
  let component: DetailsfourniComponent;
  let fixture: ComponentFixture<DetailsfourniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsfourniComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsfourniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
