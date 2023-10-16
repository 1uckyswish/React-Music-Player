import React, { useContext, useRef, useState, useEffect } from "react";
import { GET_QUEUED_SONGS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { SongContext } from "../../context/Context";
import "./PlayingNext.css";
import { BsFillPlayFill } from "react-icons/bs";
import { HiPause } from "react-icons/hi2";
import { TbChevronsLeft, TbChevronsRight } from "react-icons/tb";
import ReactPlayer from "react-player";

function PlayingNext() {
  const { state, dispatch } = useContext(SongContext);
  const [play, setPlay] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const reactPlayerRef = useRef();
  const [positionInQueue, setPositionInQueue] = useState(0);
  const { data } = useQuery(GET_QUEUED_SONGS);

  function handleTogglePlay() {
    dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
  }

  function handleProgressChange(event, newValue) {
    //! ask byron
    //  setPlay(newValue);
    // console.log(newValue, 'new value')
    setPlay(event.target.value);
  }

  function handleMouseDown() {
    setSliding(true);
  }

  function handleMouseUp() {
    setSliding(false);
    // console.log(reactPlayerRef.current.seekTo(play), 'player')
    reactPlayerRef.current.seekTo(play);
  }

  function formatDuration(seconds) {
    return new Date(seconds * 1000).toISOString().substring(11, 19);
  }

  function handleNextSong() {
    const nextSong = data?.queue[positionInQueue + 1];
    if (nextSong) {
      dispatch({ type: "SET_SONG", payload: { song: nextSong } });
    }
  }

  function handlePrevSong() {
    const prevSong = data?.queue[positionInQueue - 1];
    if (prevSong) {
      dispatch({ type: "SET_SONG", payload: { song: prevSong } });
    }
  }

  useEffect(() => {
    const songIndex = data?.queue.findIndex(
      (song) => song.ID === state.song.ID
    );
    setPositionInQueue(songIndex);
  }, [data?.queue, state.song.ID]);

  useEffect(() => {
    const nextSong = data?.queue[positionInQueue + 1];
    if (play === 1 && nextSong) {
      setPlay(0);
      dispatch({ type: "SET_SONG", payload: { song: nextSong } });
    }
  }, [play, data?.queue, dispatch, positionInQueue]);

  return (
    <div className="playing-container">
      <img
        src={state.song.Thumbnail}
        alt="song"
        className={state.isPlaying && "rotating-disc"}
      />
      <section className="playing-song-info">
        <h4>{state.song.Title}</h4>
        <p>{state.song.Artist}</p>
      </section>
      <section className="controls">
        <TbChevronsLeft className="playing-btns" onClick={handlePrevSong} />
        {state.isPlaying ? (
          <HiPause onClick={handleTogglePlay} className="playing-btns" />
        ) : (
          <BsFillPlayFill onClick={handleTogglePlay} className="playing-btns" />
        )}
        <TbChevronsRight className="playing-btns" onClick={handleNextSong} />
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
      <p className="seconds-bar">{formatDuration(playedSeconds)}</p>
      <ReactPlayer
        url={state.song.URL}
        playing={state.isPlaying}
        ref={reactPlayerRef}
        onProgress={({ played, playedSeconds }) => {
          if (!sliding) {
            setPlay(played);
            setPlayedSeconds(playedSeconds);
          }
          console.log(play);
        }}
        hidden
      />
      {/* <Queue queue={data}/> */}
    </div>
  );
}

export default PlayingNext;
