const { Server } = require("socket.io");
const admin = require('firebase-admin');

let IO;


module.exports.initIO = (httpServer, admin) => {
  IO = new Server(httpServer);

  console.log("Socket.IO initialized");
  // IO = new Server(httpServer);

  console.log("Socket.IO initialized");

  IO.use((socket, next) => {
    console.log("initIOlllllllll-=------",socket.handshake);
    if (socket.handshake.auth.token) {
      let callerId = socket.handshake.auth.token; // Check if this is a valid Firebase ID token
      socket.user = callerId;
      verifyFirebaseToken(callerId)
        .then(() => {
          next();
        })
        .catch((error) => {
          console.error('Firebase authentication error:', error);
          next(new Error('Firebase authentication error'));
        });
    } else {
      console.error('Firebase authentication error: No token provided.');
      next(new Error('Firebase authentication error: No token provided.'));
    }
  });
  

  IO.on("connection", (socket) => {
    console.log(socket.user, "Connected");
    socket.join(socket.user);

    socket.on("call", (data) => {
      console.log("Call......");
      const calleeId = data.calleeId;
      const rtcMessage = data.rtcMessage;

      IO.to(calleeId).emit("newCall", {
        callerId: socket.user,
        rtcMessage: rtcMessage,
      });
    });


    socket.on("answerCall", (data) => {
      console.log("answerCall......");
      const callerId = data.callerId;
      rtcMessage = data.rtcMessage;

      IO.to(callerId).emit("callAnswered", {
        callee: socket.user,
        rtcMessage: rtcMessage,
      });
    });

    socket.on("ICEcandidate", (data) => {
      console.log("ICEcandidate data.calleeId", data.calleeId);
      const calleeId = data.calleeId;
      const rtcMessage = data.rtcMessage;

      IO.to(calleeId).emit("ICEcandidate", {
        sender: socket.user,
        rtcMessage: rtcMessage,
      });
    });
  });
};

const verifyFirebaseToken = async (token) => {
  console.log('Received token:', token);

  try {
    const decodedToken = await admin.auth();
    //.verifyIdToken(token);
    console.log("Received",token)
    return decodedToken;
  } catch (error) {
    throw new Error('Firebase authentication error: ' + error.message);
  }
};


module.exports.getIO = () => {
  if (!IO) {
    console.log("IO Not Initialized");
    // throw Error("IO not initialized.");
  } else {
    console.log("IO Initialized");
  }
};
