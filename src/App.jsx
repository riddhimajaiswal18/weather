import { useState } from "react";

export default function App() {
  const [city, setCity] = useState("");
  const [cityData, setCityData] = useState(null);

  const [screen, setScreen] = useState("default");
  const [isCelsius, setIsCelsius] = useState(true);

  const [history, setHistory] = useState([]);

  const [tempC, setTempC] = useState(27);
  const [feelsC, setFeelsC] = useState(29);

  const temp = isCelsius ? tempC : Math.round((tempC * 9) / 5 + 32);
  const feels = isCelsius ? feelsC : Math.round((feelsC * 9) / 5 + 32);
  const unit = isCelsius ? "°C" : "°F";

  const API_KEY = "f40ea658d1d5f927d9aa86ec73e9e103"; 

 const handleSearch = async (searchCity = city) => {
  if (!searchCity.trim()) return;

  setScreen("loading");

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`
    );

    const data = await res.json();

    console.log("API RESPONSE:", data);

    if (Number(data.cod) !== 200) {
      setScreen("error");
      return;
    }

    setTempC(data.main.temp);
    setFeelsC(data.main.feels_like);

    setCityData(data);

    setScreen("result");

    setHistory((prev) => {
      const updated = prev.filter(
        (c) => c.toLowerCase() !== searchCity.toLowerCase()
      );
      return [searchCity, ...updated].slice(0, 5);
    });

  } catch (err) {
    console.log("ERROR:", err);
    setScreen("error");
  }
};

  const removeCity = (cityToRemove) => {
    setHistory((prev) =>
      prev.filter((c) => c !== cityToRemove)
    );
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex justify-center p-6">
      <div className="w-full max-w-xl space-y-5">

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-blue-400 font-mono tracking-widest text-sm">
            ☁ SKYCHECKER
          </h1>
          <p className="text-gray-400 text-xs">
            Real-time weather for any city
          </p>
        </div>

        {/* SEARCH */}
        <div className="flex bg-white/10 border border-white/20 rounded-xl p-2">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search for a city..."
            className="flex-1 bg-transparent outline-none px-3 text-sm"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={() => handleSearch()}
            className="bg-blue-400 text-black px-4 rounded-lg text-sm font-semibold"
          >
            Search
          </button>
        </div>

        {/* UNIT TOGGLE */}
        <div className="flex justify-end items-center gap-2">
          <span className="text-gray-400 text-xs">Unit:</span>
          <div className="flex bg-white/10 border border-white/20 rounded-full overflow-hidden">
            <button
              onClick={() => setIsCelsius(true)}
              className={`px-3 py-1 text-xs font-mono ${
                isCelsius ? "bg-blue-400 text-black" : "text-gray-400"
              }`}
            >
              °C
            </button>
            <button
              onClick={() => setIsCelsius(false)}
              className={`px-3 py-1 text-xs font-mono ${
                !isCelsius ? "bg-blue-400 text-black" : "text-gray-400"
              }`}
            >
              °F
            </button>
          </div>
        </div>

        {/* STATES */}

        {screen === "default" && (
          <div className="bg-white/10 border border-white/20 rounded-2xl p-10 text-center">
            🔍 Search for a city
          </div>
        )}

        {screen === "loading" && (
          <div className="bg-white/10 border border-white/20 rounded-2xl p-10 text-center">
            <div className="flex justify-center gap-2 mb-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></div>
            </div>
            Fetching weather...
          </div>
        )}

        {screen === "error" && (
          <div className="bg-white/10 border border-white/20 rounded-2xl p-10 text-center">
            ⚠ City not found
          </div>
        )}

        {screen === "result" && (
          <div className="bg-gradient-to-br from-blue-400/20 to-purple-400/10 border border-white/20 rounded-2xl p-6">

            <div className="flex justify-between mb-4">
              <div>
                <h2 className="font-mono text-xl">
                  {cityData?.name}
                </h2>
              </div>
              <div className="text-3xl">⛅</div>
            </div>

            <div className="flex items-start gap-2 mb-4">
              <h1 className="text-5xl font-mono">{temp}</h1>
              <span className="text-blue-400 font-mono">{unit}</span>
            </div>

            <div className="bg-blue-400/20 border border-blue-400/30 inline-block px-3 py-1 rounded-full text-xs mb-4">
              Partly Cloudy
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-white/10 p-2 rounded">72%</div>
              <div className="bg-white/10 p-2 rounded">14 km/h</div>
              <div className="bg-white/10 p-2 rounded">8 km</div>
            </div>

            <div className="flex justify-between mt-3 text-xs text-gray-400">
              <span>Feels like</span>
              <span className="font-mono text-white">
                {feels}{unit}
              </span>
            </div>
          </div>
        )}

        {/*SEARCH HISTORY */}
        {history.length > 0 && (
          <div>
            <p className="text-gray-400 text-xs mb-2 tracking-widest">
              RECENT SEARCHES
            </p>

            <div className="flex flex-wrap gap-2">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full cursor-pointer hover:border-blue-400"
                  onClick={() => {
                    setCity(item);
                    handleSearch(item);
                  }}
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  {item}
                  <span
                    className="text-gray-400 text-xs cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCity(item);
                    }}
                  >
                    ✕
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}