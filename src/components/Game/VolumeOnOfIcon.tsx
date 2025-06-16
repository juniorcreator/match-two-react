import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import { memo } from "react";

const VolumeOnOfIcon = ({ volume, handleVolumeOff, handleVolumeOn }) => {
  console.log("VolumeOnOfIcon component render");
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
