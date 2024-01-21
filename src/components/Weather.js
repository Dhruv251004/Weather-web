import React from "react";
import WeatherComponent from "./MainCard";

export default function Weather(props) {
  let { weatherData } = props;
  return (
    <div className="h-90" style={{ marginTop: "90px" }}>
      {
        <div className="d-flex justify-content-sm-evenly h-100">
          <WeatherComponent weatherData={weatherData} />
        </div>
      }
    </div>
  );
}
