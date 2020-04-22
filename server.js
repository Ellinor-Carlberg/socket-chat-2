const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)


app.use(express.static('public'))

io.on('connection', (socket) => {
    console.log('client connected: ', socket.id)  
 
    socket.on('join room', (data) => {
        socket.join(data.room, () => {
            //respond to client that join was succesful
            io.to(socket.id).emit('join successful', 'success')

            //broadcast message to all clients in the room
            io.to(data.room).emit(
                 'message', 
                {   
                    name: data.name, 
                    message: `has joined the room!`
                }
            )
        })

        socket.on('message', (message) => {
            //broadcast message to all clients in the room
            io.to(data.room).emit('message', {name: data.name, message })
        })
    })
})

server.listen(3000, () => console.log('server is running on port 3000'))