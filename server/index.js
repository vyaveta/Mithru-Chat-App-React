const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const socket = require('socket.io')

const userRoutes = require('./routes/userRoutes')
const messageRoutes = require('./routes/messagesRoute')

const app = express()
require('dotenv').config()

app.use(cors({origin:true}))
app.use(express.json())
app.use('/api/auth',userRoutes)
app.use('/api/messages',messageRoutes)

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    console.log('db connection successful')
}).catch((err) => {
    console.log(err)
})

const server = app.listen(process.env.PORT , () => {
    console.log(`server is now listening on port ${process.env.PORT}`)
})

const io = socket(server,{
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
      },
})

global.onlineUsers = new Map()

io.on('connection',(socket) => {
    global.chatSocket = socket
    socket.on('add-user',(userId) => {
        onlineUsers.set(userId,socket.id)
    })

    socket.on('send-msg',(data) => {
       // console.log(data,'got here')
        const senduserSocket = onlineUsers.get(data.to)
        if(senduserSocket){
          //  console.log(senduserSocket,'is the send user')
            socket.to(senduserSocket).emit('msg-recieve',data.message)
        }
    })
})