import { formatTime } from "../utils";
import { type RefObject, useCallback } from "react";
import useGameStore from "../store/game.ts";
import { useShallow } from "zustand/react/shallow";

export const useStartLevel = ({
  timers,
  timeLeft,
  initTime,
  secondElementRef,
}: {
  timers: RefObject<any>;
  timeLeft: RefObject<number>;
  initTime: number;
  secondElementRef: RefObject<HTMLDivElement>;
}) => {
  const currentLevel = useGameStore(useShallow((state) => state.currentLevel));
  const health = useGameStore(useShallow((state) => state.health));
  const setTimer = useGameStore(useShallow((state) => state.setTimer));
  const setGameOver = useGameStore(useShallow((state) => state.setGameOver));
  const setIsTimeIsUp = useGameStore(
    useShallow((state) => state.setIsTimeIsUp),
  );
  const setMinusHealth = useGameStore(
    useShallow((state) => state.setMinusHealth),
  );
  const handleLevelFailed = useCallback(() => {
    setMinusHealth();
    if (health > 1) {
      clearInterval(timers.current.timerInterval);
      timeLeft.current = 0;
      secondElementRef.current.textContent = String(
        formatTime(timeLeft.current),
      );

      setIsTimeIsUp(true);
    } else {
      setGameOver();
    }
  }, [health]);

  return useCallback(() => {
    console.log(currentLevel, " store.currentLevel ");
    timeLeft.current = initTime + currentLevel * 15; // Увеличиваем время на каждом уровне

    timers.current.timerInterval = setInterval(() => {
      if (timeLeft.current <= 0) {
        handleLevelFailed();
      } else {
        timeLeft.current = timeLeft.current - 1;
        setTimer(timeLeft.current);

        secondElementRef.current.textContent = String(
          formatTime(timeLeft.current),
        );
      }
    }, 1000);
  }, [currentLevel]);
};
