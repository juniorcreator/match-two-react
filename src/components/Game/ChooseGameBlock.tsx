import "./ChooseGameBlock.scss";
import { memo, useEffect, useState } from "react";
import useGameStore from "@/store/game.ts";
import { playMusic } from "@/utils";
import { resetSound } from "@/utils/soundUtils.ts";
import { useShallow } from "zustand/react/shallow";

const songs = playMusic();

const ChooseGameBlock = () => {
  console.log("ChooseGameBlock component render");
  const [elements] = useState([
    {
      name: "emoji",
      example: "🐶🐱🐭🐹",
    },
    {
      name: "numbers",
      example: "1234",
    },
    {
      name: "food",
      example: "🍎🍌🍓🍇",
    },
  ]);

  const setItemContent = useGameStore(
    useShallow((state) => state.setItemContent),
  );
  const selectedContentType = useGameStore(
    useShallow((state) => state.selectedContentType),
  );

  useEffect(() => {
    songs.switch.load();
    songs.switch.volume = 0.4;
  }, []);

  return (
    <div>
      <div className="elements flex flex-col items-center m-2 relative z-10">
        <ul className="p-1 w-32 flex justify-center items-center gap-2">
          {elements.map((item) => (
            <li
              onClick={async () => {
                setItemContent(item.name);
                resetSound(songs.switch);
                songs.switch
                  .play()
                  .catch((err) => console.warn("Playback failed:", err));
              }}
              className={`elements-list text-white p-2 flex flex-col items-center min-w-[100px] border-1 mb-1 rounded-sm text-white px-2 p-1 text-sm cursor-pointer hover:scale-105 transition duration-300 backdrop-blur ${item.name === selectedContentType && "active"}`}
              key={item.name}
            >
              <div>{item.example}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default memo(ChooseGameBlock);
