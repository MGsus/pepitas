import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MsgComponent } from './msg.component';

describe('MsgComponent', () => {
  let component: MsgComponent;
  let fixture: ComponentFixture<MsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have message set nor DOM element', () => {
    expect(component.message.body).toBeFalsy();
    expect(component.message.type).toBeFalsy();
    const de = fixture.debugElement.query(By.css('div'));
    expect(de).toBeNull();
  });

  it('should set the message and create the DOM element', () => {
    const mockMessage = {
      body: 'test message',
      type: 'warning'
    };
    component.setMessage(mockMessage.body, mockMessage.type);
    expect(component.message.body).toBe(mockMessage.body);
    expect(component.message.type).toBe(mockMessage.type);
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('div'));
    const el = de.nativeElement;
    expect(de).toBeDefined();
    expect(el.textContent).toContain(mockMessage.body);
    expect(el.className).toContain(mockMessage.type);
  });
});
