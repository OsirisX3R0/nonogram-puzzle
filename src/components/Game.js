import { useContext } from "react";

import { GameContext } from "../context/GameContext";

const Game = () => {
  const { generateBoard } = useContext(GameContext);

  generateBoard(
    [
      [1, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ],
    { lives: 9 }
  );

  return <div></div>;
};

export default Game;
