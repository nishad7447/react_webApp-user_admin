import React, { useEffect, useState } from 'react'
import '../style.css'
import axios from 'axios'
import { UserBaseURL } from '../../../utils/const'

export default function SignUp() {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err,setErr]=useState('')

    const userSignup=()=>{

            axios.post(`${UserBaseURL}/signup`,{name:name,phone:phone,email:email,password:password})
            .then((res)=>{
                console.log(res.data)
                setName('')
                setPhone('')
                setEmail('')
                setPassword('')
                if(res.data.err){
                    setErr(res.data.err)
                }
            })
            .catch((err)=>{
                console.log(err,'signup post error ')
            })

    }

    useEffect(() => {
        const timer = setTimeout(() => {
          setErr('');
        }, 3000);
    
        // Cleanup function to clear the timer if the component unmounts or `err` gets updated before 3 seconds
        return () => clearTimeout(timer);
      }, [err]);

      
  return (
    <div>
            <div class="wrapper">
        <div class="text-center mt-4 nameSignup">
           Create New Account
        </div>
        <form  class="p-3 mt-3">
            <div class="form-field d-flex align-items-center">
                <span class="far fa-user"></span>
                <input 
                value={name}
                onChange={(e)=>setName(e.target.value)}
                type="text" name="name" id="fullName" placeholder="Full Name" required />
            </div>
            <div class="form-field d-flex align-items-center">
                <span class="far fa-user"></span>
                <input  
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
                name="mobile" id="phoneNumber" placeholder="Phone Number" required />
            </div>
            <div class="form-field d-flex align-items-center">
                <span class="far fa-user"></span>
                <input 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                type="text" name="email" id="userName" placeholder="Email-Id / Username" required />
            </div>
            <div class="form-field d-flex align-items-center">
                <span class="fas fa-key"></span>
                <input 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                type="password" name="password" id="pwd" placeholder="Password" required />
            </div>
            {
                err ? <div id="msg" class="alert alert-danger ml-4 ">{err}</div> : ''
            }
            <button onClick={userSignup} type='button' class="btn mt-3">SignUp</button>
        </form>
        <div class="text-center fs-5 ">
           If already a user <a className='smallbtn' href="/">Sign In</a>
        </div>
    </div>
    </div>
  )
}
