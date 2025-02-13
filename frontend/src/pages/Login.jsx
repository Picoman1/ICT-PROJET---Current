import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'; 
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const Login = () => {
  const [currentState,setCurrentState]=useState('Login')
  const {token,setToken,backendUrl}=useContext(ShopContext)
  const [name,setName]=useState('')
  const [password,setPassword]=useState('')
  const [email,setEmail]=useState('')
  const navigate = useNavigate();
  const onSubmitHandler=async(event)=>{
        event.preventDefault()
        try {
          if(currentState==='Sign Up'){
            const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
            if(response.data.success){
                 setToken(response.data.token)
                 setCurrentState('Login')
            }else{
              toast.error(response.data.message)
            }
          }else{
            const response = await axios.post(`${backendUrl}/api/user/login`, {email, password });
            if (response.data.success) {
              setToken(response.data.token);
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('role', response.data.role); // Save user role
    
              toast.success("Login successful!");
    
              // Navigate based on user role
              if (response.data.role === 'admin') {
                navigate('/admin'); // Redirect to admin page
              } else {
                navigate('/'); // Redirect normal users to home
              }
            } else {
              toast.error(response.data.message);
            }
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
  }

  return (
    <div>
      <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
           <p className='prata-regular text-3xl py-2'>{currentState}</p>
           <hr className='border-none h-[1.5px] w-8  border-gray-800' />
        </div>
        {currentState==='Login'?'':<input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border  border-gray-800' placeholder='Name' required/>}
        <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border  border-gray-800' placeholder='Email' required/>
        <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border  border-gray-800' placeholder='password' required/>
        <div className='w-full flex justify-between text-sm mt-[-8px]'>
           <p>Forgot your password?</p>
           {
            currentState==='Login'
            ?<p className='cursor-pointer' onClick={()=>setCurrentState('Sign Up')}>Create account</p>
            :<p className='cursor-pointer' onClick={()=>setCurrentState('Login')}>Login here</p>
           }
        </div>
        <button className='bg-black text-white font-light px-8 py-2 mt-3'>{currentState==='Login'?'Sign In':'Sign Up'}</button>
      </form>
    </div>
  )
}

export default Login
