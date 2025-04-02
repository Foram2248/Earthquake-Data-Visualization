export type Earthquake = {
  id: string;
  time: string;
  place: string;
  mag: number;
  depth: number;
  latitude: number;
  longitude: number;
  [key: string]: unknown;
};
