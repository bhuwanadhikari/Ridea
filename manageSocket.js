const io = require('./rtserver.js').io;

var riders = {};


module.exports = function (socket) {


    console.log("Socket Id:" + socket.id);

    socket.on('SEND_MESSAGE', (message) => {
        io.emit('GET_MESSAGE', message);
    });

    socket.on('VERIFY_USER', (myId, callback) => {
        // console.log('riders are in connection', riders);
        if (myId in riders) {
            callback(false);
        } else {
            callback(true);
        }
    });

    socket.on('ADD_USER', (userId) => {

        socket.userId = userId;
        riders[userId] = {
            user: userId,
            socket: socket,
        };
        // io.emit('RIDERS', riders);
        console.log('Riders after addition now is', riders);

        // var allSockets = io.sockets.clients();

    });

    socket.on('disconnect', () => {
        // console.log("sOCKET TO DISCONNECTE", socket);
        if ('userId' in socket) {
            const newList = { ...riders };
            delete newList[socket.userId];
            riders = newList;
            // io.emit('removal', riders);
            console.log('user has been disconnected');
            console.log('Riders after the disconnection ', riders);
        }
    })

};