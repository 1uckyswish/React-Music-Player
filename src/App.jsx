import React from 'react'
import "./App.css"
import { GET_ALL_SONGS } from './utils/queries'
import { useQuery } from "@apollo/client"

function App() {
  const { data, loading, error } = useQuery(GET_ALL_SONGS);

  if (loading) {
    console.log("Loading...");
  }

  if (error) {
    console.error("Error fetching data:", error);
  }

  console.log(data);

  return (
    <div>
      Hello worldwide
    </div>
  );
}

export default App
