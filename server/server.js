const express = require("express");
const path = require("path");
const socketIO = require("socket.io")
const http = require("http");
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation")
var _ = require('lodash');
var request = require("request");
var conv = require('binstring');




var app = express();
var server = http.createServer(app);

var io = socketIO(server);




io.on("connection", (socket) => {

  socket.on('join', (params, callback) => {
      console.log("this is the params in the server", params);
      if(!isRealString(params.name) || !isRealString(params.room)){
        callback("Name and room are required.")
      }

      socket.join(params.room);
      socket.emit("newMessage", generateMessage("Admin", `${params.name} has joined.`));
      socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
      callback();

  });


      request('http://ip-api.com/json', function (error, response, body) {
        // console.log('body:', body); // Print the HTML for the Google homepage.
        var bodyObj = JSON.parse(body);

      socket.emit('getTheUsersData', {
        bodyObj: bodyObj
      });


      socket.on("createMessage", (message, callback) => {

        var appVersion = message.dataObj.appVersion;
        var appVersionSplitted = message.dataObj.appVersion.split(" ");
        var randomWord = Math.floor(Math.random()*appVersionSplitted.length);
        var text = message.text;
        var textArray = text.split(" ").concat(appVersionSplitted);
        var finalChunk = _.shuffle(textArray).join(" ")
        // console.log(finalChunk);
        var buffer = conv(text, { in:'binary' });
        // console.log("typeof buffer",  buffer);
        // console.log("BUFFER", buf);


        io.emit("newMessage", generateMessage(message.from, finalChunk, buffer));
        callback("This is from the server!");

      })

      socket.on("createLocationMessage", (coords) =>{
        io.emit("newLocationMessage", generateLocationMessage("Admin", coords.latitude, coords.longitude));
      })

  });

  socket.on("disconnect", () => {
    console.log("New disconnection from the client!");
  })
})


app.use(express.static(publicPath));


server.listen(port, () =>{
  console.log(`Server is up on port ${port}`);
})
