import React, { useState } from 'react';
import axios from 'axios';

const Search = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = async () => {
    try {
      await onSearch(city);
      setCity('');
    } catch (error) {
      console.error('Error searching for city weather:', error);
     
    }
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Search;
