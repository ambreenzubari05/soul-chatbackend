// const path = require('path');
// const { createServer } = require('http');
// const app=require('express')();
// const express = require('express');
// const { getIO, initIO } = require('./socket');
// const cors = require('cors');
// const { Socket } = require('socket.io');
// const http = require('http').Server(app);
// // const app = express();
// app.use(cors()); // Enable CORS for all routes
// var io=require('socket.io')(http);
// // app.use('/', express.static(path.join(__dirname, 'static')));
// app.use('/',function(req, res, next){
//     var options={
//         root:path.join(__dirname)
//     }
//     var filename='index.html'
//     res.sendFile(filename, options)
// })
// io.on('connection', function(){
//     console.log("user connected")
//     Socket.on('disconnect', function(){
//         console.log("user disconnected")
//     })
// })

// const httpServer = createServer(app);

// let port = process.env.PORT || 3500;

// try{
//     initIO(httpServer);
//     console.log("Succ")

// }
// catch{
//     console.log("Errconst path = require('path');
// const { createServer } = require('http');
// const express = require('express');
// const cors = require('cors');
// const { initIO } = require('./socket');
// const admin = require('firebase-admin');

// const app = express();
// const httpServer = createServer(app);

// // Initialize Firebase Admin SDK
// const serviceAccount = require('path/to/your/serviceAccountKey.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// app.use(cors());

// app.use('/', function (req, res, next) {
//   var options = {
//     root: path.join(__dirname)
//   };
//   var filename = 'index.html';
//   res.sendFile(filename, options);
// });

// try {
//   initIO(httpServer, admin);
//   console.log("Socket.IO initialized successfully");
// } catch (error) {
//   console.error("Error initializing Socket.IO:", error);
// }

// const port = process.env.PORT || 3500;

// httpServer.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });
// or")
// }
// httpServer.listen(port)
// console.log("Server started on ", port);

// getIO();

const path = require('path');
const { createServer } = require('http');
const express = require('express');
const cors = require('cors');
const { initIO } = require('./socket');
const admin = require('firebase-admin');
const config = require("config");

const app = express();
const httpServer = createServer(app);

// Initialize Firebase Admin SDK
const serviceAccount = require('./path/soulchat-33fdf-firebase-adminsdk-52upo-e660863abf.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(cors());
app.use('/', function (req, res, next) {
  var options = {
    root: path.join(__dirname)
  };
  var filename = 'index.html';
  res.sendFile(filename, options);
});

try {
  initIO(httpServer, admin);
  console.log("Socket.IO initialized successfully");
} catch (error) {
  console.error("Error initializing Socket.IO:", error);
}

const port = process.env.PORT || 3500;

httpServer.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
