const socket = io()
// DOM elements
let button = document.getElementById('send')
let actions = document.getElementById('actions')
let output = document.getElementById('output')
let message = document.getElementById('message')
let user = document.getElementById('user')


button.addEventListener('click', () => {
    socket.emit('chat:message', {
        username: user.value,
        message: message.value
    })
    
})

socket.on('server:message', data => {
    message.value = ''
    actions.innerHTML = ''
    output.innerHTML += `<p>
        <strong>${data.username}</strong>:
        ${data.message}
    </p>`
})

message.addEventListener('keypress', () => {
    socket.emit('chat:typing', user.value)
})

socket.on('chat:typing:server', data => {
    actions.innerHTML = `<p> <em>
    ${data} is typing
    </em> </p>`
})