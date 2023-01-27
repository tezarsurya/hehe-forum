const TransitionLoading = () => {
  return (
    <div className="absolute inset-0 grid min-h-screen w-full place-items-center bg-gray-300/20 text-lg">
      <span className="animate-bounce text-gray-700">Loading...</span>
    </div>
  );
};

export default TransitionLoading;
