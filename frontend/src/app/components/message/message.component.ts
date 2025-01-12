import { Component, Input, Output } from '@angular/core';
import { Message } from 'src/app/utilities/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  
  @Input()  message: Message | any;
}
