import React from "react";
import { shallow } from "enzyme";

import LeagueTable from "../LeagueTable";

describe("LeagueTable", () => {
  it("renders and does not crash", () => {
    let winHistory = [];
    let players = {
      player1: "Player X",
      player2: "Player O",
    };
    shallow(<LeagueTable winGameHistory={winHistory} playerName={players} />);
  });
});
