import { CiSearch } from "react-icons/ci";
import "./Weather.css";
import { useState } from "react";
const WeatherCard = () => {
  let [getClickVal, setClickval] = useState("");
  let [getDisplayval, setDisplayval] = useState(null);
  let [error, seterror] = useState("");

  const CityThatGet = (e) => {
    setClickval(e.target.value);
  };

  const WeatherApp = (e) => {
    e = getClickVal;

    fetch(
      `http://api.weatherapi.com/v1/current.json?key=32452be99bf94ea8be9153204242707&q=${e}&aqi=no`
    )
      .then((w1) => {
        console.log(w1.status);
        if (!w1.ok) {
          throw new error("Failed to fetch data");
        }
        return w1.json();
      })
      .then((w2) => {
        console.log(w2);
        setDisplayval(w2);
        seterror(null);
      })
      .catch(() => {
        console.log("Error");
        seterror("ERROR TO GET DATA/CITY IS NOT ENTERED 🤨");
        setDisplayval(null);
      });
  };

  return (
    <>
      <div className={`card`}>
        <div className="card-body">
          <h1 className="card-heading display-1 text-center text-light">
            WEATHER CARD
          </h1>
          {error && (
            <p className="errormessage">
              {error}
            </p>
          )}
          <div className="inputfromUser">
            <input
              type="search"
              name=""
              id=""
              className="form-control input1"
              placeholder="Enter the City"
              onChange={(e) => CityThatGet(e)}
            />
            <CiSearch className="Search" onClick={(city) => WeatherApp(city)} />
          </div>
          {getDisplayval && (
            <>
              <div className="card-title text-center">
                {getDisplayval.location.name}
              </div>
              <div className="card-subtitle mb-2 text-dark text-center">
                {getDisplayval.location.country}
              </div>
              <div className="card-title text-center">
                {getDisplayval.location.localtime}
              </div>
              <img
                src={getDisplayval.current.condition.icon}
                alt="Weather Img"
                className=""
                id="weather-img"
              />
              <div className="Weather-Info">
                <p>
                  {getDisplayval.current.temp_c} C /{" "}
                  {getDisplayval.current.temp_f} F
                </p>
                <p>{getDisplayval.current.humidity}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default WeatherCard;
