var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

app.use(express.static('client'));

var io = require('socket.io')(server);
var timeStamp = new Date();

  var hours = (timeStamp.getHours() < 10 ? '0' : '') + timeStamp.getHours();
  var minutes = (timeStamp.getMinutes() < 10 ? '0' : '') + timeStamp.getMinutes();
  var seconds = (timeStamp.getSeconds() < 10 ? '0' : '') + timeStamp.getSeconds();
  var time = hours + ":" + minutes + ":" + seconds + " ";


io.on('connection', function (socket) {

  socket.on('message', function (msg) {
    console.log('Received Message: ', time + msg);

    if(!isQuestion(msg)){
      io.emit('message', time + msg);
    } else if(isTime(msg)) {
      io.emit('message', time + new Date());
    } else if(isWeather(msg)) {
      getWeather(function(weather){
      io.emit('message', time + weather)});
    } else {
      io.emit('message', time + msg);
    }
  });
});

server.listen(8080, function() {
  console.log('Chat server running');
});

function isQuestion(msg){
  return msg.match(/\?$/);
}

function isTime(msg){
  return msg.match(/time/i);
}

function isWeather(msg){
  return msg.match(/weather/i);
}

function getWeather(callback) {
  var request = require('request');
  request.get("https://www.metaweather.com/api/location/4118/", function(error, res){
    if(!error && res.statusCode == 200){
      var data = JSON.parse(res.body)
      callback(data.consolidated_weather[0].weather_state_name);
    }
  })
}