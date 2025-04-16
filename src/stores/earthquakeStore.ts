import { create } from "zustand";
import { Earthquake } from "../types/Earthquake";
import { fetchEarthquakeData } from "../services/fetchEarthquakeData";

type EarthquakeStore = {
  data: Earthquake[];
  fetchAndStoreData: () => Promise<void>;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  rowsPerPage: number;
};

export const useEarthquakeStore = create<EarthquakeStore>((set) => ({
  data: [],
  currentPage: 1,
  rowsPerPage: 100,
  setCurrentPage: (page) => set({ currentPage: page }),
  fetchAndStoreData: async () => {
    try {
      const data = await fetchEarthquakeData();
      set({ data });
    } catch (err) {
      console.error("Failed to fetch earthquake data:", err);
    }
  },
}));
