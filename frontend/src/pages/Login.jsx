import React from 'react'
import { useState,useEffect } from 'react';

const Login = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler=async(e)=>{
      e.preventDefault();
 
     try {
      const formdata={email,password}

      const response=await fetch(`http://localhost:4000/user/register`,{
          method:"POST",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify(formdata)
      }) 

      const result=await response.json();
      console.log(result)

     } catch (error) {
      console.log(error.message)

     }
     finally{
      setEmail('')
      setPassword('')
     }
  }

  return (
    <div className='m-5 p-4'>
        <form className='flex flex-col justify-center items-center gap-3' onSubmit={submitHandler}>
        <input className='p-2 border-2 border-black border-solid rounded-lg' placeholder='Enter email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        <input className='p-2 border-2 border-black border-solid rounded-lg' placeholder='Enter password' type='password'  value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        <button  className='p-2 rounded-lg bg-green-400 text-white'>Submit</button>
        </form>
    </div>


    
  )
}

export default Login