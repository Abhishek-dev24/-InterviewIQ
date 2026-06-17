// src/components/ProgressBar.jsx

const ProgressBar = ({ current, total = 10 }) => {
  const progress = (current / total) * 100;

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between mb-2 text-sm">
        <span>Progress</span>
        <span>{current}/{total}</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-green-500 h-3 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;