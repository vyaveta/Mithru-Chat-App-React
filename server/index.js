const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const userRoutes = require('./routes/userRoutes')

const app = express()
require('dotenv').config()

app.use(express.json())
app.use(cors())
app.use('/api/auth',userRoutes)

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