const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)


app.use(express.static(__dirname + '/public'))

io.on('connection', (socket) => {
 console.log('client connected: ', socket.id)   
} )

server.listen(3000, () => console.log('server is running on port 3000'))