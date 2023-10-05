import React from 'react'
import './SongCard.css'
import { MdOutlineAdd } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";



function SongCard({Queue, song}) {
  if(Queue){
    console.log('hii')
  }
  return (
    <section className='playlist-row'>
    <div className='playlist-container'>
        <img src={song?.Thumbnail} alt='song thumbnail' />
        <div className='playlist-info'>
            <h1>{song?.Title}</h1>
            <h2>{song?.Artist}</h2>
        </div>
    </div>
    <div className='playlist-edit'>
      {
        Queue ? <MdOutlineAdd className='hide-btn playlist-addbtn' /> : <MdOutlineAdd className='playlist-addbtn' />
      }
        <AiOutlineClose className='playlist-deletebtn'/>
    </div>
    </section>
    
  )
}

export default SongCard