import React ,{ useState } from 'react'
import styled from 'styled-components'
import Picker from 'emoji-picker-react'
import { IoMdSend } from 'react-icons/io'
import { BsEmojiSmileFill } from 'react-icons/bs'

function ChatInput({handleSendMsg}) {
    const [showEmojiPicker,setShowEmojiPicker] = useState(false)
    const [msg,setMsg] = useState('')
    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker)
    }
    const handleEmojiClick = (emoji,e) =>{
        console.log(emoji)
        let message = msg
        message += emoji.emoji
        setMsg(message)
    }
    const sendChat = (e) =>{
        e.preventDefault()
        if(msg.length>0){
            handleSendMsg(msg)
            setMsg('')
        }
    }
  return (
    <Container>
        <div className="button-container">
            <div className="emoji">
                <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
                {
                    showEmojiPicker && <Picker  onEmojiClick={handleEmojiClick} />
                }
            </div>
        </div>
        <form className='input-container' onSubmit={(e) => sendChat(e)} > 
        <input type="text" placeholder='type your message...' value={msg} onChange = {(e)=> setMsg(e.target.value,)} />
        <button className="submit">
            <IoMdSend />
        </button>
        </form>
    </Container>
  )
}

const Container = styled.div`
display: grid;
grid-template-columns: 5% 95%;
align-items: center;
background-color: #333;
padding: 0 2rem;
padding-bottom: 0.3rem;
.button-container{
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji{
        position: relative;
        svg{
            font-size: 1.5rem;
            color: #ffff00c8;
            cursor: pointer;
        }
        .EmojiPickerReact{
            position: absolute;
            top: -450px;
            max-height: 400px;
        }
    }
}
.input-container{
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #cccccc;
    overflow: hidden;
    input{
        width: 90%;
        height: 60%;
        background-color: transparent;
        border: none;
        outline: none;
        color: black;
        padding-left: 1rem;
        font-size: 1.2rem;
        &::selection{
            background-color: #9a86f3;
        }
    }
    button{
        padding: 0.3rem 2rem;
        border-radius: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #9a86f3;
        border: none;
        svg{
            font-size: 2rem;
            color: white;
            cursor: pointer;
        }
    }
}
`

export default ChatInput