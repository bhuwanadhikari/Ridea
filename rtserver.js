var app = require('http').createServer();
var io = module.exports.io = require('socket.io')(app);
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3231

const SocketManager = require('./manageSocket');


const db = require('./config/keys').MONGO_URI;
mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log("Connected to the mongoose from real time server"))
	.catch(err => console.log(err));


io.on('connection', SocketManager);

app.listen(PORT, () => {
	console.log("Listenning on real time server at port:" + PORT);
})	