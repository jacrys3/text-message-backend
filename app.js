require('dotenv').config();

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});
const port = process.env.PORT;

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconected');
    });

    socket.on('send_message', (msg) => {
        io.emit('receive_message', msg);
    });
});

app.get('/api/data', (req, res) => {
    res.json({message: 'HI'});
});

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
