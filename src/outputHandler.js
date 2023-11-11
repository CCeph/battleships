import PubSub from "pubsub-js";
import { calculateBoardIndex } from "./commonUtils";

function createDOMCache() {
  const $playerCellsList = document.querySelectorAll(".player .boardCell");
  const $computerCellsList = document.querySelectorAll(".computer .boardCell");
  return { $playerCellsList, $computerCellsList };
}

const cachedDOM = createDOMCache();

function renderShipboards(eventName, players) {
  const { computer, player } = players;

  const playerShipboard = player.getGameboard().getShipboard();
  const computerShipboard = computer.getGameboard().getShipboard();

  playerShipboard.forEach((row, rowNumber) => {
    row.forEach((val, valNumber) => {
      if (val !== null) {
        const divID = `${calculateBoardIndex(rowNumber, valNumber)}`;
        const targetDiv = cachedDOM.$playerCellsList[divID];
        targetDiv.classList.add("occupied");
      }
    });
  });

  computerShipboard.forEach((row, rowNumber) => {
    row.forEach((val, valNumber) => {
      if (val !== null) {
        const divID = `${calculateBoardIndex(rowNumber, valNumber)}`;
        const targetDiv = cachedDOM.$computerCellsList[divID];
        targetDiv.classList.add("occupied");
      }
    });
  });
}

function renderHitboards(eventName, players) {
  const { computer, player } = players;

  const playerHitboard = player.getGameboard().getHitboard();
  const computerHitboard = computer.getGameboard().getHitboard();

  playerHitboard.forEach((row, rowNumber) => {
    row.forEach((val, valNumber) => {
      if (val !== null) {
        const divID = `${calculateBoardIndex(rowNumber, valNumber)}`;
        const targetDiv = cachedDOM.$playerCellsList[divID];
        targetDiv.textContent = "X";
      }
    });
  });

  computerHitboard.forEach((row, rowNumber) => {
    row.forEach((val, valNumber) => {
      if (val !== null) {
        const divID = `${calculateBoardIndex(rowNumber, valNumber)}`;
        const targetDiv = cachedDOM.$computerCellsList[divID];
        targetDiv.textContent = "X";
      }
    });
  });
}

const renderShipsEvents = "renderShipsEvents";
PubSub.subscribe(renderShipsEvents, renderShipboards);

const renderHitEvents = "renderHitEvents";
PubSub.subscribe(renderHitEvents, renderHitboards);
