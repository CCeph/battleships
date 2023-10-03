import PubSub from "pubsub-js";

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

  const totalShips = [];

  function getShipboard() {
    return shipboard;
  }

  function getHitboard() {
    return hitboard;
  }

  function getTotalShips() {
    return totalShips;
  }

  function appendShipToTotal(ship) {
    totalShips.push(ship);
  }

  function isOutofBounds(length, alignment, position) {
    const posX = position[0];
    const posY = position[1];
    if (alignment === "H") {
      return posX + length - 1 > 9;
    }
    return posY + length - 1 > 9;
  }

  function isAlreadyOccupied(contentOfPosition) {
    return contentOfPosition !== null;
  }

  function placeShip(ship, position, alignment, PubSub) {
    const currentPosition = [...position];
    const shipLength = ship.getLength();
    if (isOutofBounds(shipLength, alignment, position) === true) {
      const badShipPlacementEvent = "badShipPlacementEvent";
      PubSub.publish(badShipPlacementEvent);
      return;
    }
    for (let i = 0; i < shipLength; i += 1) {
      if (
        isAlreadyOccupied(shipboard[currentPosition[1]][currentPosition[0]])
      ) {
        const badShipPlacementEvent = "badShipPlacementEvent";
        PubSub.publish(badShipPlacementEvent);
        return;
      }

      shipboard[currentPosition[1]][currentPosition[0]] = ship;
      if (alignment === "H") {
        currentPosition[0] += 1;
      } else if (alignment === "V") {
        currentPosition[1] += 1;
      } else {
        console.error("Incorrect Ship Alignment");
      }
    }
    appendShipToTotal(ship);
  }

  function isAllSunk(totalShips) {
    return totalShips.every((ship) => ship.isSunk());
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

  return {
    getShipboard,
    placeShip,
    getHitboard,
    receiveAttack,
    getTotalShips,
    isAllSunk,
  };
}

const carrier = createShip(5);
const cruiser = createShip(3);
const submarine = createShip(1);
const playerGameboard = createGameboard();
playerGameboard.placeShip(cruiser, [4, 4], "H", PubSub);
playerGameboard.placeShip(carrier, [4, 1], "V", PubSub);
playerGameboard.placeShip(submarine, [9, 9], "H", PubSub);
console.log(playerGameboard.getShipboard());
