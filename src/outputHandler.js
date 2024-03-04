import PubSub from "pubsub-js";
import { calculateBoardIndex } from "./commonUtils";

function createDOMCache() {
  const $playerCellsList = document.querySelectorAll(".player .boardCell");
  const $computerCellsList = document.querySelectorAll(".computer .boardCell");
  const $gameStatus = document.querySelector("[data-gameStatus]");
  const $ships = document.querySelectorAll("[data-ship]");
  const $startGameButton = document.querySelector("[data-start-game]");
  return {
    $playerCellsList,
    $computerCellsList,
    $gameStatus,
    $ships,
    $startGameButton,
  };
}

const cachedDOM = createDOMCache();

function renderShipboards(eventName, players) {
  const { computer, player } = players;

  const playerShipboard = player.getGameboard().getShipboard();
  const computerShipboard = computer.getGameboard().getShipboard();
  const gameStatus = cachedDOM.$gameStatus;
  gameStatus.textContent = "The game has started!";

  const { $startGameButton } = cachedDOM;
  $startGameButton.classList.add("hide");

  playerShipboard.forEach((row, rowNumber) => {
    row.forEach((val, valNumber) => {
      const divID = `${calculateBoardIndex(rowNumber, valNumber)}`;
      const targetDiv = cachedDOM.$playerCellsList[divID];
      targetDiv.classList.remove("occupied");
      if (val !== null) {
        targetDiv.classList.add("occupied");
      }
    });
  });

  computerShipboard.forEach((row, rowNumber) => {
    row.forEach((val, valNumber) => {
      const divID = `${calculateBoardIndex(rowNumber, valNumber)}`;
      const targetDiv = cachedDOM.$computerCellsList[divID];
      targetDiv.classList.remove("occupied");
      if (val !== null) {
        targetDiv.classList.add("occupied");
      }
    });
  });
}

function renderPlayerShipboard(eventName, player) {
  const playerShipboard = player.getGameboard().getShipboard();
  const gameStatus = cachedDOM.$gameStatus;

  gameStatus.textContent = "The game has started!";

  const { $startGameButton } = cachedDOM;
  $startGameButton.classList.add("hide");

  playerShipboard.forEach((row, rowNumber) => {
    row.forEach((val, valNumber) => {
      const divID = `${calculateBoardIndex(rowNumber, valNumber)}`;
      const targetDiv = cachedDOM.$playerCellsList[divID];
      targetDiv.classList.remove("occupied");
      if (val !== null) {
        targetDiv.classList.add("occupied");
      }
    });
  });
}

function renderHitboards(eventName, players) {
  const { computer, player } = players;

  const playerHitboard = player.getGameboard().getHitboard();
  const computerHitboard = computer.getGameboard().getHitboard();
  const computerShipboard = computer.getGameboard().getShipboard();

  playerHitboard.forEach((row, rowNumber) => {
    row.forEach((val, valNumber) => {
      const divID = `${calculateBoardIndex(rowNumber, valNumber)}`;
      const targetDiv = cachedDOM.$playerCellsList[divID];
      targetDiv.textContent = "";
      if (val !== null) {
        targetDiv.textContent = "X";
      }
    });
  });

  computerHitboard.forEach((row, rowNumber) => {
    row.forEach((val, valNumber) => {
      const divID = `${calculateBoardIndex(rowNumber, valNumber)}`;
      const targetDiv = cachedDOM.$computerCellsList[divID];
      targetDiv.textContent = "";
      if (val !== null) {
        targetDiv.textContent = "X";
        if (computerShipboard[rowNumber][valNumber] !== null) {
          targetDiv.classList.add("occupied");
        }
      }
    });
  });
}

function renderPlayerWin() {
  const gameStatusTitle = cachedDOM.$gameStatus;
  gameStatusTitle.textContent =
    "Player Wins!  Click 'Reset Game' to Play Again";
}

function renderComputerWin() {
  const gameStatusTitle = cachedDOM.$gameStatus;
  gameStatusTitle.textContent =
    "Computer Wins! Click 'Reset Game' to Play Again";
}

function renderBadShipPlacement() {
  const gameStatusTitle = cachedDOM.$gameStatus;
  gameStatusTitle.textContent =
    "Not all ships are placed, or they are placed incorrectly. Please try again.";
}

function showPortShips() {
  const { $ships } = cachedDOM;
  const ships = [...$ships];
  ships.forEach((ship) => {
    ship.classList.remove("hide");
  });

  const { $startGameButton } = cachedDOM;
  $startGameButton.classList.remove("hide");
}

function renderDefaultStatus() {
  const gameStatusTitle = cachedDOM.$gameStatus;
  gameStatusTitle.textContent =
    "Place all your ships by dragging and dropping onto the board then start the game";

  showPortShips();
}

const renderShipsEvents = "renderShipsEvents";
PubSub.subscribe(renderShipsEvents, renderShipboards);

const renderPlayerShips = "renderPlayerShips";
PubSub.subscribe(renderPlayerShips, renderPlayerShipboard);

const renderHitEvents = "renderHitEvents";
PubSub.subscribe(renderHitEvents, renderHitboards);

const playerWinEvent = "playerWinEvent";
PubSub.subscribe(playerWinEvent, renderPlayerWin);

const computerWinEvent = "computerWinEvent";
PubSub.subscribe(computerWinEvent, renderComputerWin);

const badShipPlacementEvent = "badShipPlacementEvent";
PubSub.subscribe(badShipPlacementEvent, renderBadShipPlacement);

const renderDefaultStatusEvent = "renderDefaultStatus";
PubSub.subscribe(renderDefaultStatusEvent, renderDefaultStatus);
