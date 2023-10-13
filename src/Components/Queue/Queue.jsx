import React from 'react'
import './Queue.css'
import SongCard from '../SongCard/SongCard'
import { useMutation } from "@apollo/client";
import { ADD_OR_REMOVE_FROM_QUEUE } from '../../utils/mutations';
import image1 from "../../assets/cover-1.jpg"

export default function Queue({queue}) {
  console.log(queue, 'tina tina')
   const song = {
    Title: "Water",
    Artist: "Tezzo",
    Thumbnail: image1,
  };
  return (
    <div className='Queue-container'>
     <h2>({queue?.length})</h2>
        <div>
          {queue.map((song, index) => (
        <QueuedTitle song={song} key={index} />
      ))}
        </div>
    </div>
  )
}


function QueuedTitle({ song }) {
  const { artist, title, thumbnail } = song;
  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
    onCompleted: (data) =>
      localStorage.setItem("queue", JSON.stringify(data.addOrRemoveFromQueue)),
  });

  function handleAddOrRemoveFromQueue() {
    addOrRemoveFromQueue({
      variables: {
        input: { ...song, __typename: "Song" },
      },
    });
  }
  return (
    <div>
      <img src={thumbnail} alt={artist} />
      <div>
        <h2>{title}</h2>
        <p>{artist}</p>
      </div>
      <button onClick={handleAddOrRemoveFromQueue}>
        delete
      </button>
    </div>
  );
}
