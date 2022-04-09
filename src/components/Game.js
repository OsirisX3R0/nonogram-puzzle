import { useContext, useEffect } from "react";
import { TileStateEnum } from "nonogram-maker";

import { GameContext } from "../context/GameContext";

const Game = () => {
  const { generateBoard, grid, lives, rows, cols, openTiles } =
    useContext(GameContext);

  useEffect(() => {
    generateBoard(
      [
        [1, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
      { lives: 9 }
    );
  }, [generateBoard]);

  const board = grid.length
    ? grid.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((tile, tileIndex) => {
            let tileClass =
              tile.state === TileStateEnum.OPEN
                ? "bg-neutral-800"
                : tile.flagged
                ? tile.state === TileStateEnum.WRONG
                  ? "text-red-600"
                  : "text-neutral-100"
                : "";

            let tileContent = tile.flagged ? "X" : "";

            return (
              <td
                className={`${tileClass} border border-slate-400 text-center w-16 h-16`}
                key={`${rowIndex}-${tileIndex}`}
                onClick={() => openTiles([tile])}
              >
                {tileContent}
              </td>
            );
          })}
        </tr>
      ))
    : null;

  return (
    <table className="table-fixed border-collapse border border-slate-400 mx-auto mt-4">
      <tbody>{board}</tbody>
    </table>
  );
};

export default Game;
