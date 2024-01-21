import React, { useState } from "react";
import Weather from "./Weather";
import Search from "./Search";
import LoadingBar from "react-top-loading-bar";
import ErrorComp from "./ErrorComp";
const API_KEY = "f768f4791e268965ed3933e384c871d7";

export default function Topbar() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(0);

  const capitalize = (word) => {
    const newWord = word[0].toUpperCase() + word.substring(1);
    return newWord;
  };

  const fetchWeatherData = async (city) => {
    try {
      const { lat, lon } = await getCordinates(city);
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
      setError(false);
      setProgress(100);
      const resp = await fetch(url);
      const data = await resp.json();
      data.name = capitalize(city);
      setWeatherData(data);
    } catch (error) {
      setError(true);
    }
  };

  const getCordinates = async (city) => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`;
    const resp = await fetch(url);
    const data = await resp.json();
    setProgress(progress + 10);
    if (!data || data.length === 0) {
      setProgress(100);
      throw new error("Could not find");
    }
    return {
      lat: data[0].lat,
      lon: data[0].lon,
    };
  };

  const handleSearch = () => {
    setWeatherData(null);
    let cityToSearch = document.getElementById("city").value;
    fetchWeatherData(cityToSearch);
  };

  return (
    <>
      <div>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            borderBottom: "0.3px solid #0000002e",
            backgroundColor: "#35b0fa",
            boxShadow: "0px 0.1px 0px rgba(200,200,200,1)",
          }}
        >
          <img
            src="./images/logo.png"
            alt="Loading..."
            style={{
              height: "100px",
              width: "6.8vw",
              minWidth: "90px",
              position: "absolute",
              left: "25px",
            }}
          />
          <div
            className="input-group input-group-lg"
            style={{ width: "50%", margin: "40px 0px" }}
          >
            <label
              htmlFor="city"
              className="input-group-text"
              id="inputGroup-sizing-lg"
              style={{ backgroundColor: "#8f22ff", color: "white", border: 0 }}
            >
              Search your city
            </label>
            <input
              style={{ minWidth: "120px", border: 0 }}
              id="city"
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-lg"
            />
            <button
              type="button"
              className="btn btn-primary"
              style={{ backgroundColor: "#8f22ff" }}
              onClick={() => {
                handleSearch();
                setProgress(progress + 10);
              }}
            >
              Search
            </button>
          </div>
        </div>
        <div>
          <LoadingBar
            color="#f11946"
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
        </div>
      </div>
      <div>
        {error ? (
          <ErrorComp />
        ) : weatherData ? (
          <Weather weatherData={weatherData} />
        ) : (
          <Search />
        )}
      </div>
    </>
  );
}
