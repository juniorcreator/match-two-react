import React, {memo} from "react";
import type {GameItem} from "../../types";
// import type {GameBoardProps, GameItem} from "../../types";
type GameBoardProps = {
  items: GameItem[];
  onItemClick: (index: number) => void;
  contentType: string;
  levelClass: string;
};


const GameBoard: React.FC<GameBoardProps> = ({
  items,
  onItemClick,
  contentType,
  levelClass,
}) => {
  console.log("GameBoard component render");
  return (
    <ul className={`list ${levelClass} ${contentType}`}>
      {items.map((item, index) => (
        <li
          key={index}
          onPointerDown={() => onItemClick(index)}
          className={`list-item flip-card ${item.active ? "active" : ""} ${
            !item.clickable ? "notClickable" : ""
          }`}
        >
          <div className="flip-card-inner">
            <div className="flip-card-front"></div>
            <div
              className={`flip-card-back flex items-center justify-center ${item.bgColor}`}
            >
              <h1>{item.content}</h1>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default  memo(GameBoard);
