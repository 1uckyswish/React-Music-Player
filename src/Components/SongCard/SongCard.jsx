import React from 'react'
import './SongCard.css'
import song from '../../assets/cover-1.jpg'
import { MdOutlineAdd } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";



function SongCard({Queue}) {
  if(Queue){
    console.log('hii')
  }
  return (
    <section className='playlist-row'>
    <div className='playlist-container'>
        <img src={song} alt='song thumbnail' />
        <div className='playlist-info'>
            <h1>Either Way</h1>
            <h2>Ive</h2>
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