import { type RefObject, useCallback } from "react";
import { shuffleArray } from "@/utils";
import useGameStore from "../store/game";

export const useResetGame = ({
  songs,
  timeLeft,
  initTime,
  setLevels,
  setItems,
}: {
  songs: any;
  timeLeft: RefObject<number>;
  initTime: number;
  setLevels: Function;
  setItems: Function;
}) => {
  const store = useGameStore();

  return useCallback(() => {
    songs.winGame.pause();
    songs.winGame.currentTime = 0;

    store.setIsTimeIsUp(false);
    store.setStartGame(false);
    store.resetCurrentLevel();
    store.setWinGame(false);
    store.setIsFinishedLvl(false);

    timeLeft.current = initTime;

    store.setItemContent(store.selectedContentType);
    store.setHealth(3);
    store.setTimer(15);
    setLevels(store.resetLvlData());
    setItems(
      shuffleArray(
        useGameStore.getState().gameLevels[
          useGameStore.getState().currentLevel
        ],
      ),
    );
  }, [songs, timeLeft, initTime, setLevels, store]);
};
