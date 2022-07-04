import React from "react";
import PropTypes from "prop-types";

/**
 * A square in the game of tic tac toe.   Can be clicked or the square can contain a value.
 */
const Square = ({ onClick, value, winningSquare }) => {
  //function checks if the square is a winner. If true a new class name is added to the square element
  const highlightWinner = () => {
    return winningSquare ? "winningSquare" : "";
  };

  return (
    <button className={`square ${highlightWinner()}`} onClick={onClick}>
      {value}
    </button>
  );
};

Square.propTypes = {
  /**
   *  The handler for when a square is clicked
   */
  onClick: PropTypes.func,

  /**
   *  The value to put in the square
   */
  value: PropTypes.string,
};

export default Square;
