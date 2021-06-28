import React, { useState } from 'react';


const LocationForm = (props) => {
  const [city, setCity] = useState('');
  const onInputChange = (event) => {
    event.preventDefault();

    setCity(event.target.value);
  }

  const onSubmit = (event) => {
    event.preventDefault();

    if (city) {
      props.onSubmitHandler(city);
      setCity('');
    }
  }

  return (
    <form onSubmit={onSubmit} name="cityForm" className="cityForm">
      <label htmlFor="cityname">City Name</label>
      <input onChange={onInputChange} value={city} name="cityname" id="cityname" />
      <button>Search</button>
    </form>
  );
}

export default LocationForm