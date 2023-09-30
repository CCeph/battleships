export function createShip(length) {
  let totalHits = 0;

  function getTotalHits() {
    return totalHits;
  }

  function getLength() {
    return length;
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
  return { hit, isSunk, getTotalHits, getLength };
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

  const hitboard = [
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

  function getHitboard() {
    return hitboard;
  }

  function placeShip(ship, position, alignment) {
    const currentPosition = [...position];
    const shipLength = ship.getLength();
    for (let i = 0; i < shipLength; i += 1) {
      shipboard[currentPosition[1]][currentPosition[0]] = ship;
      if (alignment === "H") {
        currentPosition[0] += 1;
      } else if (alignment === "V") {
        currentPosition[1] += 1;
      } else {
        console.error("Incorrect Ship Alignment");
      }
    }
  }

  function receiveAttack(position) {
    if (hitboard[position[1]][position[0]] === "hit") {
      return;
    }
    const currentShipboard = this.getShipboard();
    const storedShipboardValue = currentShipboard[position[1]][position[0]];
    if (storedShipboardValue !== null) {
      storedShipboardValue.hit();
    }
    hitboard[position[1]][position[0]] = "hit";
  }

  return { getShipboard, placeShip, getHitboard, receiveAttack };
}
