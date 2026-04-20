function UnitToggle({ unit, setUnit }) {
  return (
    <div className="flex justify-center gap-4 mt-4">
      <button
        onClick={() => setUnit("C")}
        className={`px-3 py-1 rounded-lg ${
          unit === "C" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        °C
      </button>

      <button
        onClick={() => setUnit("F")}
        className={`px-3 py-1 rounded-lg ${
          unit === "F" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        °F
      </button>
    </div>
  );
}

export default UnitToggle;