import React,{ useState , useEffect , useRef} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes'
import ChatInput from './ChatInput'
import Logout from './Logout'
import { v4 as uuidv4 } from 'uuid'

function ChatContainer({currentChat , currentUser , socket}) {
 
    const [messages,setMessages] = useState([])
    const [arrivalMessage,setArrivalMessage] = useState(null)
    const scrollRef = useRef()

    useEffect(() => {
        async function messages(){
            const response = await axios.post( getAllMessagesRoute , {
                from: currentUser._id,
                to: currentChat._id
            } )
            console.log(response,'is the response of from the getAllMessagesRoute')
            setMessages(response.data)
        }
        messages()
    },[currentChat])

    const handleSendMsg = async (msg) => {
        await axios.post(sendMessageRoute,{ from: currentUser._id , to: currentChat._id , message: msg})
        socket.current.emit('send-msg', { to: currentChat._id , from: currentUser._id , message: msg })
        const msgs = [...messages]
        msgs.push({fromSelf: true, message: msg })
        setMessages(msgs)
        // const msgs = [...messages]
        // msgs.push({fromSelf: true , message: msg })
        // setMessages(msgs)
    }

    useEffect(() => {
        if(socket.current) {
            socket.current.on('msg-recieve', (msg) => {
                setArrivalMessage({fromSelf: false , message: msg})
            })
        }
    },[])
    useEffect(() =>{
        arrivalMessage && setMessages((prev) => [...prev , arrivalMessage])
    },[arrivalMessage])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behaviour: 'smooth'})
    },[messages])

    return (
    <Container>
        <div className="chat-header">
            <div className="user-details">
                <div className="avatar">
                <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt=""/>
                </div>
                <div className="username">
                    <h3>{currentChat.username}</h3>
                </div>
            </div>
            <Logout />
        </div>
        <div className="chat-messages">
            {
                messages.map((message) => {
                    return(
                        <div ref={scrollRef} key = {uuidv4()}>
                            <div className={`message ${message.fromSelf ? 'sended' : 'recieved'}`}>
                                <div className="content">
                                    <p>
                                        { message.message }
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
       <ChatInput handleSendMsg = {handleSendMsg} />
    </Container>
  )
}

const Container = styled.div`
padding-top: 1rem;
display: grid;
grid-template-rows: 10% 78% 12%;
gap: 0.1rem;
overflow: hidden;
@media screen and (min-width: 720px) and (max-width: 1080px){
    gird-template-rows: 15% 70% 15%;
}
@media screen and (max-width: 720px){
    gird-template-rows: 10% 80% 15%;
   .chat-header{
     padding: 1rem;
     .user-details{
       font-size: 1rem;
     }
   }
   .chat-messages{
    .message{
       .content{
        background: green !important;
        font-size: 0.7rem !important;
        padding: 0.5rem !important;
        border-radius: 0.4rem !important;
       }
    }
   }
  }
 .chat-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    .user-details{
        display: flex;
        align-items: center;
        gap: 1rem;
        .avatar{
            img{
                height: 3rem;
            }
        }
        .username{
            h3{
                color: white;
            }
        }
    }
 }
 .chat-messages{
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar{
        width: 0.2rem;
        &-thumb{
            background: white;
            width: 0.1rem;
            border-radius: 1rem;
        }
    }
    .message{
        display: flex;
        align-items: center;
        .content{
            max-width: 40%;
            overflow-wrap: break-word;
            padding: 1rem;
            font-size: 1.1rem;
            border-radius: 1rem;
            color: whitesmoke;
        }
    }
    .sended{
        justify-content: flex-end;
        .content{
            background-color: #4f04ff21;
        }
    }
    .recieved{
        justify-content: flex-start;
        .content{
            background-color: #4f04ff21;
        }
    }
 }
`

export default ChatContainer