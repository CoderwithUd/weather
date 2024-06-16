import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search';
import WeatherDisplay from './components/WeatherDisplay';
import Favorites from './components/Favorites';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const API_KEY = '782cd4a7e495e52cdfa99a375983e1e3';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit

  useEffect(() => {
    const lastSearchedCity = localStorage.getItem('lastSearchedCity');
    if (lastSearchedCity) {
      fetchWeather(lastSearchedCity);
    }
    fetchFavorites();
  }, []);

  
  const fetchWeather = async (city) => {
    try {
      const currentWeatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
      );
  
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
      );
  
      setWeather({
        current: currentWeatherResponse.data,
        forecast: forecastResponse.data,
      });
  
      localStorage.setItem('lastSearchedCity', city);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
  
  const fetchFavorites = async () => {
    try {
      const response = await axios.get('http://localhost:5000/favorites');
      setFavorites(response.data);
    } catch (error) {
      console.error('Error fetching favorite cities:', error);
    }
  };

  const addFavorite = async (city) => {
    try {
      const response = await axios.post('http://localhost:5000/favorites', { name: city });
      setFavorites([...favorites, response.data]);
    } catch (error) {
      console.error('Error adding favorite city:', error);
    }
  };

  const removeFavorite = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/favorites/${id}`);
      setFavorites(favorites.filter((city) => city.id !== id));
    } catch (error) {
      console.error('Error removing favorite city:', error);
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <div className="app container">
      <header className="row">
        <div className="col">
          <h1>Weather Dashboard</h1>
        </div>
        <div className="col text-end">
          <button className="btn btn-primary" onClick={toggleUnit}>
            Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
          </button>
        </div>
      </header>
      <main className="row">
        <div className="col-md-8">
          <Search onSearch={fetchWeather} />
          <WeatherDisplay weather={weather} />
        </div>
        <div className="col-md-4">
          <Favorites
            favorites={favorites}
            onRemove={removeFavorite} 
            onSelectFavorite={fetchWeather}
          />
          {weather && (
            <button className="btn btn-success" onClick={() => addFavorite(weather.current.name)}>
              Add to Favorites
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
