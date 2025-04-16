import { useEarthquakeStore } from "../stores/earthquakeStore";
import { useHighlight } from "../contexts/HighlightContext";
import { useEffect, useRef, useState } from "react";

const ROWS_PER_PAGE = 100;

function TablePane() {
  const data = useEarthquakeStore((state) => state.data);
  const currentPage = useEarthquakeStore((state) => state.currentPage); // ✅ use global state
  const setCurrentPage = useEarthquakeStore((state) => state.setCurrentPage); // ✅ global updater
  const { highlightedId, setHighlightedId } = useHighlight();
  const rowRefs = useRef<{ [key: string]: HTMLTableRowElement | null }>({});
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;

  const columnNames =
    data.length > 0 ? Object.keys(data[0]).filter((key) => key !== "id") : [];

  useEffect(() => {
    if (highlightedId && rowRefs.current[highlightedId]) {
      rowRefs.current[highlightedId]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [highlightedId]);

  const handleSort = (key: string) => {
    setSortConfig((prev) =>
      prev?.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const valA = a[key] ?? "";
    const valB = b[key] ?? "";

    if (typeof valA === "number" && typeof valB === "number") {
      return direction === "asc" ? valA - valB : valB - valA;
    }

    return direction === "asc"
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  const paginatedData = sortedData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / ROWS_PER_PAGE);

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Earthquake Records
      </h2>
      <div className="flex-1 min-h-0 overflow-auto border-b border-gray-300">
        <table className="min-w-full table-auto border-collapse text-sm">
          <thead className="bg-white text-black sticky top-0 z-10">
            <tr>
              {columnNames.map((col) => (
                <th
                  key={col}
                  onClick={() => handleSort(col)}
                  className="p-2 capitalize cursor-pointer select-none hover:text-primary"
                >
                  <span className="inline-flex items-center gap-1">
                    {col}
                    {sortConfig?.key === col && (
                      <span className="text-xs text-primary font-semibold">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((quake) => (
              <tr
                key={quake.id}
                ref={(el) => {
                  rowRefs.current[quake.id] = el;
                }}
                onClick={() => {
                  setHighlightedId(quake.id);
                  console.log("Selected Earthquake:", quake);
                }}
                className={`transition-colors duration-200 ${
                  highlightedId === quake.id ? "bg-gray-700 text-black" : ""
                } cursor-pointer`}
              >
                {columnNames.map((col) => (
                  <td key={col} className="p-2 text-white">
                    {quake[col] !== undefined &&
                    quake[col] !== null &&
                    quake[col] !== ""
                      ? typeof quake[col] === "number"
                        ? quake[col].toFixed(3)
                        : String(quake[col])
                      : "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-2 text-white text-sm">
        <button
          onClick={() => {
            setCurrentPage(Math.max(currentPage - 1, 1));
            setHighlightedId(null);
          }}
          disabled={currentPage === 1}
          className="bg-gray-300 text-black px-3 py-1 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => {
            setCurrentPage(Math.min(currentPage + 1, totalPages));
            setHighlightedId(null);
          }}
          disabled={currentPage === totalPages}
          className="bg-gray-300 text-black px-3 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TablePane;
