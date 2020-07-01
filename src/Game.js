import "./styles.scss";
import React, { useState, useMemo } from "react";
import { BoardState } from "./core/BoardState";
import { BoardStateSolver } from "./core/BoardSolver";
import { Board } from "./interface/Board";
import { WinnerDeclaration } from "./interface/WinnerDeclaration";
import { DrawDeclaration } from "./interface/DrawDeclaration";
import { ScoresCounter } from "./interface/ScoresCounter";
import { Debug } from "./Debug";
const solver = new BoardStateSolver();

export const Game = ({
  width,
  height,
  winSequenceLength,
  minimaxDepth,
  playerType,
  enemyType,
  debug = false
}) => {
  const [state, setState] = useState(new BoardState({ width, height }));
  const [scores, setScores] = useState([0, 0]);
  const [thinking, setThinking] = useState(false);

  const winner = useMemo(() => {
    if (solver.isWinCondition(state, playerType, winSequenceLength))
      return playerType;
    if (solver.isWinCondition(state, enemyType, winSequenceLength))
      return enemyType;
    return null;
  });

  const draw = useMemo(() => !winner && state.validMoves.length === 0, [
    winner,
    state.validMoves.length
  ]);

  const terminal = useMemo(() => {
    if (!!winner || !!draw) return true;
    return false;
  }, [winner, draw]);

  const restartGame = () => {
    if (winner === playerType) setScores([scores[0] + 1, scores[1]]);
    if (winner === enemyType) setScores([scores[0], scores[1] + 1]);
    setState(state.clear());
  };

  const gameCycle = index => {
    if (!state.stones[index] && !terminal && !thinking) {
      const newBoard = state.addStone(index, playerType);
      setState(newBoard);
      setThinking(true);
      const bestMove = solver.minimax(
        newBoard,
        enemyType,
        playerType,
        winSequenceLength,
        minimaxDepth
      );

      setState(newBoard.addStone(bestMove.cellIndex, enemyType));
      setThinking(false);
    }
  };

  return (
    <>
      {debug && <Debug solver={solver} />}
      <ScoresCounter scores={scores} />
      <Board state={state} onCellClick={gameCycle} terminal={terminal} />
      <WinnerDeclaration winner={winner} onClose={restartGame} enter={winner} />
      <DrawDeclaration onClose={restartGame} enter={draw} />
    </>
  );
};
