import { useState } from "react";
import { useEarthquakeStore } from "../stores/earthquakeStore";
import SelectedQuakeCard from "./SelectedQuakeCard";
import { useHighlight } from "../contexts/HighlightContext";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// numeric fields array for dropdown selection
const numericOptions = ["mag", "depth", "latitude", "longitude"];

function ChartPane() {
  const [xField, setXField] = useState("mag");
  const [yField, setYField] = useState("depth");

  // Get data from global Zustand store
  const data = useEarthquakeStore((state) => state.data);
  const { highlightedId, setHighlightedId } = useHighlight();
  const selectedQuake = data.find((d) => d.id === highlightedId);
  if (selectedQuake) {
    console.log("Highlighted Point on Chart:", selectedQuake);
  }

  // Helper function to calculate axis domain
  const getDomainData = (field: string): [number, number] => {
    const values = data.map((d) => Number(d[field])).filter((v) => !isNaN(v));
    if (values.length === 0) return [0, 1];

    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = (max - min) * 0.1 || 1;

    return [min - padding, max + padding];
  };
  const xDomain = getDomainData(xField);
  const yDomain = getDomainData(yField);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderCustomPoint = (props: any) => {
    const { cx, cy, payload } = props;

    const isSelected = payload.id === highlightedId;
    const radius = payload.mag ? payload.mag * 2 : 5;

    return (
      <circle
        cx={cx}
        cy={cy}
        r={isSelected ? radius + 2 : radius}
        fill={isSelected ? "red" : "#00D852"}
        className={isSelected ? "blinking" : ""}
        stroke="#fff"
        strokeWidth={1}
        onMouseOver={() => setHighlightedId(payload.id)}
      />
    );
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-white">
        Earthquake Scatter Plot
      </h2>

      {/* dropdowns for selecting plot axis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-100 p-2 rounded">
          <label className="block text-sm text-gray-700 mb-2">X-Axis</label>
          <select
            className="w-full p-2 rounded bg-white text-black shadow-sm"
            value={xField}
            onChange={(e) => setXField(e.target.value)}
          >
            {numericOptions.map((option) => (
              <option key={option} value={option}>
                {option.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-gray-100 p-2 rounded">
          <label className="block text-sm text-gray-700 mb-2">Y-Axis</label>
          <select
            className="w-full p-2 rounded bg-white text-black shadow-sm"
            value={yField}
            onChange={(e) => setYField(e.target.value)}
          >
            {numericOptions.map((option) => (
              <option key={option} value={option}>
                {option.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chart Area */}
      <div className="h-[500px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#ccc" />
            <XAxis
              dataKey={xField}
              name={xField.toUpperCase()}
              type="number"
              stroke="#ffffff"
              label={{
                value: xField,
                position: "bottom",
                offset: 0,
                fill: "#ffffff",
                fontSize: 14,
                fontWeight: "bold",
              }}
              domain={xDomain}
            />
            <YAxis
              dataKey={yField}
              name={yField.toUpperCase()}
              type="number"
              stroke="#ffffff"
              label={{
                value: yField,
                angle: -90,
                position: "left",
                offset: 0,
                fill: "#ffffff",
                fontSize: 14,
                fontWeight: "bold",
              }}
              domain={yDomain}
            />

            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={({ payload }) => {
                if (payload && payload.length > 0) {
                  const quake = payload[0].payload;
                  return (
                    <div className="bg-white text-black text-sm p-2 rounded shadow">
                      <div>
                        <strong>Place:</strong> {quake.place}
                      </div>
                      <div>
                        <strong>Mag:</strong> {quake.mag}
                      </div>
                      <div>
                        <strong>Depth:</strong> {quake.depth} km
                      </div>
                      <div>
                        <strong>Time:</strong> {quake.time}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Scatter
              name="Earthquakes"
              data={data}
              fill="#00D852"
              shape={renderCustomPoint}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      {selectedQuake && <SelectedQuakeCard quake={selectedQuake} />}
    </div>
  );
}

export default ChartPane;
