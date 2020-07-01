import React from "react";
import ReactDOM from "react-dom";
import { Game } from "./Game";
import { XStone, OStone } from "./core/StoneTypes";
import "./styles.scss";

const rootElement = document.getElementById("game");
ReactDOM.render(
  <Game
    width={3}
    height={3}
    winSequenceLength={3}
    minimaxDepth={7}
    playerType={OStone}
    enemyType={XStone}
  />,
  rootElement
);
