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
      backgroundColor: "rgba(0,0,0,0.6)"
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
          // setInput("")
         }else{
          alert("Url not playable")
         }
  }

  const handleSongEdit = async (player)=>{
    console.dir(player)
  };

  const [userChoosenImage, setUserChoosenImage] = useState(""); 
  console.log(userChoosenImage)
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

          <ReactPlayer url={input} hidden onReady={handleSongEdit}/>
          <img src={userChoosenImage} alt='album cover' />
          <label>*Optional choose your own image*</label>
          <input type="file" id="image" accept="image/*" onChange={(e)=> setUserChoosenImage(e.target.files[0])}/>
         <input placeholder='Artist Name' class='custom-input' required/>
          <input placeholder='Song Title' class='custom-input' required/>
          <button type="submit">Submit</button>
        </div>
      </Modal>
    </header>
    </>
  )
}



export default Header