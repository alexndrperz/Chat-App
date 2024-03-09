using Microsoft.AspNetCore.SignalR;
using SignalArrTest.Models;

namespace SignalArrTest.Hubs
{
    public class ChatHub : Hub
    {
        public async Task JoinChat(UserModel user)
        {
            await Clients.All.SendAsync("ReceiveMessage", user.Username, user.chatRoom);
        }
    }
}   
