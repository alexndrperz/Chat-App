import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection!:HubConnection;

  messageRec = new Subject<string>();

  constructor() { }
  
  startConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7146/socket') // Asegúrate de que la URL coincida con la ruta mapeada en el servidor
      .build();

    this.hubConnection.start()
      .then(() => {console.log("conectado");
      })
      .catch(err => console.error('Error al conectar al hub:', err));
     
      this.hubConnection.on('ReceiveMessage', (user: string, msg:string) => {
        console.log(`${user} user`, );
        console.log(msg);
          
        
      });



  }

  joinChat(username:string) {
    this.hubConnection.invoke("JoinChat", {username:username, chatRoom:"Main"});
  }


  
    
} 
