import React, { useState, useEffect } from "react";
import WeatherInfo from "./WeatherInfo"; // Child Component
import "./App.css";

const App = () => {
  const [city, setCity] = useState("Toronto"); // State to store user input
  const [weatherData, setWeatherData] = useState(null); // State to store API data
  const [loading, setLoading] = useState(false); // State to manage loading
  const [error, setError] = useState(""); // State to manage errors

  const API_KEY = "d90cf6b1b2cf8a509907c86620b29efc";

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d90cf6b1b2cf8a509907c86620b29efc&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found. Please enter a valid city name.");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) fetchWeather(city.trim());
  };

  return (
    <div className="App">
      <div className="search-container">
        <h1>Weather App</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="city-input"
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>
      </div>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : weatherData ? (
        <WeatherInfo weatherData={weatherData} />
      ) : (
        <p className="message">Enter a city to get weather details</p>
      )}
    </div>
  );
};

export default App;

