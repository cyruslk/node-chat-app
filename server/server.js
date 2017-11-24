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

  // Socket.emit for admin text welcome the new user
  socket.emit("newMessage", {
    from: "Admin",
    text: "Welcome to the app!",
    createdAt: new Date().getTime()
  });

  // broadcasting an event
  socket.broadcast.emit("newMessage", {
    from: "Admin",
    text: "New user joined",
    createdAt: new Date().getTime()
  });


    socket.on("createMessage", (message) => {
      console.log("createMessage", message);

      io.emit("newMessage", {
        from: message.from,
        text: message.text,
        createdAt: new Date().getTime()
      })

      // Here, we're broadcasting to everybody but this socket.

    //   socket.broadcast.emit("newMessage", {
    //     from: message.from,
    //     text: message.text,
    //     createdAt: new Date().getTime()
    //   })
    })

  socket.on("disconnect", () => {
    console.log("New disconnection from the client!");
  })
})


app.use(express.static(publicPath));


server.listen(port, () =>{
  console.log(`Server is up on port ${port}`);
})
