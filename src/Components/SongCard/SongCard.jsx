import React, { useContext, useEffect, useState } from "react";
import "./SongCard.css";
import { MdOutlineAdd } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { SongContext } from "../../context/Context";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { GET_ALL_SONGS } from "../../utils/queries";
import { ADD_OR_REMOVE_FROM_QUEUE } from "../../utils/mutations";
import {GET_SONGS} from '../../utils/subscription';


export default function SongCard() {
  // const { data, loading, error } = useQuery(GET_ALL_SONGS);
  // const { subData} = useSubscription(GET_SONGS);
  // console.log(subData)
  const { data: subData } = useSubscription(GET_SONGS);

  return (
    <div>
      {subData?.Music.map(item => <Song song={item} key={item.ID}/> )}
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
    const thisSongIsPlaying = state.isPlaying && song.ID === state.song.ID;
    setCurrentSongSelected(thisSongIsPlaying);
  }, [state.song.ID, song.ID, state.isPlaying]);

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
    <section className="playlist-row">
      <div className="playlist-container">
        <img src={Thumbnail} alt="song thumbnail" />
        <div className="playlist-info">
          <h1>{Title}</h1>
          <h2>{Artist}</h2>
        </div>
      </div>
      <div className="playlist-edit">
        <MdOutlineAdd className="playlist-addbtn" onClick={handleTogglePlay} />
        <AiOutlineClose
          className="playlist-deletebtn"
          onClick={handleAddOrRemoveFromQueue}
        />
      </div>
    </section>
  );
}
