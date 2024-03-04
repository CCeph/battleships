import PubSub from "pubsub-js";
import { convertIndexToCoordinates } from "./commonUtils";

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

  function isAllSunk() {
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

  function hitPlayer(player, position, injectedPubSub) {
    player.getGameboard().receiveAttack(position, injectedPubSub);
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

  function randomHitPlayer(player, injectedPubSub) {
    let randomHitPosition = getRandomCoordinate(10, 10);
    let [randomX, randomY] = randomHitPosition;

    while (player.getGameboard().getHitboard()[randomY][randomX] === "hit") {
      randomHitPosition = getRandomCoordinate(10, 10);
      [randomX, randomY] = randomHitPosition;
    }
    player.getGameboard().receiveAttack(randomHitPosition, injectedPubSub);
  }

  function getValidRandomHitCoordinates(player) {
    let randomHitPosition = getRandomCoordinate(10, 10);
    let [randomX, randomY] = randomHitPosition;

    while (player.getGameboard().getHitboard()[randomY][randomX] === "hit") {
      randomHitPosition = getRandomCoordinate(10, 10);
      [randomX, randomY] = randomHitPosition;
    }
    return randomHitPosition;
  }

  return {
    getTurnStatus,
    switchTurns,
    getGameboard,
    updateGameboard,
    randomHitPlayer,
    getValidRandomHitCoordinates,
    hitPlayer,
    getRandomCoordinate,
  };
}

export function gameFactory() {
  let player = playerFactory();
  let computer = computerFactory();

  function getPlayer() {
    return player;
  }

  function getComputer() {
    return computer;
  }

  function resetGame() {
    player = playerFactory();
    computer = computerFactory();
    const renderShipsEvents = "renderShipsEvents";
    PubSub.publish(renderShipsEvents, { player, computer });

    const renderHitEvents = "renderHitEvents";
    PubSub.publish(renderHitEvents, { player, computer });

    const renderDefaultStatusEvent = "renderDefaultStatus";
    PubSub.publish(renderDefaultStatusEvent);
    // !!!Reinitialize game: allow player & computer to pick ships
  }

  function devDefaultInitialize(injectedPubSub) {
    const carrier = createShip(5, "carrier");
    const battleship = createShip(4, "battleship");
    const cruiser = createShip(3, "cruiser");
    const submarine = createShip(3, "submarine");
    const destroyer = createShip(2, "destroyer");

    const updatedPlayerGameboard = player.getGameboard();

    updatedPlayerGameboard.placeShip(carrier, [0, 0], "H", PubSub);
    updatedPlayerGameboard.placeShip(battleship, [0, 1], "H", PubSub);
    updatedPlayerGameboard.placeShip(cruiser, [0, 2], "H", PubSub);
    updatedPlayerGameboard.placeShip(submarine, [0, 3], "H", PubSub);
    updatedPlayerGameboard.placeShip(destroyer, [0, 4], "H", PubSub);

    const computerCarrier = createShip(5, "carrier");
    const computerBattleship = createShip(4, "battleship");
    const computerCruiser = createShip(3, "cruiser");
    const computerSubmarine = createShip(3, "submarine");
    const computerDestroyer = createShip(2, "destroyer");

    const updatedComputerGameboard = computer.getGameboard();
    updatedComputerGameboard.placeShip(computerCarrier, [0, 0], "H", PubSub);
    updatedComputerGameboard.placeShip(computerBattleship, [0, 1], "H", PubSub);
    updatedComputerGameboard.placeShip(computerCruiser, [0, 2], "H", PubSub);
    updatedComputerGameboard.placeShip(computerSubmarine, [0, 3], "H", PubSub);
    updatedComputerGameboard.placeShip(computerDestroyer, [0, 4], "H", PubSub);

    const renderShipsEvents = "renderShipsEvents";
    injectedPubSub.publish(renderShipsEvents, { player, computer });
  }

  function initializePlayer(shipValues) {
    const carrier = createShip(5, "carrier");
    const battleship = createShip(4, "battleship");
    const cruiser = createShip(3, "cruiser");
    const submarine = createShip(3, "submarine");
    const destroyer = createShip(2, "destroyer");

    const playerGameboard = player.getGameboard();

    playerGameboard.placeShip(
      carrier,
      [Number(shipValues.carrier.X), Number(shipValues.carrier.Y)],
      shipValues.carrier.alignment,
      PubSub
    );
    playerGameboard.placeShip(
      battleship,
      [Number(shipValues.battleship.X), Number(shipValues.battleship.Y)],
      shipValues.battleship.alignment,
      PubSub
    );
    playerGameboard.placeShip(
      cruiser,
      [Number(shipValues.cruiser.X), Number(shipValues.cruiser.Y)],
      shipValues.cruiser.alignment,
      PubSub
    );
    playerGameboard.placeShip(
      submarine,
      [Number(shipValues.submarine.X), Number(shipValues.submarine.Y)],
      shipValues.submarine.alignment,
      PubSub
    );
    playerGameboard.placeShip(
      destroyer,
      [Number(shipValues.destroyer.X), Number(shipValues.destroyer.Y)],
      shipValues.destroyer.alignment,
      PubSub
    );
  }

  function getRandomAlignment() {
    let shipAlignment;
    if (Math.random() >= 0.5) {
      shipAlignment = "H";
    } else {
      shipAlignment = "V";
    }
    return shipAlignment;
  }

  function checkNoOverlap(startingPosition, shipAlignment, shipLength) {
    const currentPosition = [...startingPosition];
    const shipboard = computer.getGameboard().getShipboard();
    for (let i = 0; i < shipLength; i += 1) {
      if (shipboard[currentPosition[1]][currentPosition[0]] !== null) {
        return false;
      }
      if (shipAlignment === "H") {
        currentPosition[0] += 1;
      } else {
        currentPosition[1] += 1;
      }
    }
    return true;
  }

  function getRandomPlacement(ship) {
    const shipLength = ship.getLength();
    const shipAlignment = getRandomAlignment();
    let maxX = 10;
    let maxY = 10;
    if (shipAlignment === "H") {
      maxX = 10 - shipLength;
    } else if (shipAlignment === "V") {
      maxY = 10 - shipLength;
    }
    let randomInBoundCoordinate = computer.getRandomCoordinate(maxX, maxY);

    while (
      !checkNoOverlap(randomInBoundCoordinate, shipAlignment, shipLength)
    ) {
      randomInBoundCoordinate = computer.getRandomCoordinate(maxX, maxY);
    }

    return { randomInBoundCoordinate, shipAlignment };
  }

  function randomlyPlaceShipOnComputer(ship) {
    const shipPlacement = getRandomPlacement(ship);
    const computerGameboard = computer.getGameboard();
    computerGameboard.placeShip(
      ship,
      shipPlacement.randomInBoundCoordinate,
      shipPlacement.shipAlignment,
      PubSub
    );
  }

  function initializeComputer() {
    const computerCarrier = createShip(5, "carrier");
    const computerBattleship = createShip(4, "battleship");
    const computerCruiser = createShip(3, "cruiser");
    const computerSubmarine = createShip(3, "submarine");
    const computerDestroyer = createShip(2, "destroyer");
    randomlyPlaceShipOnComputer(computerCarrier);
    randomlyPlaceShipOnComputer(computerBattleship);
    randomlyPlaceShipOnComputer(computerCruiser);
    randomlyPlaceShipOnComputer(computerSubmarine);
    randomlyPlaceShipOnComputer(computerDestroyer);
    // console.log(computer.getGameboard().getShipboard());
  }

  function initializeWithInputs(eventName, shipValues) {
    initializePlayer(shipValues);
    initializeComputer();
    const renderPlayerShips = "renderPlayerShips";
    PubSub.publish(renderPlayerShips, player);
  }

  function switchComputerTurns() {
    player.switchTurns();
    computer.switchTurns();
  }

  function computerHitController() {
    if (computer.getTurnStatus() === "inactive") {
      return;
    }

    if (
      computer.getGameboard().isAllSunk() ||
      player.getGameboard().isAllSunk()
    ) {
      return;
    }

    let [x, y] = computer.getValidRandomHitCoordinates(player);
    const newPlayerGameboard = player.getGameboard();

    // If there is a ship at coordinate, hit + hit again
    while (player.getGameboard().getShipboard()[y][x] !== null) {
      newPlayerGameboard.receiveAttack([x, y], PubSub);

      // Checks if computer won
      if (newPlayerGameboard.isAllSunk()) {
        const computerWinEvent = "computerWinEvent";
        PubSub.publish(computerWinEvent);
        break;
      }

      [x, y] = computer.getValidRandomHitCoordinates(player);
    }

    // If there is no ship at coordinate, hit + switch turns
    newPlayerGameboard.receiveAttack([x, y], PubSub);

    const renderHitEvents = "renderHitEvents";
    PubSub.publish(renderHitEvents, { player, computer });

    switchComputerTurns();
  }

  function switchPlayerTurns() {
    player.switchTurns();
    computer.switchTurns();

    computerHitController();
  }

  function playerAttackController(eventName, $hitCell) {
    if (player.getTurnStatus() === "inactive") {
      return;
    }

    const [x, y] = convertIndexToCoordinates($hitCell.id);
    const newGameboard = computer.getGameboard();

    if (computer.getGameboard().getHitboard()[y][x] !== null) {
      return;
    }

    // Checks if the game is already won
    if (
      computer.getGameboard().isAllSunk() ||
      player.getGameboard().isAllSunk()
    ) {
      return;
    }

    // If there is a ship at coordinate, hit + check if all ships sank + keep turn
    if (computer.getGameboard().getShipboard()[y][x] !== null) {
      newGameboard.receiveAttack([x, y], PubSub);
      if (newGameboard.isAllSunk()) {
        const playerWinEvent = "playerWinEvent";
        PubSub.publish(playerWinEvent);
      }
    }

    // If there is no ship at coordinate, hit + switch turns
    if (computer.getGameboard().getShipboard()[y][x] === null) {
      newGameboard.receiveAttack([x, y], PubSub);
      switchPlayerTurns();
    }

    const renderHitEvents = "renderHitEvents";
    PubSub.publish(renderHitEvents, { player, computer });
  }

  function listenToEvents() {
    const computerHitEvent = "computerHitEvent";
    PubSub.subscribe(computerHitEvent, playerAttackController);
  }

  return {
    getPlayer,
    getComputer,
    devDefaultInitialize,
    listenToEvents,
    resetGame,
    initializeWithInputs,
  };
}

const game = gameFactory();
game.listenToEvents();

const resetGameEvent = "resetGameEvent";
PubSub.subscribe(resetGameEvent, game.resetGame);

const shipsInputEvent = "shipsInputEvent";
PubSub.subscribe(shipsInputEvent, game.initializeWithInputs);
