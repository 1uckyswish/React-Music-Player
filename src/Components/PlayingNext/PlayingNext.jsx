import song from "../../assets/cover-1.jpg";
import React, { useContext, useRef, useState, } from "react";
import { GET_QUEUED_SONGS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { SongContext } from "../../context/Context";
import "./PlayingNext.css";
import { BsFillPlayFill } from "react-icons/bs";
import { HiPause } from "react-icons/hi2";
import { TbChevronsLeft, TbChevronsRight } from "react-icons/tb";
import Queue from "../Queue/Queue";
import ReactPlayer from "react-player";

function PlayingNext() {
  const { state, dispatch } = useContext(SongContext);
  // const { data } = useQuery(GET_QUEUED_SONGS);
  const [play, setPlay] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const reactPlayerRef = useRef();
  

  function handleTogglePlay() {
    dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
  }

  function handleProgressChange(event, newValue) {
    console.log(event, 'event')
    console.log(newValue, 'new value')
    setPlay(newValue);
  }

  function handleMouseDown() {
    setSliding(true);
  }

  function handleMouseUp() {
    setSliding(false);
    console.log(play, "idkk idk")
    reactPlayerRef.current.seekTo(play);
  }


  return (
    <div className="playing-container">
      <img src={state.song.Thumbnail} alt="song" />
      <section className="playing-song-info">
        <h4>{state.song.Title}</h4>
        <p>{state.song.Artist}</p>
      </section>
      <section className="controls">
        <TbChevronsLeft className="playing-btns" />
        {state.isPlaying ? (
          <HiPause onClick={handleTogglePlay} className="playing-btns" />
        ) : (
          <BsFillPlayFill onClick={handleTogglePlay} className="playing-btns" />
        )}
        <TbChevronsRight className="playing-btns" />
      </section>
      <input 
       value={play}
       type="range"
       min={0}
       max={1}
       step={0.01}
       onChange={handleProgressChange}
       onMouseDown={handleMouseDown}
       onMouseUp={handleMouseUp}
     />
      <ReactPlayer
        hidden
        url={state.song.URL}
        playing={state.isPlaying}
        ref={reactPlayerRef}
        onProgress={({ played, playedSeconds }) => {
          if (!sliding) {
            setPlay(played)
          }
          console.log(play)
        }}
      />
      {/* <Queue queue={data}/> */}
    </div>
  );
}

export default PlayingNext;
