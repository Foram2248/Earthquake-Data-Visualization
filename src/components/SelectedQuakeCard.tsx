import { Earthquake } from "../types/Earthquake";

// used props to handle Earthquake object
type Props = {
  quake: Earthquake;
};

// function to display selected table row of earthquake details
function SelectedQuakeCard({ quake }: Props) {
  return (
    <div className="mt-6 px-6 py-4 bg-white text-black rounded-lg shadow-lg max-w-2xl">
      <h3 className="text-lg font-bold text-primary mb-4">
        Selected Earthquake Details
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm">
        <div>
          <div className="font-semibold text-gray-700 mb-1">Location</div>
          <div>{quake.place}</div>
        </div>

        <div>
          <div className="font-semibold text-gray-700 mb-1">Time</div>
          <div>{new Date(quake.time).toLocaleString()}</div>
        </div>

        <div>
          <div className="font-semibold text-gray-700 mb-1">Coordinates</div>
          <div>
            Latitude: {quake.latitude}, Longitude: {quake.longitude}
          </div>
        </div>
        <div>
          <div className="font-semibold text-gray-700 mb-1">Magnitude</div>
          <div>{quake.mag}</div>
        </div>
        <div>
          <div className="font-semibold text-gray-700 mb-1">Depth</div>
          <div>{quake.depth} km</div>
        </div>
      </div>
    </div>
  );
}

export default SelectedQuakeCard;
