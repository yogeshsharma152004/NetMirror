import React from 'react'
import { FaPlay } from "react-icons/fa";
import { FaInfo } from "react-icons/fa";
const VideoTitle = ({title, overview}) => {
  return (
    <div className='pt-36 px-12'>
        <h1 className='text-5xl font-bold'>{title}</h1>
        <p className='py-6 w-1/3'>{overview}</p>

        <div className='flex gap-5'>
            <button className='bg-black text-white flex items-center gap-3 py-3 px-8 text-lg font-semibold rounded-lg '><FaPlay/> Play</button>
            <button className='bg-black text-white flex items-center gap-3 py-3 px-8 text-lg font-semibold rounded-lg'><FaInfo/> More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle