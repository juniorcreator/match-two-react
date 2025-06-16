import { useCallback, useState } from "react";

export const useAudioControl = (songs: any) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(true);

  const setMusicVolume = (value: number) => {
    songs.bgMusic.volume = value;
    songs.open.volume = value / 2;
    songs.close.volume = value / 2;
    songs.match.volume = value / 2;
    songs.congrats.volume = value / 2;
    songs.switch.volume = value / 3;
    songs.winGame.volume = value;
  };

  const handlePlay = useCallback(async () => {
    try {
      await songs.bgMusic.play();
      setIsPlaying(true);
    } catch (e) {
      console.error("Play error:", e);
    }
  }, [songs.bgMusic]);

  const handlePause = useCallback(() => {
    songs.bgMusic.pause();
    setIsPlaying(false);
  }, [songs.bgMusic]);

  const handleVolumeOff = useCallback(() => {
    handlePause();
    setMusicVolume(0);
    setVolume(false);
  }, []);

  const handleVolumeOn = useCallback(() => {
    setMusicVolume(1);
    setVolume(true);
  }, []);

  return {
    songs,
    isPlaying,
    volume,
    handlePlay,
    handlePause,
    handleVolumeOff,
    handleVolumeOn,
  };
};
