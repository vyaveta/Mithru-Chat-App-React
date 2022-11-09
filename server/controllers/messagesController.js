const messageModel = require("../model/messageModel")

module.exports.addMessage = async (req,res,next) => {
    try{
        const { from , to , message } = req.body
        const data = await messageModel.create({
            message:{ text: message },
            users: [ from , to ],
            sender: from
        })
        if(data) return res.json({msg:'Message added successfully'})
        return res.json({msg: 'Failed to add message to the database'})
    }catch(err){
        console.log(err,'is the error that occured in the addMessage function in the messagesController')
        next(err)
    }
}

module.exports.getAllMessage = async (req,res,next) => {
    try{
        const { from , to } = req.body
        const messages = messageModel.find({
            users:{
                $all: [ from , to ]
            }, 
        }).sort({updatedAt:1})
        const projectedMessages = (await messages).map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text
            }
        })
        res.json(projectedMessages)
    }catch(err){
        next(err)
    }
}