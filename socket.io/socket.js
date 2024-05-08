const io = require('socket.io')(8000,{
    cors:{
        origin:"*",
        methods:['GET', 'POST']
    }
})

let user = [];

const addUser = (senderId, socketId, data)=>{
    let cheakUser = user.some(u=> u.senderId===senderId);
    if(!cheakUser){
        user.push({senderId, socketId, data})
    }
}

const RemoveUser = (socketId)=>{
    user = user.filter(u=> u.socketId !== socketId);
}

const findUserForsendMessage = (id)=>{
    return user.find(u=>u.senderId===id);
}

io.on("connection", (socket) => {
   console.log("socket is connected.");


   socket.on('addUser', (senderId, data)=>{
    addUser(senderId, socket.id, data);
    io.emit("getUser", user)
   });

   socket.on("sendMessage", (data)=>{
    const user = findUserForsendMessage(data.receverId);
    if(user!==undefined){
        socket.to(user.socketId).emit("getMessage",{
            senderId: data.senderId,
            senderName: data.senderName,
            receverId: data.receverId,
            time: data.time,
            message: data.message
        })
    }
   })
// reciving image from frontend
   socket.on("sendImage",(data)=>{
    const user = findUserForsendMessage(data.receverId);
    if(user!==undefined){
        socket.to(user.socketId).emit("getMessage",{
            senderId: data.senderId,
            senderName: data.senderName,
            receverId: data.receverId,
            time: data.time,
            image: data.image
        })
    } 
   })

   socket.on("disconnect", ()=>{
    console.log("socket is disconnect.");
    RemoveUser(socket.id);
   })
 
  });

