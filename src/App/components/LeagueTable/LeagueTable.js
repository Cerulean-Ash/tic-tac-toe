import React from "react";

const LeagueTable = ({ winGameHistory, playerName }) => {
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Game</th>
            <th>Winner</th>
            <th>Symbol</th>
          </tr>
        </thead>
        <tbody>
          {/* display each round and the winner as a row in the table */}
          {winGameHistory.map((winner, i) => {
            return (
              <tr key={i + 1}>
                <td data-label="Game">{i + 1}</td>
                <td data-label="Winner">
                  {winner === "X" ? playerName.player1 : playerName.player2}
                </td>
                <td data-label="Symbol">{winner}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table className="table table-striped totals">
        <thead>
          <tr>
            <th colSpan="2">Totals</th>
          </tr>
        </thead>
        <tbody>
          {/* display the total score of each player */}
          <tr>
            <th>{playerName.player1}</th>
            <th>{winGameHistory.filter((e) => e === "X").length}</th>
          </tr>
          <tr>
            <th>{playerName.player2}</th>
            <th>{winGameHistory.filter((e) => e === "O").length}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LeagueTable;
