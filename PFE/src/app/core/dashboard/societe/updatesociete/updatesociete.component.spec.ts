import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesocieteComponent } from './updatesociete.component';

describe('UpdatesocieteComponent', () => {
  let component: UpdatesocieteComponent;
  let fixture: ComponentFixture<UpdatesocieteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatesocieteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatesocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
