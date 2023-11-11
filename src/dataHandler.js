import PubSub from "pubsub-js";

export function createShip(length, givenName = null) {
  let totalHits = 0;
  const shipName = givenName;

  function getTotalHits() {
    return totalHits;
  }

  function getLength() {
    return length;
  }

  function getName() {
    return shipName;
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
  return { hit, isSunk, getTotalHits, getLength, getName };
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

  function placeShip(ship, position, alignment, fakePubSub) {
    const currentPosition = [...position];
    const shipLength = ship.getLength();
    if (isOutofBounds(shipLength, alignment, position) === true) {
      const outOfBoundsEvent = "outOfBoundsEvent";
      fakePubSub.publish(outOfBoundsEvent);
      return;
    }
    for (let i = 0; i < shipLength; i += 1) {
      if (
        isAlreadyOccupied(shipboard[currentPosition[1]][currentPosition[0]])
      ) {
        const badShipPlacementEvent = "badShipPlacementEvent";
        fakePubSub.publish(badShipPlacementEvent);
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

  let gameboard = createGameboard();

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

  function updateGameboard(newGameboard) {
    gameboard = newGameboard;
  }

  return {
    getTurnStatus,
    switchTurns,
    getGameboard,
    updateGameboard,
  };
}

export function computerFactory(turnInput = "inactive") {
  let turnStatus = turnInput;

  let gameboard = createGameboard();

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

  function updateGameboard(newGameboard) {
    gameboard = newGameboard;
  }

  function hitPlayer(player, position) {
    player.getGameboard().receiveAttack(position);
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function getRandomCoordinate(maxX, maxY) {
    const randomX = getRandomInt(maxX);
    const randomY = getRandomInt(maxY);
    const randomCoordinate = [randomX, randomY];
    return randomCoordinate;
  }

  function randomHitPlayer(player) {
    let randomHitPosition = getRandomCoordinate(10, 10);
    let [randomX, randomY] = randomHitPosition;

    while (player.getGameboard().getHitboard()[randomY][randomX] === "hit") {
      randomHitPosition = getRandomCoordinate(10, 10);
      [randomX, randomY] = randomHitPosition;
    }
    player.getGameboard().receiveAttack(randomHitPosition);
  }

  return {
    getTurnStatus,
    switchTurns,
    getGameboard,
    updateGameboard,
    randomHitPlayer,
    hitPlayer,
  };
}

export function gameFactory() {
  const player = playerFactory();
  const computer = computerFactory();

  function getPlayer() {
    return player;
  }

  function getComputer() {
    return computer;
  }

  function devDefaultInitialize() {
    const carrier = createShip(5, "carrier");
    const battleship = createShip(4, "battleship");
    const cruiser = createShip(3, "cruiser");
    const submarine = createShip(3, "submarine");
    const destroyer = createShip(2, "destroyer");

    const updatedGameboard = player.getGameboard();

    updatedGameboard.placeShip(carrier, [0, 0], "H", PubSub);
    updatedGameboard.placeShip(battleship, [0, 1], "H", PubSub);
    updatedGameboard.placeShip(cruiser, [0, 2], "H", PubSub);
    updatedGameboard.placeShip(submarine, [0, 3], "H", PubSub);
    updatedGameboard.placeShip(destroyer, [0, 4], "H", PubSub);

    player.updateGameboard(updatedGameboard);

    const newComputerGameboard = { ...updatedGameboard };
    computer.updateGameboard(newComputerGameboard);
  }

  return {
    getPlayer,
    getComputer,
    devDefaultInitialize,
  };
}