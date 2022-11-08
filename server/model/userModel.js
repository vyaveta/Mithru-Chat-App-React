const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type : String , required : true , min : 3 , max : 20 , unique : true,
    },
    email : {
        type : String , required : true , unique : true , max : 20 , min : 4
    },
    password : {
        type : String , required : true , max : 20 , min : 8
    },
    isAvatarImageSet : {
        type : Boolean , default : false 
    },
    avatarImage : {
        type : String , default : ''
    }
})

module.exports = mongoose.model('Users' , userSchema)