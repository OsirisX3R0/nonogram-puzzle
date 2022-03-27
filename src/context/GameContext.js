import { createContext, useEffect, useRef, useState } from "react";
import { Board } from "nonogram-maker";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const board = useRef();
  const [grid, setGrid] = useState([]);
  const [boardState, setBoardState] = useState(0);
  const [lives, setLives] = useState(0);

  useEffect(() => {
    console.log(board.current.grid[0][0]);
    setGrid(board.current.grid);
    setBoardState(board.current.state);
    setLives(board.current.lives);
  }, [board]);

  const generateBoard = (grid, opts) => {
    board.current = new Board(grid, opts);
  };

  const openTiles = (tiles) => {
    board.toggleOpenMany(tiles);
  };

  const flagTiles = (tiles) => {
    board.toggleFlagMany(tiles);
  };

  return (
    <GameContext.Provider
      value={{ grid, boardState, lives, generateBoard, openTiles, flagTiles }}
    >
      {children}
    </GameContext.Provider>
  );
};
