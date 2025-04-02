export type Earthquake = {
  id: string;
  time: string;
  place: string;
  mag: number;
  depth: number;
  latitude: number;
  longitude: number;
  dmin?: number;
  [key: string]: unknown;
};
