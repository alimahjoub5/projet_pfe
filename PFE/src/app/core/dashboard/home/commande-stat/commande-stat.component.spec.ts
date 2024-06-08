import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeStatComponent } from './commande-stat.component';

describe('CommandeStatComponent', () => {
  let component: CommandeStatComponent;
  let fixture: ComponentFixture<CommandeStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandeStatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommandeStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
