export function createShip(length, alignment) {
  let totalHits = 0;

  function getTotalHits() {
    return totalHits;
  }

  function getLength() {
    return length;
  }

  function getAlignment() {
    return alignment;
  }

  function hit() {
    totalHits += 1;
  }

  function isSunk() {
    if (totalHits === length) {
      return true;
    }
    return false;
  }
  return { hit, isSunk, getTotalHits, getLength, getAlignment };
}

export function createGameboard() {
  const shipboard = [
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

  function getShipboard() {
    return shipboard;
  }

  function placeShip(ship, position) {
    const currentPosition = [...position];
    const shipLength = ship.getLength();
    const shipAlignment = ship.getAlignment();
    for (let i = 0; i < shipLength; i += 1) {
      shipboard[position[1]][position[0]] = ship;
      if (shipAlignment === "H") {
        currentPosition[0] = +1;
      } else if (shipAlignment === "V") {
        currentPosition[1] = +1;
      } else {
        console.error("Incorrect Ship Alignment");
      }
    }
  }

  return { getShipboard, placeShip };
}
