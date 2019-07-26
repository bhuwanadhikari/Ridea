const io = require('./rtserver.js').io;
const Message = require('./models/Message');


var riders = {};


module.exports = function (socket) {



    // console.log("Socket Id:" + socket.id);

    socket.on('LOCATE', (realLocation) => {
        // console.log('Location we got is', realLocation);
        if (riders[realLocation.to]) {
            riders[realLocation.to].socket.emit('GET_HIS_LOCATION', {lat: realLocation.realLocation.lat, lng: realLocation.realLocation.lng});
        } else {
            console.log("The partner is offline");
        }
    })

    socket.on('SEND_MESSAGE', (message) => {
        const { ownerName, from, to, body } = message;
        const newMessage = new Message({ ownerName: ownerName, from: from, to: to, body: body });
        newMessage
            .save()
            .then((savedMessage) => {
                console.log("message is saved", savedMessage);
                message.createdAt = savedMessage.createdAt;
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