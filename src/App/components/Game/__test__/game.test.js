import React from "react";
import Game from "../index";
import { shallow, mount } from "enzyme";

describe("Game", () => {
  it("renders and does not crash", () => {
    shallow(<Game />);
  });

  it("Displays 'Go to game start' button on info card", () => {
    const wrapper = mount(<Game />);
    const button = wrapper.find("button.btn").text();
    expect(button).toEqual("Go to game start");
  });

  it("Displays that player X is the next player on start", () => {
    const wrapper = mount(<Game />);
    const status = wrapper.find("div.game-status").children().first().text();
    expect(status).toEqual("Next: Player X");
  });
});
