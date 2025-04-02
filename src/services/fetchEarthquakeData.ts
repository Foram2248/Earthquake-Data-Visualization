import Papa from "papaparse";
import { Earthquake } from "../types/Earthquake";

const CSV_URL =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv";

// define a row type for parsed CSV data
type RawRow = Record<string, string>;

export const fetchEarthquakeData = async (): Promise<Earthquake[]> => {
  try {
    const response = await fetch(CSV_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.statusText}`);
    }

    const csvText = await response.text();

    // parse CSV file using PapaParse
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          if (!results.data || !Array.isArray(results.data)) {
            reject(new Error("CSV parse failed or returned invalid format"));
            return;
          }

          const rows = results.data as RawRow[];

          // clean and map the first 100 rows from csv into Earthquake array
          const cleanData: Earthquake[] = rows.slice(0, 100).map((row) => ({
            id: row.id || row.net + row.code || Math.random().toString(),
            time: new Date(row.time).toLocaleString(),
            place: row.place || "Unknown",
            mag: parseFloat(row.mag) || 0,
            depth: parseFloat(row.depth) || 0,
            latitude: parseFloat(row.latitude) || 0,
            longitude: parseFloat(row.longitude) || 0,
            ...row,
          }));

          resolve(cleanData);
        },
        error: (err: { message: string }) => {
          reject(new Error(`CSV parse error: ${err.message}`));
        },
      });
    });
  } catch (error) {
    console.error("Data fetch/parse error:", error);
    throw error;
  }
};
