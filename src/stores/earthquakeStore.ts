import { create } from "zustand";
import { Earthquake } from "../types/Earthquake";
import { fetchEarthquakeData } from "../services/fetchEarthquakeData";

type EarthquakeStore = {
  data: Earthquake[];
  fetchAndStoreData: () => Promise<void>;
};

// create useEarthquakeStore to store all csv data(100 rows)
export const useEarthquakeStore = create<EarthquakeStore>((set) => ({
  data: [],
  fetchAndStoreData: async () => {
    try {
      const data = await fetchEarthquakeData(); // call the service
      set({ data }); // update the store
    } catch (err) {
      console.error("Failed to fetch earthquake data:", err);
    }
  },
}));
