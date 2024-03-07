using Microsoft.AspNetCore.SignalR;

namespace SignalArrTest.Hubs
{
    public class ChatHub : Hub
    {
        public async Task JoinChat()
        {
            await Clients.All.SendAsync("ReceiveMsg", "${ Context.ConnectionId} entro");
        }
    }
}
