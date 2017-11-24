// Here, we're initiating the request
// It creates a connexion and it stores the sockets in the variable socket
var socket = io();

// Here, we're listening to an event from the server.
// Avoid to use => otherwise it will crash on mobile.
socket.on("connect", function() {
    console.log("New connection from the server!");
});

// these events are not directly linked to the one of the server
socket.on("disconnect", function() {
    console.log("Disctonnected from server");
})


// Listening the newMessage event from server
socket.on("newMessage", function(message){
  console.log("Message received from the server:", message.from);
})
