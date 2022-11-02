import React,{useState,useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import styled from 'styled-components';
import axios from 'axios'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {loginRoute} from '../utils/APIRoutes'
import Logo from '../assets/logo.svg'

function Login() {
    const navigate = useNavigate()
    const [values,setValues] = useState({
      username:'',
      password:''
    })
    const toastOptions = {
      position:'bottom-right',
      autoClose:8000,
      pauseOnHover:true,
      draggable:true,
      theme:'dark'
    }
    useEffect(() => {
      if(localStorage.getItem('mithru-app-user')) navigate('/')
    },[])
    const handleSubmit = async (event) => {
        event.preventDefault()
        if(handleValidation()){
          const { username , password  } = values  
          const { data }  = await axios.post(loginRoute , {username,password})
          if(data.status === false) toast.error(data.msg,toastOptions)
          if(data.status === true){
            localStorage.setItem('mithru-app-user' , JSON.stringify(data.user))
            navigate('/')
          }
        }
    }

    const handleValidation = (event) => {
      const {username,password} = values  
       if (username ===''){
        toast.error("Username is required",toastOptions)
        return false
      }else if (username.length >20){
        toast.error("Username can only be less than 20 characters!",toastOptions)
        return false
      }else if (password === ''){
        toast.error("You have not entered the password !",toastOptions)
        return false
      }
      return true
    }

    const handleChange = (event) => {
      setValues({...values, [event.target.name]:event.target.value})
    }

  return (
    <> 
    <FormContainer>
    <form onSubmit={(event) => handleSubmit(event)}>
        <div className="brand">
            <img src={Logo} alt="" />
            <h1>Mithru</h1>
        </div>
        <input type="text" placeholder='Username' name='username' onChange={(e) => handleChange(e)} />
        <input type="password" placeholder='Password' name='password' onChange={(e) => handleChange(e)} />
          <button type='submit'>Login</button>
          <span>
            Dont have an account? <Link to='/register'>Sign Up</Link>
          </span>
    </form>
    </FormContainer>
    <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
  height : 100vh;
  width : 100vw;
  display : flex;
  flex-direction : column;
  justify-content : center;
  align-items : center;
  gap : 1rem;
  background-color : whitesmoke;
  .brand{
    display:flex;
    align-items:center;
    gap:1rem;
    justify-content : center;
    img{
      height:5rem;
    }
    h1{
      color:#333;
      text-transform:uppercase;
    }
  }
  form{
    display:flex;
    flex-direction:column;
    gap:2rem;
    background-color:white;
    border-radius:2rem;
    padding:3rem 5rem;
    input{
      background-color:transparent;
      padding:1rem;
      border:0.1rem solid whitesmoke;
      border-radius:0.5rem;
      color:#333;
      width:100%;
      font-size:1rem;
      &:focus{
        outline:none;
        border:0.1rem solid #4e0eff;
      }
    }
    button{
      background-color:white;
      color:blue;
      padding:1rem 2rem;
      border:none;
      font-weight:bold;
      border-radius:0.5rem;
      font-size:1rem;
      cursor:pointer;
      text-transform : uppercase;
      transition:0.15s ease-in-out;
      &:hover{
        cursor:pointer;
        background-color: gainsboro;
      }
    }
    span{
      color:blue;
      a{
        color:blue;
        // text-decoration:none;
      }
    }
  }
`
export default Login