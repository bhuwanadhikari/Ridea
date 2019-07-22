const io = require('./rtserver.js').io;
const Message = require('./models/Message');


var riders = {};


module.exports = function (socket) {



    // console.log("Socket Id:" + socket.id);

    socket.on('SEND_MESSAGE', (message) => {


        const { ownerName, from, to, body } = message;
        const newMessage = new Message({ ownerName: ownerName, from: from, to: to, body: body });

        newMessage
            .save()
            .then((savedMessage) => {
                console.log("message is saved", savedMessage);
                riders[message.from].socket.emit('GET_MESSAGE', message);
                if (riders[message.to]) {
                    riders[message.to].socket.emit('GET_MESSAGE', message);
                } else {
                    console.log("the user is offline");
                }
            }).catch((err) => {
                console.log("Error in saving message", err);
            });


    });

    socket.on('VERIFY_USER', (myId, callback) => {
        // console.log('riders are in connection', riders);
        if (myId in riders) {
            callback(false);
        } else {
            callback(true);
        }
    });

    socket.on('ADD_USER', (userId, palId, callback) => {

        socket.userId = userId;
        riders[userId] = {
            user: userId,
            socket: socket,
        };
        // io.emit('RIDERS', riders);
        Message
            .find({ $or: [{ from: userId }, { to: userId }, { from: palId }, { to: palId }] })
            .then(allMessages => {
                callback(allMessages);
            })
            .catch(err => console.log('Error in fetching all maessages', err));
        console.log('Riders after addition now is', Object.keys(riders));

        // var allSockets = io.sockets.clients();

    });

    socket.on('REMOVAL', userId => {
        console.log("Something has been removed");
        socket.disconnect();
        io.emit("REMOVED", riders)
    });

    socket.on('disconnect', () => {
        // console.log("sOCKET TO DISCONNECTE", socket);
        if ('userId' in socket) {
            const newList = { ...riders };
            delete newList[socket.userId];
            riders = newList;
            // io.emit('removal', riders);
            console.log('user has been disconnected');
            console.log('Riders after the disconnection ', Object.keys(riders));
        }
    })

};