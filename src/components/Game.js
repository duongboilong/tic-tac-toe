import React, { useState } from "react";
import Board from "./Board";
import FormSize from "./formSize";
function Game() {
  const [history, setHistory] = useState([
    { squares: Array(25).fill(null), currentMove: null },
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [ascendingSort, setAscendingSort] = useState(true);
  const [row, setRow] = useState(5);
  const [col, setCol] = useState(5);

  const handleClick = (i) => {
    const history_arg = history.slice(0, stepNumber + 1);
    const current_arg = history_arg[history_arg.length - 1];
    const squares_arg = current_arg.squares.slice();
    if (squares_arg[i] || CaculateWinner(squares_arg, row, col).size !== 0) {
      console.log("heeko");
      return;
    }

    squares_arg[i] = xIsNext ? "X" : "O";
    setHistory(history_arg.concat([{ squares: squares_arg, currentMove: i }]));
    setXIsNext(!xIsNext);
    setStepNumber(history_arg.length);
  };

  const jump = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const handle_SortButtonClick = () => {
    setAscendingSort(!ascendingSort);
  };

  const handle_submitFormSize = (event) => {
    event.preventDefault();
    setRow(event.target[0].value);
    setCol(event.target[1].value);
    setHistory([
      {
        squares: Array(event.target[0].value * event.target[1].value).fill(
          null
        ),
        currentMove: null,
      },
    ]);
    setXIsNext(true);
    setStepNumber(0);
    setAscendingSort(true);
  };

  let status;
  const history_arg = history;
  const current_arg = history_arg[stepNumber];

  const stepNumber_arg = stepNumber;

  const winner = CaculateWinner(current_arg.squares, row, col);

  if (winner.size != 0) {
    status = "The winner is: " + current_arg.squares[Array.from(winner)[0]];
  } else {
    if (stepNumber_arg === col * row) {
      status = "GAME IS DRAW";
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }
  }

  const historyLocation = function (history_arg) {
    let result = [];
    for (let i = 0; i < history_arg.length; i++) {
      const currentMove = history_arg[i].currentMove;
      const row_arg = parseInt(currentMove / row);
      const col_arg = currentMove % col;
      const decs = i
        ? `Go to ${i} step at (${row_arg}, ${col_arg})`
        : "Go to game start";

      const className = i === stepNumber ? "selected" : "";

      result.push(
        <li key={i}>
          <button onClick={() => jump(i)} className={className}>
            {" "}
            {decs}{" "}
          </button>{" "}
        </li>
      );
    }
    return result;
  };

  const moves = historyLocation(history_arg);

  const ascendingSort_arg = ascendingSort;

  const sort = ascendingSort_arg ? "Descending" : "Ascending";

  return (
    <div className="game">
      <h1>WELCOME TO TIC-TAC-TOE GAME!</h1>
      <div className="game-play">
        <FormSize onSubmit={handle_submitFormSize} />
        <div className="game-board">
          <Board
            squares={current_arg.squares}
            onClick={(i) => handleClick(i)}
            winner={winner}
            row={row}
            col={col}
          />{" "}
        </div>{" "}
        <div className="listStepBtn">
          {ascendingSort_arg ? <ol> {moves} </ol> : <ol>{moves.reverse()}</ol>}{" "}
        </div>{" "}
        <div>
          <button
            className="sortButton"
            onClick={() => handle_SortButtonClick()}
          >
            {sort}{" "}
          </button>{" "}
        </div>{" "}
      </div>
      <div className="game-info">
        <div> {status} </div>{" "}
      </div>
    </div>
  );
}

function CaculateWinner(squares, row, col) {
  let winnerSquares = new Set();

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      let count = 0;

      //dieu kien thang hang ngang
      for (let k = 1; k < 5; k++) {
        if (
          squares[i * row + j] &&
          squares[i * row + j] === squares[i * row + j + k] &&
          j + k < col
        ) {
          count++;
        } else {
          break;
        }
      }
      if (count === 4) {
        for (let k = 0; k < 5; k++) {
          winnerSquares.add(i * row + j + k);
        }
      }
      count = 0;

      //dieu kien thang hang doc
      for (let k = 1; k < 5; k++) {
        if (
          squares[i * row + j] &&
          squares[i * row + j] === squares[(i + k) * row + j] &&
          i + k < row
        ) {
          count++;
        } else {
          break;
        }
      }
      if (count === 4) {
        for (let k = 0; k < 5; k++) {
          winnerSquares.add((i + k) * row + j);
        }
      }
      count = 0;

      //dieu kien thang duong cheo chinh
      for (let k = 1; k < 5; k++) {
        if (
          squares[i * row + j] &&
          squares[i * row + j] === squares[(i + k) * row + j + k] &&
          i + k < row &&
          j + k < col
        ) {
          count++;
        } else {
          break;
        }
      }
      if (count === 4) {
        for (let k = 0; k < 5; k++) {
          winnerSquares.add((i + k) * row + j + k);
        }
      }
      count = 0;

      //dieu kien thang duong cheo phu
      for (let k = 1; k < 5; k++) {
        if (
          squares[i * row + j] &&
          squares[i * row + j] === squares[(i + k) * row + j - k] &&
          i + k < row &&
          j - k >= 0
        ) {
          count++;
          console.log(i + k, j - k, count);
        } else {
          break;
        }
      }
      if (count === 4) {
        for (let k = 0; k < 5; k++) {
          winnerSquares.add((i + k) * row + j - k);
        }
      }
      count = 0;
    }
  }

  return winnerSquares;
}

export default Game;
