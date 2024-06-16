import React from 'react';

const WeatherDisplay = ({ weather }) => {
  if (!weather) return null;

  const { current, forecast } = weather;

  const getIconUrl = (icon) => `http://openweathermap.org/img/wn/${icon}.png`;

  return (
    <div className="weather-display card">
      <h2 className="card-header">Current Weather in {current.name}</h2>
      <div className="card-body">
        <p className="card-text">Temperature: {current.main.temp}°C</p>
        <p className="card-text">Condition: {current.weather[0].description}</p>
        <img src={getIconUrl(current.weather[0].icon)} alt="Weather Icon" />
      </div>

      <h3 className="card-header">5-Day Forecast</h3>
      <div className="card-body">
        <div className="row">
          {forecast.list.map((item, index) => (
            <div key={index} className="col-md-2 forecast-item">
              <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
              <p>Temp: {item.main.temp}°C</p>
              <p>{item.weather[0].description}</p>
              <img src={getIconUrl(item.weather[0].icon)} alt="Weather Icon" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
