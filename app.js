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

    socket.on('join_room', (room) => {
        socket.join(room);
        console.log(`User has joined room ${room}`);
    });
    
    socket.on('leave_room', (room) => {
        socket.leave(room);
        console.log(`User has left room ${room}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('send_message', ({room, message}) => {
        io.to(room).emit('receive_message', message);
    });
});

app.get('/api/data', (req, res) => {
    res.json({message: 'HI'});
});

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
