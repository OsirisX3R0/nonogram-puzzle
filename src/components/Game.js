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

  const colGroups = (
    <div className="grid grid-flow-col col-[2_/_-1] justify-start items-start">
      {cols.map((set) =>
        set.map((group, i) => (
          <div
            className={`${
              group.allTilesOpened ? "text-slate-600 " : ""
            }px-[1.7rem]`}
            key={i}
          >
            {group.count}
          </div>
        ))
      )}
    </div>
  );

  const rowGroups = (
    <div className="grid justify-end items-center">
      {rows.map((set) =>
        set.map((group, i) => (
          <div
            className={`${group.allTilesOpened ? "text-slate-600 " : ""}`}
            key={i}
          >
            {group.count}
          </div>
        ))
      )}
    </div>
  );

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
    <div className="grid grid-cols-2 gap-5 text-lg">
      {colGroups}
      {rowGroups}
      <div className="grid justify-start">
        <table className="table-fixed border-collapse border border-slate-400 mx-auto">
          <tbody>{board}</tbody>
        </table>
      </div>
      <div className="grid grid-flow-col col-[2_/_-1] justify-start">
        <Emoji symbol="❤️" label="heart" /> x {lives}
      </div>
    </div>
  );
};

export default Game;
