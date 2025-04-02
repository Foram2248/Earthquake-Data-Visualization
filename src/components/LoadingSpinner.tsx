// create spinner to handle Earthquake Data
const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-primary text-white space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-accent"></div>

      <div className="text-lg font-medium text-white">
        Loading Earthquake Data...
      </div>
    </div>
  );
};

export default LoadingSpinner;
