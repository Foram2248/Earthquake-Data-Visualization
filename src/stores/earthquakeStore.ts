import { create } from "zustand";
import { Earthquake } from "../types/Earthquake";

type EarthquakeStore = {
  data: Earthquake[];
  highlightedId: string | null;
  setData: (data: Earthquake[]) => void;
  setHighlightedId: (id: string | null) => void;
};

// create useEarthquakeStore to store all csv data(100 rows)
export const useEarthquakeStore = create<EarthquakeStore>((set) => ({
  data: [],
  highlightedId: null,
  setData: (data) => set({ data }),
  setHighlightedId: (id) => set({ highlightedId: id }),
}));
