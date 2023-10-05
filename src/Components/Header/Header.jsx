import React, {useState} from 'react'
import './Header.css'
import { PiMusicNotesBold } from "react-icons/pi";
import ReactPlayer from 'react-player'
import Modal from 'react-modal';

function Header() {
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '24px',
      backgroundColor: '#1b2328',
    },
    overlay:{
      backgroundColor: "rgba(0,0,0,0.5)"
    }
  };

 Modal.setAppElement(document.getElementById('root'));

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(!modalIsOpen);
  }


  //* code for input

  const [input, setInput] = useState('')

  const handleInput = (e) => {
        e.preventDefault()
         const workingURL = ReactPlayer.canPlay(input)
         if(workingURL){
          setIsOpen(true)
          setInput("")
         }else{
          alert("sorry")
         }
        console.log('handled')
  }

  return (
    <>
    <header>
        <PiMusicNotesBold className='music-icon'/>
        <form onSubmit={handleInput}>
           <input onChange={(e)=>setInput(e.target.value)} 
        value={input} placeholder='Add Youtube Link' type='text'/>
          {/* <div className='input-div'>
              <button type='submit' id='submit-btn'>Submit</button>
          </div> */}
        </form>
         <div>
    </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={openModal}
        style={customStyles}
        contentLabel="Music apply">
        <div className='modal-container'>
          <img src='../../../src/assets/cover-1.jpg' />
          <label>Upload Image for album cover</label>
          <input type="file" id="image" accept="image/*"/>
         <input placeholder='Artist Name' class='custom-input'/>
          <input placeholder='Song Title' class='custom-input'/>
          <button type="submit">Submit</button>
        </div>
      </Modal>
    </header>
    </>
  )
}



export default Header