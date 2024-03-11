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
        this.joinChat(this.username)
      })
      .catch(err => console.error('Error al conectar al hub:', err));

    this.hubConnection.on('ReceiveMessage', (user: string, chat: string) => {
      
      this.messageSubj.next(`El usuario ${user} ha entrado al chat ${chat}`);

    });

    this.hubConnection.on('SendMsg', (user: string, msg: string) => {
      this.messageSubj.next(`${user}: ${msg}`);

    });



  }

  joinChat(username: string) {
    this.hubConnection.invoke("JoinChat", { username: username, chatRoom: "Main" });
  }

  sendMsg(username:string, msg:string) {
    this.hubConnection.invoke("SendMessage", {username:username, message: msg}) 
  }




} 
