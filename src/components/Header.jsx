import React from 'react'
import NetmirrorImg from '../assets/NetMirror.png'
import userIcon from "../assets/user-logo.jpg"
import { signOut } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Header = () => {

  const navigate = useNavigate()
  const user = useSelector((store) => store.user )
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/")
      })
      .catch((error) => {
        navigate("/error")
      });
  }

  return (
    <div className='absolute w-full px-8 py-3  z-10 flex items-center justify-between  '>
        <img className='w-40' src={NetmirrorImg} alt="logo" />

        {user &&<div className='flex items-center gap-6'>
           <img className='w-10' src={userIcon} alt="userIcon" />

           <button onClick={handleSignOut} className='bg-red-500 px-4 py-2 rounded-lg text-white font-semibold text-lg'>Sign Out</button>
        </div>}
    </div>

  
  )
}

export default Header