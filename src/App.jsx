import React from 'react'
import "./App.css"
import { GET_ALL_SONGS } from './utils/queries'
import { useQuery } from "@apollo/client"
import ReactPlayer from 'react-player'

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
    {data?.Music.map((item)=>{
      return <div key={item.ID}>
        <p>{item.Artist}</p>
        <img src={item.Thumbnail} width='60px'alt={item.Artist}/>
        <p>{item.Title}</p>
        <ReactPlayer url={item.URL} controls />
      </div>
    })}
    </div>
  );
}

export default App
