import React from 'react'
import './Queue.css'
import SongCard from '../SongCard/SongCard'
import { useMutation } from "@apollo/client";
import { ADD_OR_REMOVE_FROM_QUEUE } from '../../utils/mutations';

export default function Queue({queue}) {

  return (
    <div className='Queue-container'>
      <h2 className='playlist-section'>Queue ({queue?.length})</h2>
        <div>
          {queue?.map((song, index) => (
        <QueuedTitle song={song} key={index} />
      ))}
        </div>
    </div>
  )
}

function QueuedTitle({ song }) {
  const { Artist, Title, Thumbnail } = song;
  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
    onCompleted: (data) =>
      localStorage.setItem("queue", JSON.stringify(data.addOrRemoveFromQueue)),
  });
  const handleAddOrRemoveFromQueue = () => {
    addOrRemoveFromQueue({
      variables:{
       input: { ...song, __typename: "Song" },
      }
    })
  }
  return (
    <div className='q-container'>
      <img src={Thumbnail} alt={Title} />
      <div>
        <h2>{Title}</h2>
        <p>{Artist}</p>
      </div>
      <button onClick={handleAddOrRemoveFromQueue}>
        delete
      </button>
    </div>
  );
}
