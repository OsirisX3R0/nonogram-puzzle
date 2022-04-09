import { useContext, useEffect } from "react";
import { TileStateEnum } from "nonogram-maker";

import { GameContext } from "../context/GameContext";
import Emoji from "./Emoji";

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

  const board = grid.length ? (
    <table className="table-fixed mx-auto">
      <thead>
        <th className="min-h-[4rem]"></th>
        {cols.map((set, setI) =>
          set.map((group, groupI) => (
            <th
              className={`${
                group.allTilesOpened ? "text-slate-600 " : ""
              } min-h-[4rem]`}
              key={`${setI}-${groupI}`}
            >
              {group.count}
            </th>
          ))
        )}
      </thead>
      <tbody>
        {grid.map((row, rowIndex) => {
          return (
            <tr key={rowIndex}>
              <th className="min-w-[4rem]">
                {rows[rowIndex].map((group, i) => (
                  <span
                    className={`${
                      group.allTilesOpened ? "text-slate-600 " : ""
                    }`}
                    key={`${rowIndex}-${i}`}
                  >
                    {group.count}
                  </span>
                ))}
              </th>
              {row.map((tile, tileIndex) => {
                let tileClass =
                  tile.state === TileStateEnum.OPEN
                    ? "bg-neutral-300"
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
          );
        })}
      </tbody>
      <tfoot className="text-right">
        <tr>
          <td colSpan={cols.length + 1}>
            <Emoji symbol="❤️" label="heart" />
            {lives}
          </td>
        </tr>
      </tfoot>
    </table>
  ) : null;

  return board;
};

export default Game;
