import dotenv from 'dotenv'
import http from 'http'
import { Server } from 'socket.io'
import app from './app.js'

dotenv.config()

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})
const port = process.env.PORT
// a map in place of a database to store message history
const msg_history = {}

io.on('connection', (socket) => {
  console.log('A user connected')

  socket.on('join_room', (room) => {
    socket.join(room)
    console.log(`User has joined room ${room}`)
    io.to(room).emit('receive_message_history', msg_history)
  })

  socket.on('leave_room', (room) => {
    socket.leave(room)
    console.log(`User has left room ${room}`)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })

  socket.on('send_message', ({ room, message, username, time }) => {
    // Add the message to the room's message history
    if (!msg_history[room]) {
      msg_history[room] = []
    }
    msg_history[room].push({message: message, username: username, time: time})

    io.to(room).emit('receive_message_history', msg_history)
  })
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
