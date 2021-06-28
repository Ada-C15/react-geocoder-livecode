import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import LocationForm from './components/LocationForm';
import { LOCATIONIQ_API_KEY } from './secrets.js'
import './App.css';

const URL = 'https://us1.locationiq.com/v1/search.php';

function App () {
  const [location, setLocation] = useState({
    lat: '',
    lon: '',
  });

  const [error, setError] = useState(null);

  const getLocation = (city) => {
    axios.get(`${ URL }?key=${ LOCATIONIQ_API_KEY }&q=${city}&format=json`)
      .then((response) => {
        console.log(response.data[0]);
        const newLocation = {
          lat: response.data[0].lat,
          lon: response.data[0].lon,
        }
        setLocation(newLocation);
        setError(null);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  }


  useEffect(() => {
    getLocation('Seattle');
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Get Longitude and Latitude</h1>
        {error ? <h2>{error}</h2> : '' }
        <div>
          <LocationForm onSubmitHandler={getLocation} />
        </div>
        <div>
          <ul>
            <li>Lat: {location.lat}</li>
            <li>Lon: {location.lon}</li>
          </ul>
        </div>
        <p>
          My API key is {LOCATIONIQ_API_KEY} and was loaded from secrets.js!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
