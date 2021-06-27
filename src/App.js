import React from 'react';
import LOCATIONIQ_API_KEY from './secrets.js';
import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({lat: "no results yet", lon: "no results yet"});
  const [error, setError] = useState(null);

  const updateSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  const callApi = (event) => {
    event.preventDefault();
    axios.get(`https://us1.locationiq.com/v1/search.php?key=${LOCATIONIQ_API_KEY}&q=${searchTerm}&format=json`)
      .then((response) => {
        setSearchResults(response.data[0]);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  let errorJSX;
  if (error != null) {
    errorJSX = (
    <section className="error">
      <h2>Shit! Error!</h2>
      <p>{error}</p>
    </section>);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Get Longitude and Latitude</h1>
        <form onSubmit={callApi}>
          <input type="text" value={searchTerm} onChange={updateSearchTerm} />
          <input type="submit" value="Search Now!" />
        </form>
        <h2>Results for {searchTerm}:</h2>
        <ul>
          <li>Latitude: {searchResults.lat}</li>
          <li>Longitude: {searchResults.lon}</li>
        </ul>
        {errorJSX}
      </header>
    </div>
  );
}

export default App;
