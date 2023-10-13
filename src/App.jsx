import { useState, useContext, useReducer } from "react";
import { SongContext } from "./context/Context";
import "./App.css"
import { GET_ALL_SONGS } from './utils/queries'
import { useQuery } from "@apollo/client"
import ReactPlayer from 'react-player'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Components/Header/Header'
import PlayingNext from './Components/PlayingNext/PlayingNext'
import Queue from './Components/Queue/Queue'
import SongCard from './Components/SongCard/SongCard'
import songReducer from "./context/reducer";

function App() {
    const initialSongState = useContext(SongContext);

  const [state, dispatch] = useReducer(songReducer, initialSongState);

  const { data, loading, error } = useQuery(GET_ALL_SONGS);

  if (loading) {
    console.log("Loading...");
  }

  if (error) {
    console.error("Error fetching data:", error);
  }

  console.log(data, 'holly molly');

  return (
     <SongContext.Provider value={{ state, dispatch }}>
    <div>
      <Header />
      <div>
        <PlayingNext />
        {/* <section className='playlist-centering'>
          <h2 className='playlist-section'>Queue</h2>
          <div>
            <Queue />
          </div>
        </section> */}
        <section className='playlist-centering'>
          <h2 className='playlist-section'>All Songs</h2>
          <div>
            {
              data?.Music.map(song => <SongCard song={song} key={song.ID}/>)
            }
          </div>
        </section>
      </div>
      <ToastContainer/>
    </div>
    </SongContext.Provider>
  );
}

export default App
