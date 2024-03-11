import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../../chat-interfaces';
import { Router } from '@angular/router';

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
 
  }
  constructor(private _wsService:ChatService, private _router:Router) {
    
  }


  enterChat() {
    this._wsService.username = this.formData.username == '' ? 'anonymus' : this.formData.username; 
    this._router.navigate(['/chat-org'])
  }
}
