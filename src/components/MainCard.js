// WeatherComponent.js
import React from "react";

const WeatherComponent = ({ weatherData }) => {
  //Utilities
  const capitalize = (word) => {
    const newWord = word[0].toUpperCase() + word.substring(1);
    return newWord;
  };
  let toCelcius = (temperature) => {
    return (temperature - 273.15).toFixed(2);
  };
  const weatherDescription = capitalize(weatherData.weather[0].description);
  const temperature = weatherData.main.temp;
  const feelsLike = weatherData.main.feels_like;
  const humidity = weatherData.main.humidity;
  const windSpeed = weatherData.wind.speed;

  return (
    <>
      <div className="d-flex justify-content-center w-100">
        <div className="d-flex flex-column justify-content-center fs-2">
          <h2 className="text-primary" style={{ fontSize: "70px" }}>
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p>
            <strong>{weatherDescription}</strong>
          </p>
          <p>
            <strong>Temperature:</strong> {toCelcius(temperature)} &deg;C
          </p>
          <p>
            <strong>Feels like:</strong> {toCelcius(feelsLike)} &deg;C
          </p>
          <p>
            <strong>Humidity:</strong> {humidity}%
          </p>
          <p>
            <strong>Wind Speed:</strong> {windSpeed} m/s
          </p>
        </div>
      </div>

      <div className="d-flex justify-content-center w-100 p-6">
        <img
          src={"./images/" + weatherData.weather[0].main + ".png"}
          alt="Loading..."
          style={{ width: "400px", height: "400px" }}
        />
      </div>
    </>
  );
};

export default WeatherComponent;
