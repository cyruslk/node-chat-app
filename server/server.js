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

  // Here, we're receiving a socket from the client

    // Send a message to every new user
    socket.emit("newMessage", {
      from: "Admin",
      text: "Welcome to the chat app!",
      createdAt: new Date().getTime()
     });

    socket.broadcast.emit("newMessage", {
      from: "Admin",
      text: "New user connected",
      createdAt: new Date().getTime()
    });

    socket.on("createMessage", (form, text) => {
      // console.log("createEmail", form, text);
      io.emit("newMessage", {
        from: message.from,
        text: message.text,
        createdAt: new Date().getTime()
      })

  })

  socket.on("disconnect", () => {
    console.log("New disconnection from the client!");
  })
})


app.use(express.static(publicPath));


server.listen(port, () =>{
  console.log(`Server is up on port ${port}`);
})
