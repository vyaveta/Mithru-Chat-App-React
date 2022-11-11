import React,{useState , useEffect} from 'react'
import styled from 'styled-components'
import Logo from '../assets/logo.svg'

function Contacts({contacts , currentUser , changeChat}) {
    const [currentUserName,setCurrentUserName] = useState(undefined)
    const [currentUserImage,setCurrentUserImage] = useState(undefined)
    const [currentSelected,setCurrentSelected] = useState(undefined)
    useEffect(() => {
       if(currentUser){
        setCurrentUserImage(currentUser.avatarImage)
        setCurrentUserName(currentUser.username)
       }
    },[currentUser])
    const changeCurrentChat = (index,contact) => {
        setCurrentSelected(index)
        changeChat(contact)
    }
  return (
    <>
    {
        currentUserImage && currentUserName && (
            <Container>
                <div className="brand">
                    <img src={Logo} alt="" />
                    <h3>Mithru</h3>
                </div>
                <div className="contacts">
                    {
                        contacts.map((contact,index) => {
                            return(
                                <div className={`contact ${index === currentSelected ? 'selected' : ''}`} key={index} onClick = {() => {changeCurrentChat(index,contact)}}>
                                    <div className="avatar">
                                        <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt=""/>
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="current-user">
                    <div className="avatar">
                        <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="" />
                    </div>
                    <div className="username">
                         <h2>{currentUserName}</h2>
                    </div>
                </div>
            </Container>
        )
    }
    </>
    )
}

const Container = styled.div`
display: grid;
grid-template-rows: 10% 75% 15%;
overflow: hidden;
background-color: #333;
border-radius: 4rem;
 .brand{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img{
        height: 2rem;
    }
    h3{
        color: white;
        text-transform: uppercase;
    }
 }
 .contacts{
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar{
        width:0.6rem;
        &-thumb{
            background-color: white;
            width: 0.1rem;
            border-radius: 1rem;
            border: 3px solid #333;
        }
    }
    .contact{
        background-color: white;
        min-height: 5rem;
        width: 90%;
        cursor: pointer;
        border-radius: 0.5rem;
        padding: 0.4rem;
        gap: 1rem;
        display: flex;
        align-items: center;
        .avatar{
            img{
                height: 3rem;
            }
        }
        .username{
            h3{
                color: #333;
            }
        }
    }
    .selected{
        background-color: lightblue;
    }
 }
 .current-user{
    background-color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar{
        img{
            height: 4rem;
            max-inline-size: 100%;
        }
    }
    .username{
        h2{
            color: #fff;
        }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px){
        gap: 5rem;
        .username{
            h2{
                font-size: 1rem;
            }
        }
    }
 }


 @media screen and (max-width: 720px){
    .brand{
        font-size: 0.8rem;
        img{
            height: 1.7rem;
        }
        h3{
            font-size: 0.9rem;
        }
    }
 }
 .contacts{
    .contact{
       padding: 0.1rem;
       min-height: 1rem !important;
       height: 3rem;
       .avatar{
        img{
            height: 2rem;
        }
       }
       .username{
        h3{
            font-size: 0.9rem;
        }
       }
    }
 }
 .current-user{
    gap: 1rem;
    .avatar{
        img{
            height: 2rem;
        }
    }
    .username{
        h2{
            font-size: 1rem;
        }
    }
 }
`
export default Contacts