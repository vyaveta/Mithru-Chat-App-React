import React,{ useState , useEffect , useRef } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { allUsersRoute, host } from '../utils/APIRoutes'
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'
import Loader from '../assets/loader.gif'
import {io } from 'socket.io-client'

function Chat() {
  const navigate = useNavigate()
  const socket = useRef();
  const [contacts,setContacts] = useState([])
  const [currentUser,setCurrentUser] = useState(undefined)
  const [currentChat,setCurrentChat] = useState(undefined)
  const [isLoading,setIsLoading] = useState(true)

  useEffect(() => {
   async function getCurrentUser(){
    if(!localStorage.getItem('mithru-app-user')) navigate('/login')
    else{
      setCurrentUser( await JSON.parse(localStorage.getItem('mithru-app-user')))
      setIsLoading(false)
    }
   }
   getCurrentUser()
  },[])

  useEffect(() => {
    if(currentUser){
      socket.current = io(host)
      socket.current.emit('add-user',currentUser._id)
    }
  },[currentUser])

  useEffect(() => {
   async function user(){
    if(currentUser){
      if(currentUser.isAvatarImageSet){
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
        setContacts(data.data)
      }else{
        navigate('/setAvatar')
      }
    }
   }
   user()
  },[currentUser])
  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }
  return (
  <>
  {
    isLoading ? <Container>
      <img src= {Loader} alt="" />
    </Container> : (
       <Container>
       <div className="container">
       <Contacts contacts = {contacts} currentUser = {currentUser} changeChat = {handleChatChange} />
       { !isLoading &&
         currentChat === undefined ? ( <Welcome  currentUser = {currentUser} /> ) : ( <ChatContainer currentChat = {currentChat} currentUser ={currentUser} socket={socket} /> )
       }
       </div>
      </Container>
    )
  }
  </>
  )
}
const Container = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 1rem;
background-color: black;
 .container{
  height: 85vh;
  width: 85vw;
  background-color: #333;
  border-radius: 1rem;
  display: grid;
  grid-template-columns: 25% 75%;
  @media screen and (min-width: 720px) and (max-width: 1080px){
    grid-template-columns :35% 65%; 
  }
 }
`
export default Chat