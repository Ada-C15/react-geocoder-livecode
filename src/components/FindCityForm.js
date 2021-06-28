import React, { useState } from 'react';

const FindCityForm = (props) => {
  const [city, setCity] = useState('');

  const onInputChange = (event) => {
    console.log(event);
    console.log(event.target.name);
    setCity(event.target.value);
  }

  const onSubmit = (event) => {
    // Prevent the browser submitting form
    // and reloading the page
    event.preventDefault();
    // POST 'localhost:3000'

    if (city !== '') {
      props.onSubmitCallback(city);
    }
  }

  return (
    <form onSubmit={onSubmit} >
      <label htmlFor="city-input"  >City</label>
      <input name="city-input" id="city-input" value={city} onChange={onInputChange} />
      <button>Search Now!</button>
      <input type="submit" />
    </form>
  )
}

export default FindCityForm;