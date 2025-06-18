import "./GameStatus.scss";
import { createPortal } from "react-dom";
import useGameStore from "../../../store/game.ts";
import VictoryCelebration from "../VictoryCelebration.tsx";
import { memo } from "react";
import { useShallow } from "zustand/react/shallow";

const GameStatus = ({ onStartGame, onTimeIsUp, onWinLvl, onResetGame }) => {
  console.log("GameStatus component render");
  const {
    currentLevel,
    isFinishedLvl,
    isGameOver,
    isTimeIsUp,
    isWinGame,
    showNextLevel,
    isGameStarted,
  } = useGameStore(
    useShallow((state) => ({
      currentLevel: state.currentLevel,
      isFinishedLvl: state.isFinishedLvl,
      isGameOver: state.isGameOver,
      isTimeIsUp: state.isTimeIsUp,
      isWinGame: state.isWinGame,
      showNextLevel: state.showNextLevel,
      isGameStarted: state.isGameStarted,
    })),
  );

  const startGame = (
    <div className="game-status absolute left-0 top-0 w-full h-full">
      <div className="h-full flex justify-center items-center">
        <div
          onPointerDown={onStartGame}
          className="game-status-btn bg-blue-400/50 cursor-pointer p-3 text-white hover:scale-105 transition duration-300 backdrop-blur"
        >
          Start Game
        </div>
      </div>
    </div>
  );
  const timeIsUp = (
    <div className="game-status absolute left-0 top-0 w-full h-full">
      <div className="h-full flex justify-center items-center">
        <div
          onPointerDown={onTimeIsUp}
          className="game-status-btn cursor-pointer bg-blue-400/50 p-3 text-white hover:scale-105 transition duration-300 backdrop-blur"
        >
          Time is up, restart?
        </div>
      </div>
    </div>
  );
  const winLvl = (
    <div className="game-status absolute left-0 top-0 w-full h-full">
      <div className="h-full flex flex-col justify-center items-center">
        <div
          onPointerDown={onWinLvl}
          className="game-status-btn cursor-pointer bg-blue-400/50 p-3 text-white hover:scale-105 transition duration-300 backdrop-blur"
        >
          Start This Lvl {currentLevel + 1}
        </div>
      </div>
    </div>
  );
  const winGame = (
    <div className="game-status absolute bottom-[25%] left-1/2 translate-[-50%]">
      <div className="h-full flex justify-center items-center">
        <VictoryCelebration />
        <div
          onPointerDown={onResetGame}
          className="game-status-btn cursor-pointer bg-blue-400/50 p-3 text-white hover:scale-105 transition duration-300 backdrop-blur"
        >
          Start game again?
        </div>
      </div>
    </div>
  );
  const gameOver = (
    <div className="game-status absolute left-0 top-0 w-full h-full">
      <div className="h-full flex justify-center items-center">
        <div className="game-status-btn cursor-pointer bg-blue-400/50 p-3 text-white hover:scale-105 transition duration-300 backdrop-blur">
          Game is over :(
        </div>
      </div>
    </div>
  );
  if (!isGameStarted) {
    return <>{createPortal(startGame, document.body)}</>;
  }
  if (isTimeIsUp && !isGameOver) {
    console.log(isTimeIsUp, " store.isTimeIsUp");
    return <>{createPortal(timeIsUp, document.body)}</>;
  }
  if (isGameOver) {
    console.log(isTimeIsUp, " store.isTimeIsUp");
    return <>{createPortal(gameOver, document.body)}</>;
  }
  if (isFinishedLvl && !isWinGame && showNextLevel) {
    console.log(isTimeIsUp, " store.isTimeIsUp");
    return <>{createPortal(winLvl, document.body)}</>;
  }
  if (isWinGame) {
    console.log(isTimeIsUp, " store.isTimeIsUp");
    return <>{winGame}</>;
  }
};

export default memo(GameStatus);
