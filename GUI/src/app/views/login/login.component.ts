import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../../chat-interfaces';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})




export class LoginComponent {

  formData:UserModel = {
    username:"",
    chatRoom:""
  }

  ngOnInit() {
    this._wsService.startConnection()
  }
  constructor(private _wsService:ChatService) {
    
  }


  sendMsg() {
    this._wsService.joinChat(this.formData.username)
  }
}
