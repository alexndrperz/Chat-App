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

  ngOnInit() {
    this.connect()

  }


  async connect() {
     console.log(await this._chatServ.startConnection());
    await this._chatServ.joinChat("Aloha")

  }

}
