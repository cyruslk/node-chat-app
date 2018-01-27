var socket = io();

var cookieEnabled = navigator.cookieEnabled.toString();
var appVersion = navigator.appVersion.toString();
var localStorageProfile = window.localStorage.profile;
console.log("this shit" , localStorageProfile);



function scrollToBottom () {
  // Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child')
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {

  var template = jQuery("#message-template").html();
  var formattedTime = moment(message.createdAt).format("h: mm a");

  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime,
  });
  jQuery("#messages").append(html);
  scrollToBottom();

});

socket.on('newLocationMessage', function (message) {


  var template = jQuery("#location-message-template").html();
  var formattedTime = moment(message.createdAt).format("h: mm a")

  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  jQuery("#messages").append(html);
  scrollToBottom();

});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextBox = jQuery('[name=message]');
  var dataObj = {
    cookieEnabled,
    appVersion,
    localStorageProfile
  }
  console.log("here" , dataObj);

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val(),
    dataObj: dataObj
  }, function () {
    messageTextBox.val("")
  });



});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }


  locationButton.attr("disabled", "disabled").text("Sending location ...");

  navigator.geolocation.getCurrentPosition(function (position) {

    locationButton.removeAttr("disabled").text("Send location")


    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr("disabled").text("Send location")
    alert('Unable to fetch location.');
  });
});
