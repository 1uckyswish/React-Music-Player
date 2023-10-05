import React from 'react'
import "./App.css"
import { GET_ALL_SONGS } from './utils/queries'
import { useQuery } from "@apollo/client"
import ReactPlayer from 'react-player'
import Header from './Components/Header/Header'
import Playlist from './Components/Playlist/Playlist'
import PlayingNext from './Components/PlayingNext/PlayingNext'

function App() {
  const { data, loading, error } = useQuery(GET_ALL_SONGS);

  if (loading) {
    console.log("Loading...");
  }

  if (error) {
    console.error("Error fetching data:", error);
  }

  console.log(data?.Music);

  return (
    <div>
      <Header />
      <div>
      <PlayingNext />
      <h2 className='playlist-section'>All Songs</h2>
      <Playlist />
      <Playlist />
      <Playlist />
      <Playlist />
      </div>
    </div>
  );
}

export default App
