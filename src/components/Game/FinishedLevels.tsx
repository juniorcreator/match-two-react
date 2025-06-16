import useGameStore from "../../store/game.ts";

const FinishedLevels = () => {
  console.log("FinishedLevels component render");
  const levels = useGameStore((store) => store.levelData);
  return (
    <div className="mt-10">
      <h1 className="text-white text-xl mb-3">Finished levels:</h1>
      <ul className="text-white max-h-70 overflow-y-auto">
        {levels
          .filter((item) => item.isFinished)
          .map((item, index) => (
            <li className="p-1" key={index}>
              <span>Level: {item.boardLevel + 1}</span>
              <span> Tries: {item.tries}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FinishedLevels;
