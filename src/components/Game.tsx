import { memo, useCallback, useEffect } from "react";
import useGameStore from "../store/game.ts";
import { useShallow } from "zustand/react/shallow";
import "./Game.scss";
import { playMusic } from "../utils";
import GameBoard from "./Game/GameBoard.tsx";
import ChooseGameBlock from "./Game/ChooseGameBlock.tsx";
import Health from "./Game/Health/Health.tsx";
import GameStatus from "./Game/GameStatus/GameStatus.tsx";
import FinishedLevels from "./Game/FinishedLevels.tsx";
import { canvas } from "../utils/canvas.ts";
import Timer from "./Game/Timer/Timer.tsx";
import { useGameLogic } from "../hooks/useGameLogic.ts";
import { useAudioControl } from "../hooks/useAudioControl.ts";
import PlayPauseIcon from "./Game/PlayPauseIcon.tsx";
import VolumeOnOfIcon from "./Game/VolumeOnOfIcon.tsx";
import GameHints from "./Game/GameHints.tsx";
import BtnNextLvl from "./Game/BtnNextLvl.tsx";
const songs = playMusic();

const Game = () => {
  const {
    isGameStarted,
    isWinGame,
    setStartGame,
    currentLevel,
    selectedContentType,
    setShowNextLevel,
    setIsFinishedLvl,
    setIsTimeIsUp,
  } = useGameStore(
    useShallow((state) => ({
      isGameStarted: state.isGameStarted,
      isWinGame: state.isWinGame,
      setStartGame: state.setStartGame,
      currentLevel: state.currentLevel,
      selectedContentType: state.selectedContentType,
      setShowNextLevel: state.setShowNextLevel,
      setIsFinishedLvl: state.setIsFinishedLvl,
      setIsTimeIsUp: state.setIsTimeIsUp,
    })),
  );

  const {
    isPlaying,
    volume,
    handlePlay,
    handlePause,
    handleVolumeOff,
    handleVolumeOn,
  } = useAudioControl(songs);
  const {
    items,
    handleShowHint,
    resetGame,
    handlePlayLvlAgain,
    levels,
    startLevel,
    handleItemClick,
    timeLeft,
    secondElementRef,
  } = useGameLogic(songs);
  const handleWinLvl = useCallback(() => {
    setIsFinishedLvl(false);
    startLevel();
  }, [setIsFinishedLvl, startLevel]);

  const handleStartGame = useCallback(() => {
    setShowNextLevel(false);
    setStartGame(true);
    startLevel();
  }, [setShowNextLevel, startLevel]);

  const handleTimeIsUp = useCallback(() => {
    startLevel();
    setIsTimeIsUp(false);
  }, [startLevel, setIsTimeIsUp]);

  const handleResetGame = useCallback(() => {
    resetGame();
  }, [resetGame]);

  useEffect(canvas, []);
  useEffect(() => {
    Object.values(songs).forEach((sound) => {
      sound.load(); // load
    });
  }, []);
  console.log("Game.tsx rendered");
  return (
    <>
      <canvas id="particles"></canvas>
      {!isWinGame && <Health />}
      {!isWinGame && (
        <PlayPauseIcon
          isPlaying={isPlaying}
          handlePause={handlePause}
          handlePlay={handlePlay}
        />
      )}
      {!isWinGame && ( // todo reduce rendering
        <Timer
          currentLvl={currentLevel}
          timeLeft={timeLeft}
          ref={secondElementRef}
        />
      )}
      <GameStatus
        onWinLvl={handleWinLvl}
        onStartGame={handleStartGame}
        onTimeIsUp={handleTimeIsUp}
        onResetGame={handleResetGame}
      />
      {!isGameStarted && <ChooseGameBlock />}
      <div className="game">
        <VolumeOnOfIcon
          volume={volume}
          handleVolumeOff={handleVolumeOff}
          handleVolumeOn={handleVolumeOn}
        />
        {!isWinGame && (
          <h2 className="text-xl text-white mb-1">level: {currentLevel + 1}</h2>
        )}

        {!isWinGame && (
          <GameBoard
            items={items}
            onItemClick={handleItemClick}
            contentType={selectedContentType}
            levelClass={levels[currentLevel].cls}
          />
        )}
        {!isWinGame && (
          <GameHints
            levels={levels}
            currentLevel={currentLevel}
            handlePlayLvlAgain={handlePlayLvlAgain}
            handleShowHint={handleShowHint}
          />
        )}
        <BtnNextLvl />
        {isWinGame && <FinishedLevels />}
      </div>
    </>
  );
};

export default memo(Game);
