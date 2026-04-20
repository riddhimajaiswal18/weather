import { useState, useEffect } from "react";

function WeatherSearch({ setWeather }) {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastCities, setLastCities] = useState([]);

  const API_KEY = "f40ea658d1d5f927d9aa86ec73e9e103"; // 

  useEffect(() => {
    let saved = JSON.parse(localStorage.getItem("cities")) || [];
    setLastCities(saved);
  }, []);

  async function getWeather() {
    if (!city) return;

    try {
      setLoading(true);
      setError("");

      let res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      let data = await res.json();

      if (data.cod !== 200) {
        throw new Error("City not found");
      }

      setWeather(data);

      // save last searches
      let updated = [city, ...lastCities.filter(c => c !== city)].slice(0, 5);
      setLastCities(updated);
      localStorage.setItem("cities", JSON.stringify(updated));

    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false); //use of set loading
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && getWeather()}
          className="px-4 py-2 rounded-xl text-black outline-none"
        />

        <button
          onClick={getWeather}
          className="bg-blue-500 px-4 py-2 rounded-xl hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Error */}
      {error && <p className="text-red-400">{error}</p>}

      {/* Last searched */}
      <div className="flex gap-2 flex-wrap justify-center">
        {lastCities.map((c, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCity(c);
            }}
            className="bg-gray-700 px-3 py-1 rounded-lg text-sm hover:bg-gray-600"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

export default WeatherSearch;