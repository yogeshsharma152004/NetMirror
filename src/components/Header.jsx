import React from 'react'
import NetflixImg from '../assets/Netflix.png'

const Header = () => {
  return (
    <div className='absolute px-8 py-3  z-10'>
        <img className='w-44' src={NetflixImg} alt="logo" />
    </div>
  )
}

export default Header