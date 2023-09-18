import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      setLoading(true);
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          setData({});
          setLoading(false);
          alert("Location not found. Please try again.");
        })
        .finally(() => {
          setLoading(false);
        });
      setLocation("");
    }
  };

  const getIconUrl = (icon) => `http://openweathermap.org/img/wn/${icon}.png`;

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        {loading && <div className="loading">Loading...</div>}{" "}
        {/* Loading indicator */}
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
            {data.weather && data.weather[0].icon && (
              <img
                src={getIconUrl(data.weather[0].icon)}
                alt={data.weather[0].main}
              />
            )}
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
          <div className="date-time">
            {data.dt && (
              <p>
                {new Date(data.dt * 1000).toLocaleDateString()}{" "}
                {new Date(data.dt * 1000).toLocaleTimeString()}
              </p>
            )}
          </div>
          <div className="sunrise-sunset">
            {data.sys && data.sys.sunrise && data.sys.sunset && (
              <p>
                Sunrise:{" "}
                {new Date(data.sys.sunrise * 1000).toLocaleTimeString()} |
                Sunset: {new Date(data.sys.sunset * 1000).toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>
        {data.name !== undefined && !loading && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
