import React, { useState } from "react";
import Board from "../Board";
import PlayerForm from "../PlayerForm/PlayerForm";
import LeagueTable from "../LeagueTable/LeagueTable";

/**
 * A game of tic-tac-toe.
 */
const Game = () => {
  const [gameHistory, setGameHistory] = useState([
    { squares: Array(9).fill(null) },
  ]); // Start of game
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const [playerName, setPlayerName] = useState({
    player1: "Player X",
    player2: "Player O",
  });
  const [winGameHistory, setWinGameHistory] = useState([]);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { square: squares[a], line: lines[i] }; // capturing the winning line here as well as the square to enable highlighting of the winning line
      }
    }

    return { square: null, line: [] };
  };

  const handleClick = (i) => {
    const history = gameHistory.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares).square || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? "X" : "O";

    setGameHistory([...history, { squares }]);
    setStepNumber(history.length);
    setXisNext(!xIsNext);

    // capturing winning game history to enable disbaling in league table (seperate component)
    if (calculateWinner(squares).square) {
      setWinGameHistory([...winGameHistory, calculateWinner(squares).square]);
    }
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const current = gameHistory[stepNumber];
  const winner = calculateWinner(current.squares).square;

  const moves = gameHistory.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button className="btn btn-primary" onClick={() => jumpTo(move)}>
          {desc}
        </button>
      </li>
    );
  });

  //updated status to reflect player names
  let status;
  if (winner) {
    status =
      winner === "X"
        ? "Winner: " + playerName.player1
        : "Winner: " + playerName.player2;
  } else {
    status = "Next: " + (xIsNext ? playerName.player1 : playerName.player2);
  }

  //function to handle the changing of player names - linked to the PlayerForm component
  const handlePlayerNameChange = (value, player_num) => {
    let player = `player${player_num}`;
    setPlayerName({ ...playerName, [player]: value });
  };

  return (
    <div className="game">
      <div className="forms-wrapper">
        <PlayerForm
          symbol="X"
          onChange={(value) => handlePlayerNameChange(value, 1)}
        />
        <PlayerForm
          symbol="O"
          onChange={(value) => handlePlayerNameChange(value, 2)}
        />
      </div>
      <div className="game-wrapper">
        <div>
          <div className="game-info card">
            <h2>Game Controls</h2>
            <div>
              <ol>{moves}</ol>
            </div>
          </div>
        </div>

        <div>
          <div className="game-board card">
            <div className="game-status">
              <h2>{status}</h2>
            </div>
            <Board
              squares={current.squares}
              winningLine={calculateWinner(current.squares.slice()).line}
              onClick={(i) => handleClick(i)}
            />
          </div>
        </div>
        <div>
          <div className="card league-table">
            <h2>Score</h2>
            <LeagueTable
              winGameHistory={winGameHistory}
              playerName={playerName}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
