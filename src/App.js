import React, { useState, useEffect } from 'react';
import axios from 'axios';
// const axios = require('axios');
import FindCityForm from './components/FindCityForm';
import { LOCATIONIQ_API_KEY } from './secrets.js'
import './App.css';

const URL = 'https://us1.locationiq.com/v1/search.php';

function App () {
  const [location, setLocation] = useState({
    lon: '',
    lat: '',
  });

  const [errors, setErrors] = useState(null);

  const getLocation = (city) => {
    axios.get(`${ URL }?key=${ LOCATIONIQ_API_KEY }&q=${ city }&format=json`)
      .then((response) => {
        // console.log(response.data);
        setLocation({
          lat: response.data[0].lat,
          lon: response.data[0].lon,
        });
      })
      .catch((error) => {
        console.log(error.response.data);
        setErrors(error.response.data.error);
      });
  }

  useEffect(() => {
    getLocation('Seattle');
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <div>
          <ul>
            <li>Lat: {location.lat}</li>
            <li>Lon: {location.lon}</li>
          </ul>
        </div>
        <div>
          {errors ? <h2>{errors}</h2> : '' }
        </div>
        <div>
          <FindCityForm onSubmitCallback={getLocation} />
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
