import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.css']
})
export class MsgComponent {
  @Input() message = { body: '', type: '' };

  setMessage(body, type, time = 3000) {
    this.message.body = body;
    this.message.type = type;
    setTimeout(() => this.message.body = '', time);
  }
}
