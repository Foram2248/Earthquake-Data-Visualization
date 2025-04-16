import "./App.css";
import { useEffect } from "react";
import { useEarthquakeStore } from "./stores/earthquakeStore";
import ChartPane from "./components/ChartPane";
import TablePane from "./components/TablePane";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const fetchAndStoreData = useEarthquakeStore(
    (state) => state.fetchAndStoreData
  );

  useEffect(() => {
    fetchAndStoreData();
  }, [fetchAndStoreData]);

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

  const mags = data.map((d) => d.mag).sort((a, b) => a - b);
  const magRange =
    mags.length >= 2 ? `${mags[0]} → ${mags[mags.length - 1]}` : "-";

  return (
    <div className="w-screen h-screen flex flex-col bg-primary text-white p-4 border-4 overflow-hidden">
      <div className="text-3xl font-bold text-white mb-4">
        Earthquake Data Visualization
      </div>

      <div className="bg-white text-black rounded-lg shadow p-3 mb-3">
        <h2 className="text-base font-semibold mb-4 text-primary">
          Data Summary
        </h2>
        <div className="flex justify-center gap-6 flex-wrap text-center">
          <div className="bg-gray-100 p-3 rounded w-[200px]">
            <div className="text-sm text-gray-600">Total Records</div>
            <div className="text-base font-bold">{totalRows}</div>
          </div>
          <div className="bg-gray-100 p-3 rounded w-[200px]">
            <div className="text-sm text-gray-600">Magnitude Range</div>
            <div className="text-base font-bold">{magRange}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow h-[calc(100vh-16rem)]">
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
