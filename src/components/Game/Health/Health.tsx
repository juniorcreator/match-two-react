import { memo } from "react";
import "./Health.scss";
import useGameStore from "@/store/game.ts";
import { useShallow } from "zustand/react/shallow";

const Health = () => {
  console.log("Health component render");
  const health = useGameStore(useShallow((state) => state.health));

  return (
    <div className="text-white m-2 flex items-center">
      {health > 0 ? (
        <ul className="flex items-center">
          {Array(health)
            .fill("❤️")
            .map((item, i) => (
              <li className="p-1 text-xl" key={i}>
                {item}
              </li>
            ))}
        </ul>
      ) : (
        0
      )}
    </div>
  );
};

export default memo(Health);
