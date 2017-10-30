// Here, we're initiating the request
// It creates a connexion and it stores the sockets in the variable socket
var socket = io();

// Here, we're listening to an event from the server.
// Avoid to use => otherwise it will crash on mobile.
socket.on("connect", function() {
    console.log("New connection from the server!");

    // Here, we created an event from the client to the server
    socket.emit("createEmail", {
      to: "toServer@gmail.com",
      text: "heyyy"
    })
})

// these events are not directly linked to the one of the server
socket.on("disconnect", function() {
    console.log("Disctonnected from server");
})


// Here, we're listening to the newEmail event from the server.
socket.on("newEmail", function(){
  console.log("New email from the server!");
} )

// Here, we're passing the data of the server to the client
socket.on("newEmail", function(data){
  console.log(data);
} )
