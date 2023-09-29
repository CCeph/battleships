export function createShip(length) {
  let totalHits = 0;

  function hit() {
    totalHits += 1;
  }

  function isSunk() {
    if (totalHits === length) {
      return true;
    }
    return false;
  }

  function getTotalHits() {
    return totalHits;
  }

  function getLength() {
    return length;
  }
  return { hit, isSunk, getTotalHits, getLength };
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
