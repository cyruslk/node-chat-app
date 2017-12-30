var socket = io();

socket.on("connect", function() {
    console.log("New connection from the server!");
});

socket.on("disconnect", function() {
    console.log("Disctonnected from server");
})


socket.on("newMessage", function(message){
  console.log("Message received from the server:", message);
  var li = jQuery("<li></li>");
  li.text(`${message.from}: ${message.text}`);
  jQuery("#messages").append(li)
})

jQuery("#message-form").on("submit", function(e) {
  e.preventDefault();

  socket.emit("createMessage", {
      from: "User",
      text: jQuery("[name=message]").val()
  }, function(){

  })
})


var locationButton = jQuery("#send-location");
locationButton.on("click", function(){
    if(!navigator.geolocation){
      return alert("there's no geolocation!");
    }

  navigator.geolocation.getCurrentPosition(function(position){
    console.log(position);
  }, function(){
    alert("unable to fetch the location")
  })
});
