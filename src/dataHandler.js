export function createShip(length) {
  const totalHits = 0;

  function hit() {
    this.totalHits += 1;
  }

  function isSunk() {
    if (this.totalHits === this.length) {
      return true;
    }
    return false;
  }
  return { length, totalHits, hit, isSunk };
}

export function createGameboard() {
  const shipBoard = [
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ];

  function getShipBoard() {
    return shipBoard;
  }

  return { getShipBoard };
}
