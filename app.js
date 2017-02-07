#!/usr/bin/env node

var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);	

app.get('/', function(req, res){
   res.sendFile(__dirname + '/www/index.html');
});

app.use(express.static(__dirname + '/www'));

//Whenever someone connects this gets executed
io.on('connection', function(socket){
  console.log('A user connected');
  
  setInterval(function(){
	  var value = Math.floor((Math.random() * 1000) + 1);
	  io.emit('light-sensor-value', '' + value);
	  // console.log("value: " + value)
	  
	  // This is another way to send data
	  socket.send(value);
  }, 2000); 

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });

});

http.listen(4000, function(){
  console.log('listening on *:4000');
});

var ws = require("nodejs-websocket")

console.log("Going to create the server")

String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};
 
// Scream server example: "hi" -> "HI!!!" 
var server = ws.createServer(function (conn) {
	
    console.log("New connection")
	var connected = true;
    
    conn.on("text", function (str) {
        console.log("Received "+str)
        conn.sendText(str.toUpperCase()+"!!!")
    })
    
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
        connected = false
    })
        
    // setTimeout(function(){
	//	conn.send('Sent a message 4seconds after connection!');
	// }, 4000);
	
  setInterval(function(){
	  var value = Math.floor((Math.random() * 1000) + 1);
	  var data = '{"data":"{0}"}'.format(value)
	  if (connected){
		conn.send(data);
	  }
  }, 2000); 	
}).listen(4001)
