const bcrypt = require('bcrypt')

const User = require('../model/userModel')

module.exports.register = async (req,res,next) => {
   try{
    console.log(req.body)
    const { username , email , password } = req.body
    const usernameCheck = await User.findOne({ username })
    const emailCheck = await User.findOne({ email })
    if( usernameCheck ) return res.json({ msg : 'Username already taken!' , status : false })
    if( emailCheck )    return res.json({ msg : 'Email already exists' , status : false })
    const hashedPassword = await bcrypt.hash( password , 10 )
    const user = await User.create({ username , email , password : hashedPassword })
    delete user.password
    return res.json({ status : true , user})
   }catch(err){
    console.log(err,'is the error that occured in the userController.js register function')
    res.json({status : false , msg : 'error occured in the server backend'})
   }
}
module.exports.login = async (req,res,next) => {
    try{
     console.log(req.body)
     const { username  , password } = req.body
     const user = await User.findOne({ username })
     if( !user ) return res.json({ msg :'Incorrect username', status : false })
     const isPasswordValid = await bcrypt.compare(password,user.password)
     if(!isPasswordValid) return res.json({ status:false, msg : 'You have entered incorrect password!'})
     delete user.password
     return res.json({ status : true , user})
    }catch(err){
     console.log(err,'is the error that occured in the userController.js register function')
     res.json({status : false , msg : 'error occured in the server backend'})
    }
 }