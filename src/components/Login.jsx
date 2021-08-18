
import React, { useRef } from 'react'
import './login.css'
import { Room, Cancel } from '@material-ui/icons'
import { useState } from 'react'
import axios from 'axios'

export default function Login({setShowLogin,myStorage,setCurrentUser}) {
    const[error,setError] =useState(false)
    const nameRef = useRef()
    const passwordRef = useRef()

    const handleSubmit =  async(e)=>{
        e.preventDefault();
        const user ={
            username:nameRef.current.value,
            password:passwordRef.current.value,
        }
        try{

            const res = await axios.post("/users/login",user)
            setError(false)
            myStorage.setItem("user",res.data.username)
            setCurrentUser(res.data.username)
            setShowLogin(false)
            console.log((user));

        }catch(err){
            setError(true)
        }
    }
    return (
        <div className="LoginContainer">
            <div className="logo">
                <Room/>
                LamaPin
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="userName" ref={nameRef}/>
                <input type="password" placeholder="Password" ref={passwordRef}/>
                <button className="loginBtn" type='submit'>Login</button>
                {error &&   <span className="failure">Something went wrong</span>}
              
            </form>
            <Cancel className="loginCancel" onClick={()=>setShowLogin(false)}/>
        </div>
    )
}


