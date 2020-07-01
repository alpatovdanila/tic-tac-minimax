export class BoardStateSolver {
  constructor() {
    this.minimaxCache = {};
    this.winConditionCache = {};
  }

  indexRight(boardState, fromIndex) {
    const x = fromIndex % boardState.width;
    if (x < boardState.width - 1) return fromIndex + 1;
  }

  indexLeft(boardState, fromIndex) {
    const x = fromIndex % boardState.width;
    if (x > 0) return fromIndex - 1;
  }

  indexBelow(boardState, fromIndex) {
    const y = Math.floor(fromIndex / boardState.width);
    if (y < boardState.height) return fromIndex + boardState.width;
  }

  indexBelowRight(boardState, fromIndex) {
    const below = this.indexBelow(boardState, fromIndex);
    if (below) return this.indexRight(boardState, below);
  }

  indexBelowLeft(boardState, fromIndex) {
    const below = this.indexBelow(boardState, fromIndex);
    if (below) return this.indexLeft(boardState, below);
  }

  getSequence(boardState, fromIndex, forStoneType, inDirection) {
    const stone = boardState.stones[fromIndex];
    if (!stone || stone !== forStoneType) return [];

    const nextIndex = (from => {
      if (inDirection === "h") return this.indexRight(boardState, from);
      if (inDirection === "v") return this.indexBelow(boardState, from);
      if (inDirection === "dr") return this.indexBelowRight(boardState, from);
      if (inDirection === "dl") return this.indexBelowLeft(boardState, from);
    })(fromIndex);

    if (!nextIndex) return [fromIndex];

    return [
      fromIndex,
      ...this.getSequence(boardState, nextIndex, forStoneType, inDirection)
    ];
  }

  isWinCondition(state, stoneType, winLength) {
    for (let i = 0; i < state.stones.length; i++) {
      const stone = state.stones[i];
      if (!stone || stone !== stoneType) continue;
      if (
        this.getSequence(state, i, stoneType, "h").length >= winLength ||
        this.getSequence(state, i, stoneType, "v").length >= winLength ||
        this.getSequence(state, i, stoneType, "dr").length >= winLength ||
        this.getSequence(state, i, stoneType, "dl").length >= winLength
      ) {
        return true;
      }
    }

    return false;
  }

  minimax(
    boardState,
    maximizingStone,
    minimizingStone,
    winCondition,
    depth = 3,
    maximizing = true,
    _alpha = -Infinity,
    _beta = Infinity
  ) {
    const memoized = this.minimaxCache[boardState.hash];
    if (memoized) {
      if (maximizing && memoized[0]) return memoized[0];
      if (!maximizing && memoized[1]) return memoized[1];
    }

    if (this.isWinCondition(boardState, maximizingStone, winCondition))
      return { score: 100 - depth + Math.random() };

    if (this.isWinCondition(boardState, minimizingStone, winCondition))
      return { score: -100 + depth - Math.random() };

    if (boardState.validMoves.length === 0) {
      return { score: 0 + Math.random() };
    }
    if (depth === 0) {
      return { score: 0 + Math.random(), inFogOfWar: true };
    }

    let alpha = _alpha;
    let beta = _beta;
    let maxMove = { score: -Infinity, cellIndex: -1 };
    let minMove = { score: Infinity, cellIndex: -1 };

    for (let move of boardState.validMoves) {
      const child = boardState.addStone(
        move,
        maximizing ? maximizingStone : minimizingStone
      );

      const result = this.minimax(
        child,
        maximizingStone,
        minimizingStone,
        winCondition,
        depth - 1,
        !maximizing,
        alpha,
        beta
      );

      if (result.score > maxMove.score)
        maxMove = {
          score: result.score,
          cellIndex: move,
          inFogOfWar: result.inFogOfWar
        };
      if (result.score < minMove.score)
        minMove = {
          score: result.score,
          cellIndex: move,
          inFogOfWar: result.inFogOfWar
        };

      if (maximizing) {
        alpha = Math.max(alpha, maxMove.score);
        if (beta <= alpha) break;
      }

      if (!maximizing) {
        beta = Math.min(beta, minMove.score);
        if (beta <= alpha) break;
      }
    }

    if (!this.minimaxCache[boardState.hash])
      this.minimaxCache[boardState.hash] = [];

    if (!maxMove.inFogOfWar) this.minimaxCache[boardState.hash][0] = maxMove;
    if (!minMove.inFogOfWar) this.minimaxCache[boardState.hash][1] = minMove;
    return maximizing ? maxMove : minMove;
  }
}
