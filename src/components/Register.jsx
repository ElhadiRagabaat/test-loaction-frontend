import React, { useRef } from 'react'
import './register.css'
import { Room, Cancel } from '@material-ui/icons'
import { useState } from 'react'
import axios from 'axios'

export default function Register({setShowRegister}) {
    const[sucess,setSucess]= useState(false)
    const[error,setError] =useState(false)
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

    const handleSubmit =  async(e)=>{
        e.preventDefault();
        const newUser ={
            username:nameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value,
        }
        try{

            await axios.post("/users/register",newUser)
            setError(false)
            setSucess(true)

        }catch(err){
            setError(true)
        }
    }
    return (
        <div className="registerContainer">
            <div className="logo">
                <Room/>
                LamaPin
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="userName" ref={nameRef}/>
                <input type="email" placeholder="Email" ref ={emailRef}/>
                <input type="password" placeholder="Password" ref={passwordRef}/>
                <button className="registerBtn" type='submit'>Register</button>
                {sucess && <span className="seucess">Sucessfull. You can login Now</span>}
                {error &&   <span className="failure">Something went wrong</span>}
              
            </form>
            <Cancel className="registerCancel" onClick={()=>setShowRegister(false)}/>
        </div>
    )
}
