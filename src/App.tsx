import "./App.css";
import { useEffect } from "react";
import { fetchEarthquakeData } from "./services/fetchEarthquakeData";
import { useEarthquakeStore } from "./stores/earthquakeStore";
import ChartPane from "./components/ChartPane";
import TablePane from "./components/TablePane";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const setData = useEarthquakeStore((state) => state.setData);

  useEffect(() => {
    fetchEarthquakeData().then((data) => {
      setData(data);
    });
  }, [setData]);

  // access data from store to show data summary
  const data = useEarthquakeStore((state) => state.data);
  if (data.length === 0) {
    return (
      <div className="w-screen h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  const totalRows = data.length;

  const dates = data
    .map((d) => new Date(d.time).getTime())
    .sort((a, b) => a - b);

  const dateRange =
    dates.length >= 2
      ? `${new Date(dates[0]).toLocaleString()} → ${new Date(
          dates[dates.length - 1]
        ).toLocaleString()}`
      : "-";

  const mags = data.map((d) => d.mag).sort((a, b) => a - b);
  const magRange =
    mags.length >= 2 ? `${mags[0]} → ${mags[mags.length - 1]}` : "-";

  return (
    <div className="w-screen min-h-screen bg-primary text-white p-4 border-4">
      <div className="text-3xl font-bold text-white mb-4">
        Earthquake Data Visualization
      </div>

      <div className="bg-white text-black rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-primary">
          Data Summary
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-gray-100 p-3 rounded">
            <div className="text-sm text-gray-600">Total Records</div>
            <div className="text-lg font-bold">{totalRows}</div>
          </div>
          <div className="bg-gray-100 p-3 rounded">
            <div className="text-sm text-gray-600">Date Range</div>
            <div className="text-lg font-bold">{dateRange}</div>
          </div>
          <div className="bg-gray-100 p-3 rounded">
            <div className="text-sm text-gray-600">Magnitude Range</div>
            <div className="text-lg font-bold">{magRange}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[90%]">
        <div className="bg-secondary rounded-xl p-4 overflow-auto">
          <ChartPane />
        </div>
        <div className="bg-secondary rounded-xl p-4 overflow-auto">
          <TablePane />
        </div>
      </div>
    </div>
  );
}

export default App;
