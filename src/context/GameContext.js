import { createContext, useCallback, useRef, useState } from "react";
import { Board } from "nonogram-maker";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const board = useRef();
  const [grid, setGrid] = useState([]);
  const [boardState, setBoardState] = useState(0);
  const [lives, setLives] = useState(0);
  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);

  const updateState = useCallback(() => {
    setGrid([...board.current.grid]);
    setBoardState(board.current.state);
    setLives(board.current.lives);
    setRows([...board.current.rows]);
    setCols([...board.current.cols]);
  }, []);

  const generateBoard = useCallback(
    (grid, opts) => {
      board.current = new Board(grid, opts);
      updateState();
    },
    [updateState]
  );

  const openTiles = useCallback(
    (tiles) => {
      board.current.toggleOpenMany(tiles);
      updateState();
    },
    [updateState]
  );

  const flagTiles = useCallback(
    (tiles) => {
      board.current.toggleFlagMany(tiles);
      updateState();
      for (let tile of tiles) {
        console.log(tile);
      }
    },
    [updateState]
  );

  return (
    <GameContext.Provider
      value={{
        grid,
        boardState,
        lives,
        rows,
        cols,
        generateBoard,
        openTiles,
        flagTiles,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
