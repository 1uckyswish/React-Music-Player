import React, { useContext, useEffect, useState } from "react";
import './SongCard.css'
import { MdOutlineAdd } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { SongContext } from "../../context/Context";
import image1 from "../../assets/cover-1.jpg";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_SONGS } from "../../utils/queries";
import { ADD_OR_REMOVE_FROM_QUEUE } from "../../utils/mutations";
import { BsFillPlayFill } from "react-icons/bs";
import { HiPause } from "react-icons/hi2";

export default function SongCard() {
  const { data, loading, error } = useQuery(GET_ALL_SONGS);
  const defaultSong = {
    Title: "Dry",
    Artist: "Tezzo",
    Thumbnail: image1,
  };

  return (
    <div>
      {data.Music.slice(0, 5).map((item, index) => (
        <Song song={item} key={index} />
      ))}
    </div>
  );
}

function Song({ song }) {
  const { Title, Thumbnail, Artist } = song;
  const { state, dispatch } = useContext(SongContext);
 const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
  onCompleted: (data) => {
    localStorage.setItem("queue", JSON.stringify(data.addOrRemoveFromQueue));
  },
});
  const [currentSongSelected, setCurrentSongSelected] = useState(false);
  useEffect(() => {
    const thisSongIsPlaying = state.isPlaying && song.id === state.song.id;
    setCurrentSongSelected(thisSongIsPlaying);
  }, [state.song.id, song.id, state.isPlaying]);

  function handleTogglePlay() {
    dispatch({ type: "SET_SONG", payload: { song } });
    dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
  }

  function handleAddOrRemoveFromQueue() {
    addOrRemoveFromQueue({
      variables: {
        input: { ...song, __typename: "Song" },
      },
    });
  }

  return (
    <section className='playlist-row'>
      <div className='playlist-container'>
        <img src={Thumbnail} alt='song thumbnail' />
        <div className='playlist-info'>
          <h1>{Title}</h1>
          <h2>{Artist}</h2>
        </div>
      </div>
      <div className='playlist-edit'>
        <MdOutlineAdd className='playlist-addbtn' onClick={handleTogglePlay}/>
        <AiOutlineClose className='playlist-deletebtn' onClick={handleAddOrRemoveFromQueue}/>
      </div>
    </section>
  );
}
