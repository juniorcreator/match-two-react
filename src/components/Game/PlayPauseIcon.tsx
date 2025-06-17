import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import NotStartedIcon from "@mui/icons-material/NotStarted";
import { memo } from "react";
import {useAudioControl} from "../../hooks/useAudioControl.ts";

const PlayPauseIcon = () => {
  console.log("PlayPauseIcon component render");

  const {
    isPlaying,
    handlePlay,
    handlePause,
  } = useAudioControl();

  return (
    <div className="absolute z-10 right-[60px] top-[14px]">
      {isPlaying ? (
        <PauseCircleIcon
          onClick={handlePause}
          sx={{ fontSize: 30 }}
          className="cursor-pointer text-white"
        />
      ) : (
        <NotStartedIcon
          onClick={handlePlay}
          sx={{ fontSize: 30 }}
          className="cursor-pointer text-white"
        />
      )}
    </div>
  );
};

export default memo(PlayPauseIcon);
