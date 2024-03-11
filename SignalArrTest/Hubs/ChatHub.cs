using Microsoft.AspNetCore.Identity;
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

        public async Task SendMessage(UserMessage userMess)
        {
            await Clients.All.SendAsync("SendMsg", userMess.username, userMess.message);
        }
    }
}   
