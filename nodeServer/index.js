
const io = require('socket.io')(8000)

const user = {};

io.on('connection', socket =>{
    //If any new user joined , other users get to know..
    socket.on('new-user-joined', name=>{
        console.log("New user", name);
        user[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
        
    });

    //if someone sends a message , broadcast it to other people..
    socket.on('send',message => {
            socket.broadcast.emit('receive', { message: message, name: user[socket.id] })
        });
        //if someone left the chat..
    socket.on('disconnect', message => {
            socket.broadcast.emit('left', user[socket.id]);
            delete user[socket.id];
        });
    
})
   
