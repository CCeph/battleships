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
      const outOfBoundsEvent = "outOfBoundsEvent";
      PubSub.publish(outOfBoundsEvent);
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

  function isAllSunk(allShips) {
    return allShips.every((ship) => ship.isSunk());
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

export function playerFactory(turnInput = "active") {
  let turnStatus = turnInput;

  const gameboard = createGameboard();

  function getTurnStatus() {
    return turnStatus;
  }

  function switchTurns() {
    if (turnStatus === "active") {
      turnStatus = "inactive";
    } else {
      turnStatus = "active";
    }
  }

  function getGameboard() {
    return gameboard;
  }

  return {
    getTurnStatus,
    switchTurns,
    getGameboard,
  };
}
