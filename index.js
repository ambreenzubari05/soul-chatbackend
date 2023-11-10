const path = require('path');
const { createServer } = require('http');
const app=require('express')();
const express = require('express');
const { getIO, initIO } = require('./socket');
const cors = require('cors');
const { Socket } = require('socket.io');
const http = require('http').Server(app);
// const app = express();
app.use(cors()); // Enable CORS for all routes
var io=require('socket.io')(http);
// app.use('/', express.static(path.join(__dirname, 'static')));
app.use('/',function(req, res, next){
    var options={
        root:path.join(__dirname)
    }
    var filename='index.html'
    res.sendFile(filename, options)
})
io.on('connection', function(){
    console.log("user connected")
    Socket.on('disconnect', function(){
        console.log("user disconnected")
    })
})

const httpServer = createServer(app);

let port = process.env.PORT || 3500;

try{
    initIO(httpServer);
    console.log("Succ")

}
catch{
    console.log("Error")
}
httpServer.listen(port)
console.log("Server started on ", port);

getIO();