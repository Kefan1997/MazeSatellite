import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Coords } from "./interfaces/maze-interfaces";

type MazeType = boolean[][];

const Maze: React.FC = () => {
  const _: boolean = false; // pass
  const X: boolean = true; // wall
  const maze: MazeType = [
    [X, X, X, X, _, X, X, X, X],
    [X, _, X, _, _, X, _, _, X],
    [X, _, X, X, _, X, _, X, X],
    [_, _, X, _, _, _, _, X, _],
    [X, _, X, _, X, _, X, X, X],
    [X, _, _, _, X, _, _, _, X],
    [X, X, X, X, X, X, X, X, X],
  ];

  const copyMaze: MazeType = maze.slice().map((value) => value.slice());
  const wasHere: MazeType = maze.slice().map((value) => value.slice());
  const correctPath: MazeType = maze.slice().map((value) => value.slice());

  const startPoint: Coords = { x: 0, y: 3 };
  const endPoint: Coords = { x: 4, y: 0 };

  const solveMaze = () => {
    for (let row: number = 0; row < wasHere.length; row++) {
      for (let col: number = 0; col < wasHere[row].length; col++) {
        wasHere[row][col] = false;
        correctPath[row][col] = false;
      }
    }

    const b = recursiveSolve(startPoint.x, startPoint.y); // add type
    console.log(b);
    console.log(maze);
    console.log(wasHere);
    console.log(correctPath);
  };

  const recursiveSolve = (x: number, y: number) => {
    if (x === endPoint.x && y === endPoint.y) {
      console.log("END!!!");
      return true;
    }
    if (maze[x][y] || wasHere[x][y]) return false;

    wasHere[x][y] = true;
    if (x !== 0) {
      if (recursiveSolve(x - 1, y)) {
        correctPath[x][y] = true;
        return true;
      }
    }
    if (x !== maze.length - 1) {
      if (recursiveSolve(x + 1, y)) {
        correctPath[x][y] = true;
        return true;
      }
    }

    if (y !== 0) {
      if (recursiveSolve(x, y - 1)) {
        correctPath[x][y] = true;
        return true;
      }
    }
    if (y !== maze[0].length - 1) {
      if (recursiveSolve(x, y + 1)) {
        correctPath[x][y] = true;
        return true;
      }
    }
    return false;
  };

  return (
    <>
      <div>Hello Worker</div>

      <div className="canvas-board">
        <div>
          <div className="status">Canvas</div>
          {copyMaze.map((row, indexOfRow) => (
            <div
              className="board-row"
              key={`Row #${indexOfRow}`}
              id={`Row #${indexOfRow}`}
            >
              {row.map((square, indexOfSquare) => (
                <span
                  className="square"
                  key={`Square #${indexOfSquare} in row #${indexOfRow}`}
                  id={`Square #${indexOfSquare} in row #${indexOfRow}`}
                >
                  {square === false ? "_" : "X"}
                </span>
              ))}
            </div>
          ))}
        </div>
        <input
          type="button"
          className={"button_canvas"}
          onClick={() => solveMaze()}
          defaultValue="Find the pass to the exit"
        />
      </div>
    </>
  );
};

ReactDOM.render(<Maze></Maze>, document.getElementById("root"));
