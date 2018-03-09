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
var merge = require('merge');
var yelp = require('node-yelp-api');



var app = express();
var server = http.createServer(app);

var io = socketIO(server);


io.on("connection", (socket) => {
  console.log("New connection from the client!");

    request('http://ip-api.com/json', function (error, response, body) {
      // console.log('body:', body); // Print the HTML for the Google homepage.
      var bodyObj = JSON.parse(body);

    socket.emit('getTheUsersData', {
      bodyObj: bodyObj
    });


  });


    socket.on("createMessage", (message, callback) => {




      var appVersion = message.dataObj.appVersion;
      var appVersionSplitted = message.dataObj.appVersion.split(" ");
      var randomWord = Math.floor(Math.random()*appVersionSplitted.length);
      // console.log("here" , appVersionSplitted[randomWord]);

      var text = message.text;

      var textArray = text.split(" ").concat(appVersionSplitted);
      var finalChunk = _.shuffle(textArray).join(" ")

      console.log(finalChunk);
      var buffer = conv(text, { in:'binary' });
      console.log("typeof buffer",  buffer);

      // var buf = conv(text, { in:'binary' })
      // console.log("BUFFER", buf);


      io.emit("newMessage", generateMessage(message.from, finalChunk, buffer));
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
