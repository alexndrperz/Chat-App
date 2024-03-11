import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-chat-present',
	standalone: true,
	imports: [NgFor, FormsModule],
	templateUrl: './chat-present.component.html',
	styleUrl: './chat-present.component.css'
})
export class ChatPresentComponent {
	constructor(private _chatServ: ChatService) { }
	messages: string[] = []
	inputStr:string = "";
	ngOnInit() {
		this.connect()

	}


	connect() {
		this._chatServ.startConnection()
		this._chatServ.messageOb$.subscribe({
			next: (res: any) => {
				this.messages.push(res)

			}
		})
	}


	sendMsg() {
		this._chatServ.sendMsg(this._chatServ.username,this.inputStr )
	}

}


