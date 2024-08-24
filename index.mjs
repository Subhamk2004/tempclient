const socket = io("https://test-backend-dmi7.onrender.com");

socket.on('connect', (res) => {
    console.log('connected to server');
})
let sender, receiver, sbtn;
let isRegistered = false;
let head = document.getElementById('heading');
head.style.display = 'none';
let userDetails = () => {
    sender = document.getElementById('sender');
    receiver = document.getElementById('receiver');
    sbtn = document.getElementById('getUser');
    let currentUser = document.getElementById('currentUser');
    console.log(sender, receiver);
    
    if(sender && !isRegistered){
        console.log('data sent');
        socket.emit('register', {
            from: sender.value
        })
        isRegistered = true;
        let senderParent = sender.parentElement;
        let receiverParent = receiver.parentElement;
        console.log(senderParent);
        senderParent.style.display = 'none';
        receiverParent.style.display = 'none';   
        sbtn.style.display = 'none';
        currentUser.innerText = sender.value;
        head.style.display = 'block';
        form.style.display = 'block';
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

let form = document.getElementById('messageFrom');
form.addEventListener('submit', sendMessage);
console.log(form);

form.style.display = 'none';
socket.on('recieve', (data) => {
    console.log('data recieved', data);
    if(data) {
        console.log(data.text);
        let responseBox = document.getElementById('recieveField');
        console.log(responseBox);
        
        responseBox.value = data.text;
    }
})

socket.on('allUsers', (users) => {
    let userSelect = document.getElementById('userOptions');
    userSelect.innerHTML = '';
    users.forEach((user, index) => {
        if(users[index] != users[index + 1] && user!=sender.value)
        {            
            const option = document.createElement('option');
            option.value = user;
            option.textContent = user;
            userSelect.appendChild(option);
            option.addEventListener('click', () =>{
                receiver = user;
                console.log(receiver);
            })
        }
    })
    console.log(users);
})

document.getElementById('getUser').addEventListener('click', userDetails);



// on emmiting the data is sent to the socket.on handler but the message or the key should be same for both of them for the on to recieve the data sent by the emit.

// there are only two pre-built connection which are 'connection'
//  and 'disconnection' else you can name conncetions any name you want
 
// Purpose: The broadcast feature allows a server to emit an event to multiple clients simultaneously, excluding the socket that initiated the broadcast.
// Usage: On the server side, you can use socket.broadcast.emit() to send a message to all connected clients except the sender.

// socket.broadcast.to(room).emit(): Broadcasts to all clients in a specific room, except the sender. 
// check ss2
