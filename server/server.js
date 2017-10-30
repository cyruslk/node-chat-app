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

  // Here, we are logging a disconnection from the client
  // We are listening to the event disconnect from the client
  socket.on("disconnect", () => {
    console.log("New disconnection from the client!");
  })

  // .emit is creating an event.
  // It don't takes a callback;
  // The first p > name of the event
  // The second p > is the data
  // socket.emit("newEmail");

    socket.emit("newEmail", {
      from : "toClient@hotmail.fr",
      text: "Hey, what's up"
    })

    // Here, we're receiving a socket from the client
    socket.on("createEmail", (newEmail) => {
      console.log("createEmail", newEmail);
    })

})


app.use(express.static(publicPath));


server.listen(port, () =>{
  console.log(`Server is up on port ${port}`);
})
