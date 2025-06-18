import useGameStore from "../../store/game.ts";

const FinishedLevels = () => {
  const levels = useGameStore((store) => store.levelData).filter(
    (item) => item.isFinished,
  );

  return (
    <div className="mt-10 px-4">
      <h1 className="text-white text-2xl font-bold mb-6 text-center">
        🎉 Finished Levels
      </h1>
      <ul className="space-y-4 max-h-[400px] overflow-y-auto">
        {levels.map((item, index) => (
          <li
            key={index}
            className="bg-gradient-to-r from-purple-400 to-indigo-500 rounded-2xl shadow-lg p-2 text-white transition-transform"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold">
                🧩 Level {item.boardLevel + 1}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-200">Tries:</span> {item.tries}
              </div>
              <div>
                <span className="text-gray-200">Lvl time:</span>{" "}
                {item.time.currentTime}
              </div>
              <div>
                <span className="text-gray-200">Passed In:</span>{" "}
                {item.time.passedIn}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinishedLevels;
