const socket = io("https://test-backend-dmi7.onrender.com");


socket.on('connect', (res) => {
    console.log('connected to server');
})
let sender, receiver;

let userDetails = () => {
    sender = document.getElementById('sender').value;
    receiver = document.getElementById('reciever').value;
    console.log(sender, receiver);
    
    if(sender && receiver){
        console.log('data sent');
        socket.emit('register', {
        from: sender
    })
    }
}


let sendMessage = (event) => {
    event.preventDefault();

    let toSendText = document.getElementById('sendField');
    let textValue = toSendText.value;
    console.log(textValue);
    if (textValue) {
        console.log('ready to send text');
        socket.emit("message", {
            from: sender,
            to: receiver,
            text: textValue,
        })
        toSendText.value = '';
    }
}
socket.on('recieve', (data) => {
    console.log('data recieved', data);
    if(data) {
        console.log(data.text);
        let responseBox = document.getElementById('recieveField');
        console.log(responseBox);
        
        responseBox.value = data.text;
    }
})

document.getElementById('messageFrom').addEventListener('submit', sendMessage);
document.getElementById('getUser').addEventListener('click', userDetails);



// on emmiting the data is sent to the socket.on handler but the message or the key should be same for both of them for the on to recieve the data sent by the emit.

// there are only two pre-built connection which are 'connection'
//  and 'disconnection' else you can name conncetions any name you want
 
// Purpose: The broadcast feature allows a server to emit an event to multiple clients simultaneously, excluding the socket that initiated the broadcast.
// Usage: On the server side, you can use socket.broadcast.emit() to send a message to all connected clients except the sender.

// socket.broadcast.to(room).emit(): Broadcasts to all clients in a specific room, except the sender. 
// check ss2
