import { formatTime } from "../../../utils";
import { memo, type Ref, type RefObject, useState } from "react";
import "./Timer.scss";
import useGameStore from "../../../store/game.ts";
// import { useState } from "react";
type TimerProps = {
  timeLeft: RefObject<number>;
  currentLvl: number;
  ref: Ref<HTMLDivElement>;
};

const Timer = ({ timeLeft, currentLvl, ref }: TimerProps) => {
  // const timer = useGameStore((state) => state.timer);
  const timer = useGameStore((state) => state.timer);
  const [test, setTest] = useState(0);

  console.log("Timer.tsx rendered timer ");
  return (
    <div className="flex justify-center items-center">
      <div>test is: {test}</div>
      <button
        className="border-2 text-xs relative z-10"
        onClick={() => setTest((prev) => prev + 1)}
      >
        Init re render
      </button>
      <span className="text-white text-lg font-bold tracking-widest" ref={ref}>
        {formatTime(timeLeft.current)}
      </span>
      {/*<div className="flex items-center justify-center w-22 h-22 rounded-full border-pink-500 bg-gradient-to-br from-pink-400 to-purple-600 shadow-lg animate-pulse">*/}
      {/*  <span*/}
      {/*    ref={ref}*/}
      {/*    className="text-white text-lg font-bold tracking-widest"*/}
      {/*  >*/}
      {/*    {formatTime(timeLeft.current)}*/}
      {/*  </span>*/}
      {/*</div>*/}
      <br />
      <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
        <div
          className="bg-gradient-to-r from-pink-500 to-purple-500 h-4 rounded-full transition-all duration-500"
          style={{
            width: `${(timer / (15 + currentLvl * 15)) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default memo(Timer);
