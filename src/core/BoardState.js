export class BoardState {
  constructor({ width = 3, height = 3, stones }, prevState) {
    this.width = width;
    this.height = height;
    this.stones = stones || new Array(width * height).fill(null);
    this.prevState = prevState;
    this.validMoves = this.stones.reduce((moves, stone, cell) => {
      if (!stone) moves.push(cell);
      return moves;
    }, []);
    this.hash = this.stones
      .map((s, i) => {
        let cell = !!s ? s.name : "—";
        //if ((i + 1) % this.width === 0 && i !== 0) cell += "\n";
        return cell;
      })
      .join("");
  }

  toJSON() {
    return {
      width: this.width,
      height: this.height,
      hash: this.hash,
      prevState: this.prevState
    };
  }

  next(partialState) {
    return new this.constructor(
      Object.assign(
        {
          width: this.width,
          height: this.height,
          stones: this.stones
        },
        partialState
      ),
      this
    );
  }

  clear() {
    return this.next({ stones: undefined }, null);
  }

  addStone(index, stoneInstance) {
    const stones = [...this.stones];
    stones[index] = stoneInstance;
    return this.next({ stones });
  }
}
