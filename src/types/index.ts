export type Item = {
  value: string;
  active: boolean;
  clickable: boolean;
  bgColor: string;
  content: string;
};

type LevelsTime = {
  passedIn: string;
  currentTime: string;
};
export type Levels = {
  time: LevelsTime;
  tries: number;
  boardLevel: number;
  isFinished: boolean;
  cls: string;
  hintCount: number;
};

export type GameItem = {
  active: boolean;
  clickable: boolean;
  bgColor: string;
  content: string;
  value: string;
};
export type GameBoardProps = {
  items: GameItem[];
  onItemClick: (index: number) => void;
  contentType: string;
  levelClass: string;
};
