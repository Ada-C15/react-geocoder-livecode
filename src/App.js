import React from 'react';
import logo from './logo.svg';
import LOCATIONIQ_API_KEY from './secrets.js'
import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({lat: null, lon: null});
  const [error, setError] = useState("");

  const updateSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    axios.get(`https://us1.locationiq.com/v1/search.php?key=${LOCATIONIQ_API_KEY}&q=${searchTerm}&format=json`)
    .then((response) => {
      // setSearchResults({lat: response.data[0].lat, lon: response.data[0].lon});
      console.log(response);
    })
    .catch((error) => {
      setError(error.response.data.error);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Get Longitude and Latitude</h1>
          <form onSubmit={onFormSubmit}>
            <label htmlFor="Location Name: " />
            <input type="text" value={searchTerm} onChange={updateSearchTerm} />
            <input type="submit" value="Search Now!" />
          </form>
          <h2>Results for {searchTerm}:</h2>
          <ul>
            <li>Latitude: {searchResults.lat}</li>
            <li>Longitude: {searchResults.lon}</li>
        </ul>
      </header>
    </div>
  );
}

export default App;
