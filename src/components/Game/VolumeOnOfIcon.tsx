import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import { memo } from "react";
import {useAudioControl} from "../../hooks/useAudioControl.ts";

const VolumeOnOfIcon = () => {
  console.log("VolumeOnOfIcon component render");

  const {
    volume,
    handleVolumeOff,
    handleVolumeOn,
  } = useAudioControl();

  return (
    <div className="absolute z-10 right-3 top-3">
      {volume ? (
        <VolumeOffIcon
          onPointerDown={handleVolumeOff}
          sx={{ fontSize: 30 }}
          className="cursor-pointer text-white"
        />
      ) : (
        <VolumeMuteIcon
          onPointerDown={handleVolumeOn}
          sx={{ fontSize: 30 }}
          className="cursor-pointer text-white"
        />
      )}
    </div>
  );
};

export default memo(VolumeOnOfIcon);
