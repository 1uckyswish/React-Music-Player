import React, {useState} from 'react'
import './PlayingNext.css'
import song from '../../assets/cover-1.jpg'
import { BsFillPlayFill } from "react-icons/bs";
BsFillPlayFill
import { HiPause} from "react-icons/hi2";
import { TbChevronsLeft, TbChevronsRight } from "react-icons/tb";



function PlayingNext() {
    const [status, setStatus] = useState(false)
  return (
    <div className='playing-container'>
    <img src={song} alt='song'/>
    <section className='playing-song-info'>
        <h4>Either Way</h4>
        <p>Ive</p>
    </section>
    <section className='controls'>
        <TbChevronsLeft className='playing-btns'/>
            {status 
            ? <BsFillPlayFill onClick={()=>setStatus(!status)} className='playing-btns'/> 
            : <HiPause onClick={()=>setStatus(!status)} className='playing-btns'/>}
        <TbChevronsRight className='playing-btns'/>
    </section>
    </div>
  )
}

export default PlayingNext