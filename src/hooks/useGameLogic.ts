import { useCallback, useRef, useState, useEffect } from "react";
import useGameStore from "../store/game.ts";
import { shuffleArray, formatTime, playMusic } from "../utils";
import type { Levels } from "../types";
import { useItemManager } from "./useItemManager.ts";
import { useGameHints } from "./useGameHints.ts";
import { useReplayLevel } from "./useReplayLevel.ts";
import { useResetGame } from "./useResetGame.ts";
import { useStartLevel } from "./useStartLevel.ts";
import { resetSound } from "../utils/soundUtils.ts";
import { useShallow } from "zustand/react/shallow";
const songs = playMusic();

export const useGameLogic = () => {
  const currentLevel = useGameStore(useShallow((state) => state.currentLevel));
  const gameLevels = useGameStore(useShallow((state) => state.gameLevels));
  const levelData = useGameStore(useShallow((state) => state.levelData));
  const maxLevels = useGameStore(useShallow((state) => state.maxLevels));
  const selectedContentType = useGameStore(
    useShallow((state) => state.selectedContentType),
  );
  const setIsFinishedLvl = useGameStore(
    useShallow((state) => state.setIsFinishedLvl),
  );
  const setWinGame = useGameStore(useShallow((state) => state.setWinGame));
  const setTimer = useGameStore(useShallow((state) => state.setTimer));
  const updateCurrentLevel = useGameStore(
    useShallow((state) => state.updateCurrentLevel),
  );
  const setShowNextLevel = useGameStore(
    useShallow((state) => state.setShowNextLevel),
  );

  const timers = useRef<{ [key: string]: ReturnType<typeof setTimeout> }>({});
  const secondElementRef = useRef<HTMLDivElement | null>(null);
  const timeLeft = useRef(15);
  const initTime = 15;
  const [blocked, setBlocked] = useState(false);
  const [levels, setLevels] = useState<Levels[]>(levelData);

  const { items, setItems, selected, resetSelected, showItems } =
    useItemManager(gameLevels[currentLevel]);

  const handleShowHint = useGameHints(
    items,
    setItems,
    levels,
    setLevels,
    currentLevel,
  );
  const handlePlayLvlAgain = useReplayLevel({
    items,
    levels,
    setItems,
    timers,
    timeLeft,
    initTime,
  });
  const resetGame = useResetGame({
    songs,
    timeLeft,
    initTime,
    setLevels,
    setItems,
  });
  const startLevel = useStartLevel({
    timers,
    timeLeft,
    initTime,
    secondElementRef,
  });
  const updateLevelsValues = () => {
    const newLevels = [...levels];
    const spendTime = initTime + currentLevel * 15 - timeLeft.current;
    console.log(spendTime, " spendTime");
    newLevels[currentLevel].isFinished = true;
    newLevels[currentLevel].time.passedIn = formatTime(spendTime);
    newLevels[currentLevel].time.currentTime = formatTime(
      initTime + currentLevel * 15,
    );
    setLevels(newLevels);
  };

  const handleItemClick = useCallback(
    async (index: number) => {
      if (blocked || !items[index].clickable) return;

      console.log(levels, " levels");
      console.log(items, " items");

      const newItems = [...items];
      newItems[index].active = true;
      newItems[index].clickable = false;
      setItems(newItems);

      selected.current.push({ index, value: newItems[index].value });

      if (selected.current.length === 2) {
        console.log("selected.current.length === 2");
        // clicked and selected 2 cube
        const [first, second] = selected.current;
        const newLevels = [...levels];
        newLevels[currentLevel].tries += 1;
        setLevels(newLevels);

        if (first.value === second.value) {
          const finishedLevel =
            newItems.filter((item) => !item.clickable).length ===
            newItems.length;
          const isFinishedGame = currentLevel + 1 === maxLevels;

          if (finishedLevel) {
            // finished lvl
            if (isFinishedGame) {
              clearInterval(timers.current.timerInterval);
              const spendTime = initTime + currentLevel * 15 - timeLeft.current;
              console.log(spendTime, " spendTime");
              setIsFinishedLvl(true);

              updateLevelsValues();
              setWinGame(true);
              resetSound(songs.bgMusic);
              await songs.winGame.play();
              songs.winGame.loop = true;
            } else {
              // not finished game but finished level
              updateLevelsValues();
              clearInterval(timers.current.timerInterval);

              setTimeout(() => {
                //before congrats play
                resetSound(songs.match);
                resetSound(songs.open);
                resetSound(songs.close);
                //before congrats play
                songs.congrats.play();
                setIsFinishedLvl(true);
                setShowNextLevel(true);
                const currentLevel = updateCurrentLevel();
                setTimer(initTime + currentLevel * 15);
                secondElementRef.current!.textContent = String(
                  formatTime(initTime + currentLevel * 15),
                );
                console.log(currentLevel, " in usegamelogic");
              }, 700);
            }
          } else {
            // not finished lvl
            resetSound(songs.match);
            resetSound(songs.open);
            resetSound(songs.close);
            // not finished lvl
            songs.match.play().catch(console.warn);
          }

          resetSelected();
        } else {
          // not finished lvl and not match
          //songs
          resetSound(songs.close);
          resetSound(songs.match);
          await songs.open.play();
          //songs
          setBlocked(true);
          clearTimeout(timers.current.timeoutNotMatch);
          timers.current.timeoutNotMatch = setTimeout(async () => {
            await songs.close.play();

            const updatedItems = [...newItems];
            updatedItems[first.index] = {
              ...updatedItems[first.index],
              active: false,
              clickable: true,
            };
            updatedItems[second.index] = {
              ...updatedItems[second.index],
              active: false,
              clickable: true,
            };
            setItems(updatedItems);
            resetSelected();
            setBlocked(false);
          }, 500);
        }
      } else {
        // clicked and selected 1 cube
        resetSound(songs.close);
        resetSound(songs.match);
        await songs.open.play();
      }
    },
    [blocked, items, levels, songs],
  );

  useEffect(() => {
    resetSelected();
    clearTimeout(timers.current.timeout);
    const newItems = shuffleArray(gameLevels[currentLevel]);
    showItems(newItems);
  }, [currentLevel, selectedContentType]);
  useEffect(() => {
    Object.values(songs).forEach((sound) => {
      sound.load(); // load
    });
  }, []);

  return {
    items,
    setItems,
    startLevel,
    resetGame,
    handleShowHint,
    handlePlayLvlAgain,
    levels,
    handleItemClick,
    timers,
    timeLeft,
    secondElementRef,
  };
};
