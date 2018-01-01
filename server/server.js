const express = require("express");
const path = require("path");
const socketIO = require("socket.io")
const http = require("http");
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const {generateMessage, generateLocationMessage} = require("./utils/message");
var _ = require('lodash');


var app = express();
var server = http.createServer(app);

var io = socketIO(server);



io.on("connection", (socket) => {
  console.log("New connection from the client!");

    socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app"));
    // socket.broadcast.emit("newMessage", generateMessage("Admin", "New User joined"));

    socket.on("createMessage", (message, callback) => {


      var appVersion = message.dataObj.appVersion;
      var appVersionSplitted = message.dataObj.appVersion.split(" ");
      // console.log(appVersionSplitted);
      // console.log(appVersionSplitted[0]);
      // var randomWord = Math.floor(Math.random()*appVersionSplitted.length);
      // console.log(randomWord);


      var text = message.text;
      var textArray = text.split(" ").concat(appVersionSplitted);
      var finalChunk = _.shuffle(textArray).join(" ")
      console.log(finalChunk);




      io.emit("newMessage", generateMessage(message.from, finalChunk));
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
