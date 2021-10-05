function Square({ winSquare, onClick, value }) {
  const className = "square " + (winSquare ? "winSquare" : "");
  return (
    <button className={className} onClick={onClick}>
      {" "}
      {value}{" "}
    </button>
  );
}

export default Square;
