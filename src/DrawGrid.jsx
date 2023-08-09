
import React from 'react';

import './DrawGrid.css'
function DrawGrid(props) {
  // console.log(props.seat);
  
  function numberToLowerCaseAlphabet(number) {
    if (number < 1 || number > 26) {
      return null; // Invalid input
    }
    
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return alphabet.charAt(number - 1);
  }


  const numRows = 12;
  const numCols = 7;

  const grid = [];

  for (let i = 0; i < numRows; i++) {
    const row = [];
    for (let j = 0; j < numCols; j++) {
      row.push({ row: numberToLowerCaseAlphabet(i+1), col: j+1 });
    }
    grid.push(row);
  }

  return (

<div className="grid-container">
{grid.map((row, rowIndex) => (
  <div className="grid-row" key={rowIndex}>
    {row.map((cell, colIndex) => (
      // Check conditions and create cell with appropriate class
      (cell.row === 'l' && cell.col >= 4) ? null : (
        <div
          className={`grid-cell ${props.seat[rowIndex][colIndex] === '*' ? 'green' : ''}`}
          key={`${rowIndex}-${colIndex}`}
        >
          {props.seat[rowIndex][colIndex] === '*' ? (
            <span className="green-marker">{numberToLowerCaseAlphabet(rowIndex+1)}-{colIndex+1}</span>
          ) : (
            `${cell.row}-${cell.col}`
          )}
        </div>
      )
    ))}
  </div>
))}
</div>


  );
}

export default DrawGrid;


