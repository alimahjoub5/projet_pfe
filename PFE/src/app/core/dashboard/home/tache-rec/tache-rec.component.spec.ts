import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheRecComponent } from './tache-rec.component';

describe('TacheRecComponent', () => {
  let component: TacheRecComponent;
  let fixture: ComponentFixture<TacheRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TacheRecComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TacheRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
