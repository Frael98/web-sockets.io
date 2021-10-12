const express = require('express')
const path = require('path')
const socket = require('socket.io')
const app = express()

// Static files
app.use(express.static(path.join(__dirname, 'public')))
//Setting porty
app.set('port', process.env.PORT || 4000)

const server =  app.listen(app.get('port'), ()=> {
    console.log('Listen on port :'+ app.get('port'))
})

const io = socket(server)
//Escucha la conexion
io.on('connection' ,(socket) => {
    console.log('New connection: ')
    //Escucha el evento Chat:message -> si existen mensajes
    socket.on('chat:message', (data) => {
        //Crea el evento Server:message -> envia los datos
        io.sockets.emit('server:message', data)
    })
    socket.on('chat:typing', data => {
        socket.broadcast.emit('chat:typing:server', data)
    })
})