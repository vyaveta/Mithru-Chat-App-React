import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import axios from 'axios'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import loader from '../assets/loader.gif'

import { setAvatarRoute } from '../utils/APIRoutes'

export default function SetAvatar() {

    const api = 'https://multiavatar.com/45678945'

  return (
    <div>SetAvatar</div>
  )
}
