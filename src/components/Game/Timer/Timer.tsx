import { formatTime } from "@/utils";
import { memo, type Ref, type RefObject } from "react";
import "./Timer.scss";
import useGameStore from "@/store/game.ts";
type TimerProps = {
  timeLeft: RefObject<number>;
  currentLvl: number;
  ref: Ref<HTMLDivElement>;
};

const Timer = ({ timeLeft, currentLvl, ref }: TimerProps) => {
  const timer = useGameStore((state) => state.timer);

  console.log("Timer.tsx rendered timer ");
  return (
    <div className="flex justify-center items-center flex-col mx-4">
      <div className="flex items-center justify-center mb-2 w-30 h-10 rounded-xl border-pink-500 bg-gradient-to-br from-pink-400 to-purple-600 shadow-lg animate-pulse">
        <span
          ref={ref}
          className="text-white text-lg font-bold tracking-widest"
        >
          {formatTime(timeLeft.current)}
        </span>
      </div>
      <div className="w-full mx-4 bg-gray-200 rounded-full h-4 shadow-inner">
        <div
          className="bg-gradient-to-r from-pink-500 to-purple-500 h-4 rounded-full transition-all duration-100"
          style={{
            width: `${(timer / (15 + currentLvl * 15)) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default memo(Timer);
