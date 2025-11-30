import { useEffect, useState } from "react";

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const apiKey = "a2d5548c2313ba1d6c8aa73339a68dc3";

  const searchWeather = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod === "404") {
      alert("Mesto neexistuje!");
      return;
    }
    setWeatherData(data);
  };

  useEffect(() => {
    if (!city) return;
    searchWeather();
    setSearchValue("");
  }, [city]);

  const search = () => {
    setCity(searchValue);
  };

  const enterKey = (event) => {
    if (event.key === "Enter") search();
  };

  return (
    <section className="page">
      <div className="weather-app">
        <div className="blur">
          <div className="weather-search">
            <input
              className="weather-search-input"
              type="text"
              placeholder="Vyber mesto"
              onChange={(event) => {
                setSearchValue(event.target.value);
              }}
              value={searchValue}
              onKeyDown={enterKey}
            />
            <input
              className="weather-search-btn"
              type="submit"
              value={"Vyhledat"}
              onClick={() => {
                searchValue ? search() : alert("Mesto neni vyplneno!");
              }}
            />
          </div>
          {weatherData.main && (
            <div className="weather-info-top">
              <h2 className="weather-title">{weatherData.name}</h2>
              <p className="weather-temp">
                {Math.round(weatherData.main.temp)}
                <span>°C</span>
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt=""
                className="weather-img"
              />
              <p className="weather-desc">
                {weatherData.weather[0].description}
              </p>
            </div>
          )}

          {weatherData.main && (
            <div className="weather-info-bottom">
              <p className="weather-wind">Vitr: {weatherData.wind.speed}km/h</p>
              <p className="weather-humidity">
                Vlhkost: {weatherData.main.humidity}%
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default App;
