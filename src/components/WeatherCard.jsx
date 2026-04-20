import UnitToggle from "../UnitToggle";

function WeatherCard({ weather, unit, setUnit }) {
  if (!weather) {
    return (
      <p className="mt-6 text-gray-400">
        Search for a city to see weather 🌍
      </p>
    );
  }

  const tempC = weather.main.temp;
  const tempF = (tempC * 9) / 5 + 32;

  return (
    <div className="mt-6 bg-white text-black p-6 rounded-2xl shadow-lg w-72 text-center">
      
      <h2 className="text-xl font-bold">{weather.name}</h2>

      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather icon"
        className="mx-auto"
      />

      <p className="text-3xl font-semibold">
        {unit === "C" ? `${tempC} °C` : `${tempF.toFixed(1)} °F`}
      </p>

      <p className="capitalize">{weather.weather[0].description}</p>

      <UnitToggle unit={unit} setUnit={setUnit} />
    </div>
  );
}

export default WeatherCard;