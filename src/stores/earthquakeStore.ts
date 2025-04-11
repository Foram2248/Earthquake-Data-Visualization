import { create } from "zustand";
import { Earthquake } from "../types/Earthquake";

type EarthquakeStore = {
  data: Earthquake[];
  setData: (data: Earthquake[]) => void;
};

// create useEarthquakeStore to store all csv data(100 rows)
export const useEarthquakeStore = create<EarthquakeStore>((set) => ({
  data: [],
  setData: (data) => set({ data }),
}));
