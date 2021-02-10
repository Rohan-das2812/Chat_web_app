const socket = io('http://localhost:8000');

const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
var audio = new Audio('ping.mp3');

//Func which append to the container....
const append = (message,position)=>{
    const  messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
    audio.play();
    }

}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`,'right');
    socket.emit('send',message);
    messageInput.value=''
})
//ask for name..
const name = prompt("Enter your name to join");
socket.emit('new-user-joined',name);

// if a name user joined , let server know
socket.on('user-joined', name =>{
    append(`---${name} joined the chat---`, 'right')
})



socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`,'left')
})

socket.on('left', name =>{
    append(`---${name} left the chat---`,'left')
})