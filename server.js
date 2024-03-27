import dotenv from 'dotenv'
import http from 'http'
import { Server } from 'socket.io'
import app from './app'
dotenv.config()

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})
const port = process.env.PORT

io.on('connection', (socket) => {
  console.log('A user connected')

  socket.on('join_room', (room) => {
    socket.join(room)
    console.log(`User has joined room ${room}`)
  })

  socket.on('leave_room', (room) => {
    socket.leave(room)
    console.log(`User has left room ${room}`)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })

  socket.on('send_message', ({ room, message }) => {
    io.to(room).emit('receive_message', message)
  })
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
