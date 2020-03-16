import io from 'socket.io-client'
const socket = io('https://yourdaymern.herokuapp.com/')

console.log(socket)
export default socket
