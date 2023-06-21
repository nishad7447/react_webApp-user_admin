import React, { useEffect, useState } from 'react'
import '../style.css'
import axios from 'axios'
import { UserBaseURL } from '../../../utils/const'
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailErr,setEmailErr]=useState('')
    const [passErr,setPassErr]=useState('')
    const nav=useNavigate()
    const userLogin=()=>{

        axios.post(`${UserBaseURL}/login`,{email:email,password:password})
        .then((res)=>{
            console.log(res.data)
            setEmail('')
            setPassword('')
            if(res.data.success){
                nav('/home')
            }
            if(res.data.emailErr){
                setEmailErr(res.data.emailErr)
            }
            if(res.data.passErr){
                setPassErr(res.data.passErr)
            }
        })
        .catch((err)=>{
            console.log(err,'login post error ')
        })

    }

    useEffect(() => {
        const timer = setTimeout(() => {
          setEmailErr('');
        }, 3000);
        return () => clearTimeout(timer);
      }, [emailErr]);

      useEffect(() => {
        const timer = setTimeout(() => {
          setPassErr('');
        }, 3000);
        return () => clearTimeout(timer);
      }, [passErr]);

  return (
    <div>
           <div class="wrapper">
        <div class="logo">
            <img src="/static/images/user.png" alt="" />
        </div>
        <div class="text-center mt-4 name">
            Sign In
        </div>
        <form action="/login" method="post" class="p-3 mt-3">
            <div class="form-field d-flex align-items-center">
                <span class="far fa-user"></span>
                <input 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                type="email" name="email" id="username" placeholder="Username" />
            </div>
            {
                emailErr ? <div id="msg" class="alert alert-danger ml-4 ">{emailErr}</div> : ''
            }
            <div class="form-field d-flex align-items-center">
                <span class="fas fa-key"></span>
                <input 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                type="password" name="password" id="pwd" placeholder="Password" />
            </div>
            {
                passErr ? <div id="msg" class="alert alert-danger ml-4 ">{passErr}</div> : ''
            }
            <button onClick={userLogin} type="button" class="btn mt-3">LogIn</button>
        </form>
        <div class="text-center fs-5">
           to create a account <a href="/signup">Sign up</a>
        </div>
    </div>
    </div>
  )
}
