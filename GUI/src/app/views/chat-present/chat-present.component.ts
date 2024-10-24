import { Component, input } from '@angular/core';
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
		this.handleInitSocket()

	}
	leave() {
		this._chatServ.leaveChat()
	}

	handleInitSocket() {
		this._chatServ.connect().subscribe({
			next:(returnable:string) => {
				this.messages.push(returnable)
			}
		})
		let chatServ = this._chatServ
		window.addEventListener("beforeunload", function (e) {
			chatServ.leaveChat()
		});


	}




	sendMsg() {
		if(this.inputStr != "") {
			this._chatServ.sendMsg(this.inputStr )
			this.inputStr = ""
		}
	}

}


