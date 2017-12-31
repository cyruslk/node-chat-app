const express = require("express");
const path = require("path");
const socketIO = require("socket.io")
const http = require("http");
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const {generateMessage, generateLocationMessage} = require("./utils/message");


var app = express();
var server = http.createServer(app);

var io = socketIO(server);



io.on("connection", (socket) => {
  console.log("New connection from the client!");

    socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app"));
    // socket.broadcast.emit("newMessage", generateMessage("Admin", "New User joined"));

    socket.on("createMessage", (message, callback) => {

      console.log("createMessage", message);
      var text = message.text;
      var textArray = text.split(" ").reverse().join('');



      io.emit("newMessage", generateMessage(message.from, textArray));
      callback("This is from the server!");

    })

    socket.on("createLocationMessage", (coords) =>{
      io.emit("newLocationMessage", generateLocationMessage("Admin", coords.latitude, coords.longitude));
    })

  socket.on("disconnect", () => {
    console.log("New disconnection from the client!");
  })
})


app.use(express.static(publicPath));


server.listen(port, () =>{
  console.log(`Server is up on port ${port}`);
})
