import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Coords, MazeWithThePassProps } from "./interfaces/maze-interfaces";

type MazeType = boolean[][];

const MazeWithThePass: React.FC<MazeWithThePassProps> = ({ copyCorrectPath } : MazeWithThePassProps ) => {
  console.log(copyCorrectPath);
  return (
    <div>
      <div className="status">Canvas with the pass</div>
      {copyCorrectPath.map((row, indexOfRow) => (
        <div
          className="board-row"
          key={`Row #${indexOfRow} of correctPath`}
          id={`Row #${indexOfRow} of correctPath`}
        >
          {row.map((square, indexOfSquare) => (
            <span
              className="square"
              key={`Square #${indexOfSquare} in row #${indexOfRow} of correctPath`}
              id={`Square #${indexOfSquare} in row #${indexOfRow} of correctPath`}
            >
              {square === false ? "X" : "="}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

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

  const [copyCorrectPath, setCopyCorrectPath] = useState<MazeType>();

  const solveMaze = () => {
    for (let row: number = 0; row < wasHere.length; row++) {
      for (let col: number = 0; col < wasHere[row].length; col++) {
        wasHere[row][col] = false;
        correctPath[row][col] = false;
      }
    }

    recursiveSolve(maze, startPoint.x, startPoint.y);
    setCopyCorrectPath(correctPath);
    console.log(copyCorrectPath);
    console.log(correctPath);
    };

  const recursiveSolve = (maze: MazeType, x: number, y: number) => {
    if (x === endPoint.x && y === endPoint.y) {
      correctPath[endPoint.y][endPoint.x] = true;
      console.log("END!!!");
      return true;
    }
    if (maze[y][x] || wasHere[y][x]) return false;

    wasHere[y][x] = true;
    if (x !== 0) {
      if (recursiveSolve(maze, x - 1, y)) {
        correctPath[y][x] = true;
        return true;
      }
    }
    if (x !== maze.length - 1) {
      if (recursiveSolve(maze, x + 1, y)) {
        correctPath[y][x] = true;
        return true;
      }
    }

    if (y !== 0) {
      if (recursiveSolve(maze, x, y - 1)) {
        correctPath[y][x] = true;
        return true;
      }
    }
    if (y !== maze[0].length - 1) {
      if (recursiveSolve(maze, x, y + 1)) {
        correctPath[y][x] = true;
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
              key={`Row #${indexOfRow} of copyMaze`}
              id={`Row #${indexOfRow} of copyMaze`}
            >
              {row.map((square, indexOfSquare) => (
                <span
                  className="square"
                  key={`Square #${indexOfSquare} in row #${indexOfRow} of copyMaze`}
                  id={`Square #${indexOfSquare} in row #${indexOfRow} of copyMaze`}
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
      {copyCorrectPath ? (
        <MazeWithThePass copyCorrectPath={copyCorrectPath} />
      ) : (
        <div>Press the button to find the pass from the maze</div>
      )}
    </>
  );
};

ReactDOM.render(<Maze></Maze>, document.getElementById("root"));
