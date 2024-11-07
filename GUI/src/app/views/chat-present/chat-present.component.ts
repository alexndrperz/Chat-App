import { AfterViewInit, Component, ElementRef, input, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageBoxComponent } from "../../components/message-box/message-box.component";
import { MsgSctructure } from '../../models/msg-sctructure';
import { ScrollService } from '../../services/scroll.service';

@Component({
	selector: 'app-chat-present',
	standalone: true,
	imports: [NgFor, FormsModule, MessageBoxComponent],
	providers: [ScrollService],
	templateUrl: './chat-present.component.html',
	styleUrl: './chat-present.component.css'
})
export class ChatPresentComponent implements OnInit, AfterViewInit {
	constructor(
		private _chatServ: ChatService,
		private _scrollServ:ScrollService
	) { }



	// #region Propiedades
	messages: MsgSctructure[] = []
	inputStr:string = "";
	@ViewChild('scrollContainer') private scrollContainer!:ElementRef;

	// #endregion

	// #region Implementacion inicio de app
	ngOnInit() {
		this.handleInitSocket()
	}


	ngAfterViewInit(): void {
		this._scrollServ.scrollToBottom(this.scrollContainer)
	}
	// #endregion

	// #region Metodos
	//#endregion
	
	leave() {
		this._chatServ.leaveChat()
	}

	handleInitSocket() {
		this._chatServ.connect().subscribe({
			next:(returnable:MsgSctructure) => {
				this.messages.push(returnable)
				setTimeout(() => this._scrollServ.scrollToBottom(this.scrollContainer), 0);
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


