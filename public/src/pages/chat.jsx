import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { redirect, useNavigate } from 'react-router-dom'

function Chat() {
  const navigate = useNavigate()
  const [contacts,setContacts] = useState([])
  const [currentUser,setCurrentUser] = useState(undefined)
  useEffect(() => {
    if(!localStorage.getItem('mithru-app-user')) navigate('/login')
  },[])
  useEffect(() => {

  },[])
  return (
   <Container>
    <div className="container">

    </div>
   </Container>
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
background-color: #fff;
 .container{
  height: 85vh;
  width: 85vw;
  background-color: whitesmoke;
  display: grid;
  grid-template-columns: 25% 75%;
  @media screen and (min-width: 720px) and (max-width: 1080px){
    grid-template-columns :35% 65%; 
  }
 }
`
export default Chat