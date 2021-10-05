import React, { useState } from "react";
function FormSize({ onSubmit, onChange }) {
  const [row, setRow] = useState(5);
  const [col, setCol] = useState(5);
  const handle_changeFormSize = (event) => {
    event.target.name === "row"
      ? setRow(event.target.value)
      : setCol(event.target.value);
  };
  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <label>
        Row:
        <br />
        <input
          name="row"
          type="number"
          value={row}
          onChange={(event) => handle_changeFormSize(event)}
        />
      </label>
      <br />
      <label>
        Column:
        <br />
        <input
          name="col"
          type="number"
          value={col}
          onChange={(event) => handle_changeFormSize(event)}
        />
      </label>
      <br />
      <input className="submitBtn" type="submit" value="Submit" />
    </form>
  );
}
export default FormSize;
