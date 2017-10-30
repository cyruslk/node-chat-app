const express = require("express");
const path = require("path");
const socketIO = require("socket.io")
const http = require("http");
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);

// Here, we are creating a socket's server.
var io = socketIO(server);

// io.on let's you register an event listener
// This will be used once, for the connection
io.on("connection", (socket) => {
  console.log("New connection from the client!");

  socket.emit("newMessage", {
      form : "Hey",
      text: "comes from the server!",
      createdAt: new Date()
    })

  // Here, we're receiving a socket from the client
  socket.on("createMessage", (form, text) => {
    console.log("createEmail", form, text);
  })

  socket.on("disconnect", () => {
    console.log("New disconnection from the client!");
  })
})


app.use(express.static(publicPath));


server.listen(port, () =>{
  console.log(`Server is up on port ${port}`);
})
