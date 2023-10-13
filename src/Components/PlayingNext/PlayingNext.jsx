import song from '../../assets/cover-1.jpg'
import React, { useContext } from "react";
import Queue from "../Queue/Queue";
import { GET_QUEUED_SONGS } from '../../utils/queries';
import { useQuery } from "@apollo/client";
import { SongContext } from "../../context/Context";
import './PlayingNext.css'
import { BsFillPlayFill } from "react-icons/bs";
import { HiPause } from "react-icons/hi2";
import { TbChevronsLeft, TbChevronsRight } from "react-icons/tb";



function PlayingNext() {
    const { state, dispatch } = useContext(SongContext);
    const { data } = useQuery(GET_QUEUED_SONGS);

    function handleTogglePlay() {
    dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
  }

  return (
    <div className='playing-container'>
    <img src={state.song.Thumbnail} alt='song'/>
    <section className='playing-song-info'>
        <h4>{state.song.Title}</h4>
        <p>{state.song.Artist}</p>
    </section>
    <section className='controls'>
        <TbChevronsLeft className='playing-btns'/>
            {
            state.isPlaying 
            ? <HiPause onClick={handleTogglePlay} className='playing-btns'/>
            : <BsFillPlayFill onClick={handleTogglePlay} className='playing-btns'/> 
            }
        <TbChevronsRight className='playing-btns'/>
    </section>
    {/* <Queue queue={data}/> */}
    </div>
  )
}

export default PlayingNext