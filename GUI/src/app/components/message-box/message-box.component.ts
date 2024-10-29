import { Component, Input } from '@angular/core';

@Component({
  selector: 'cht-message-box',
  standalone: true,
  imports: [],
  templateUrl: './message-box.component.html',
  styleUrl: './message-box.component.css'
})
export class MessageBoxComponent {
  @Input() msg:string  = ""
  @Input() user:string  = "user1"
  @Input() positionMsg:string = ""
}
