import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TachesCourbeComponent } from './taches-courbe.component';

describe('TachesCourbeComponent', () => {
  let component: TachesCourbeComponent;
  let fixture: ComponentFixture<TachesCourbeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TachesCourbeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TachesCourbeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
