import React from "react";
import "./WeatherInfo.css";

const WeatherInfo = ({ weatherData }) => {
  const {
    name,
    sys: { country },
    main: { temp, feels_like, humidity },
    weather,
    wind: { speed },
  } = weatherData;

  const weatherIcon = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div className="weather-container">
      {/* Current Weather Section */}
      <div className="current-weather">
        <div className="date-info">
          <p className="day">Friday</p>
          <p className="date">18 Nov 2022</p>
          <p className="location">
            {name} - {country}
          </p>
        </div>
        <div className="temp-info">
          <img src={weatherIcon} alt="weather-icon" />
          <p className="temperature">{Math.round(temp)}°C</p>
          <p className="description">{weather[0].main}</p>
        </div>
      </div>

      {/* Extended Weather Details */}
      <div className="weather-details">
        <div className="extended-info">
          <p>Feels Like: {Math.round(feels_like)}°C</p>
          <p>Humidity: {humidity}%</p>
          <p>Wind: {speed} km/h</p>
        </div>
        
      </div>
    </div>
  );
};

export default WeatherInfo;
