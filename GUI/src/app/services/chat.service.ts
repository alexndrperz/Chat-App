import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection!: HubConnection;
  messageSubj: Subject<string> = new Subject<string>();
  messageOb$: Observable<string> = this.messageSubj.asObservable();
  username:string = "";

  constructor() { }

  startConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7146/socket') // Asegúrate de que la URL coincida con la ruta mapeada en el servidor
      .build();

    this.hubConnection.start()
      .then(() => {
        console.log("conectado");
        this.joinChat()
      })
      .catch(err => console.error('Error al conectar al hub:', err));

    this.hubConnection.on('ReceiveMessage', (user: string, chat: string) => {
      
      this.messageSubj.next(`El usuario ${user} ha entrado al chat ${chat}`);

    });

    this.hubConnection.on('SendMsg', (user: string, msg: string) => {
      this.messageSubj.next(`${user}: ${msg}`);

    });

    this.hubConnection.on('LeaveChat', ( msg: string) => {
      this.messageSubj.next(`${msg}`);

    });

  }

  leaveChat() {
    this.hubConnection.invoke("LeaveChat", {username: this.getUserInformation(), chatRoom:"Main"});
  }

  saveUserInformation(username:string) {
    this.username = username == '' ? 'anonymus' : username;
    console.log(username);
    
    sessionStorage.setItem("user", this.username) 
  }

  getUserInformation():string {
    let val:string | null =  sessionStorage.getItem("user")
    if(val == null) {
      return "anonymous"
    }
    return val
  }

  connect() {
		this.startConnection()
		return this.messageOb$
	}


  joinChat() {
    this.hubConnection.invoke("JoinChat", { username: this.getUserInformation(), chatRoom: "Main" });
  }

  sendMsg(msg:string) {
    if(msg.length != 0) {
      this.hubConnection.invoke("SendMessage", {username:this.getUserInformation(), message: msg}) 
    }
  }




} 
