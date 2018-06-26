var socket = io();

$("button").on('click', function() {
  var text = $("#message").val();
  var who = $("#initials").val();
  var timeStamp = new Date();

  var hours = (timeStamp.getHours() < 10 ? '0' : '') + timeStamp.getHours();
  var minutes = (timeStamp.getMinutes() < 10 ? '0' : '') + timeStamp.getMinutes();
  var seconds = (timeStamp.getSeconds() < 10 ? '0' : '') + timeStamp.getSeconds();

  //socket.emit('message', hours + ":" + minutes + ":" + seconds +
  socket.emit('message', who + ": " + text);
  $('#message').val('');

  return false;
});

socket.on('message', function (msg) {
  $('<li>').text(msg).appendTo('#history');
});
