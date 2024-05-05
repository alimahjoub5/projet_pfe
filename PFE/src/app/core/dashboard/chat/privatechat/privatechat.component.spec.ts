import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatechatComponent } from './privatechat.component';

describe('PrivatechatComponent', () => {
  let component: PrivatechatComponent;
  let fixture: ComponentFixture<PrivatechatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivatechatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrivatechatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
