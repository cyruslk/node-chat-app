var socket = io();

socket.on("connect", function() {
    console.log("New connection from the server!");
});

socket.on("disconnect", function() {
    console.log("Disctonnected from server");
})


socket.on("newMessage", function(message){
  console.log("Message received from the server:", message);
})
