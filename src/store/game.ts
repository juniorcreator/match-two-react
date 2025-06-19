import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Item, Levels } from "@/types";
import { generateGameLevels } from "@/utils";

const maxLevels = 13;

type State = {
  currentLevel: number;
  isFinishedLvl: boolean;
  selectedContentType: string;
  gameLevels: Item[][];
  levelData: Levels[];
  health: number;
  isGameStarted: boolean;
  isGameOver: boolean;
  isTimeIsUp: boolean;
  isWinGame: boolean;
  maxLevels: number;
  showNextLevel: boolean;
  timer: number;
};

type Action = {
  updateCurrentLevel: () => number;
  setIsFinishedLvl: (value: boolean) => void;
  setItemContent: (content: string) => void;
  setStartGame: (value: boolean) => void;
  setMinusHealth: () => void;
  setPlusHealth: () => void;
  setHealth: (value: number) => void;
  setIsTimeIsUp: (value: boolean) => void;
  setGameOver: () => void;
  setWinGame: (value: boolean) => void;
  setShowNextLevel: (value: boolean) => void;
  resetCurrentLevel: () => void;
  resetLvlData: () => Levels[];
  updateLvlData: (lvlData: Levels[]) => void;
  setTimer: (value: number) => void;
};

const useGameStore = create<State & Action>()(
  devtools((set, get) => ({
    currentLevel: 0,
    maxLevels: maxLevels,
    isFinishedLvl: false,
    selectedContentType: "numbers",
    isGameStarted: false,
    isGameOver: false,
    isTimeIsUp: false,
    isWinGame: false,
    showNextLevel: false,
    health: 3,
    gameLevels: generateGameLevels(maxLevels, "numbers"),
    levelData: Array.from({ length: maxLevels }, (_, i) => ({
      tries: 0,
      time: {
        passedIn: "0",
        currentTime: "0",
      },
      boardLevel: i,
      isFinished: false,
      cls: i === 0 ? "" : `lvl${i}`,
      hintCount: i > 3 ? 3 : 1,
    })),
    timer: 15,

    updateCurrentLevel: () => {
      const level = get().currentLevel;
      set({ currentLevel: Math.min(level + 1, get().gameLevels.length - 1) });
      return get().currentLevel;
    },
    resetCurrentLevel: () => {
      set({ currentLevel: 0 });
    },
    setIsFinishedLvl: (isFinishedLvl) => set({ isFinishedLvl }),
    setItemContent: (selectedContentType) => {
      set({ selectedContentType });
      set({ gameLevels: generateGameLevels(maxLevels, selectedContentType) });

      console.log(get().gameLevels, " get().gameLevels");
    },
    setStartGame: (value: boolean) => {
      set({ isGameStarted: value });
    },
    setMinusHealth: () => {
      set({ health: get().health - 1 });
    },
    setHealth: (health: number) => {
      set({ health: health });
    },
    setIsTimeIsUp: (value) => {
      set({ isTimeIsUp: value });
    },
    setGameOver: () => {
      set({ isGameOver: true });
    },
    setWinGame: (value: boolean) => {
      set({ isWinGame: value });
    },
    setShowNextLevel: (value: boolean) => {
      set({ showNextLevel: value });
    },
    resetLvlData: () => {
      set({
        levelData: Array.from({ length: maxLevels }, (_, i) => ({
          tries: 0,
          time: {
            passedIn: "0",
            currentTime: "0",
          },
          boardLevel: i,
          isFinished: false,
          cls: i === 0 ? "" : `lvl${i}`,
          hintCount: i > 3 ? 3 : 1,
        })),
      });
      return get().levelData;
    },
    updateLvlData: (newLvlData: Levels[]) => {
      set({ levelData: newLvlData });
    },
    setTimer: (value: number) => {
      set({ timer: value });
    },
  })),
);

export default useGameStore;
