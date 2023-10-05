import React, {useState} from 'react'
import './Header.css'
import { PiMusicNotesBold } from "react-icons/pi";

function Header() {

    const [input, setInput] = useState('')

    const handleInput = (e) => {
        e.preventDefault()
        console.log('handled')
    }
  return (
    <header>
        <PiMusicNotesBold className='music-icon'/>
        <form onSubmit={handleInput}>
        <input onChange={(e)=>setInput(e.target.value)} 
        value={input} placeholder='Add Youtube Link' type='text'/>
        </form>
    </header>
  )
}

export default Header