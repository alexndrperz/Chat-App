import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-present',
  standalone: true,
  imports: [],
  templateUrl: './chat-present.component.html',
  styleUrl: './chat-present.component.css'
})
export class ChatPresentComponent {
  constructor(private _chatServ:ChatService)  {}
  messages:string[] = []
  ngOnInit() {
     this.connect()

  }


   connect() {
     this._chatServ.startConnection()
  
     this._chatServ.messageOb$.subscribe({
      next:(res:any) => {
        console.log(res);
        
      }
     })
     }

  }


