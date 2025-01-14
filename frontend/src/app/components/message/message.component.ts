import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Message } from 'src/app/utilities/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  
  @Output() acceptEvent =  new EventEmitter<boolean>(false);
  @Output() cancelEvent = new EventEmitter<boolean>(false);

  @Input()  message: Message | any;

  accept(){
    this.message.confirmDialog()
    this.acceptEvent.emit(true);
  }

  cancel(){
    this.message.closeDialog()
    this.cancelEvent.emit(true);
  }
}
