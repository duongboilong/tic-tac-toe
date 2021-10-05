import Square from "./Square";
function Board({ squares, onClick, winner, row, col }) {
  const renderSquare = (i, winner, squares, onClick) => {
    const winSquare = winner ? winner.has(i) : false;
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        winSquare={winSquare}
      />
    );
  };
  let myBoard = [];
  for (let i = 0; i < row; i++) {
    let myRow = [];
    for (let j = 0; j < col; j++) {
      myRow.push(renderSquare(i * row + j, winner, squares, onClick));
    }
    myBoard.push(<div className="board-row"> {myRow} </div>);
  }
  return <div className="board"> {myBoard} </div>;
}

export default Board;
