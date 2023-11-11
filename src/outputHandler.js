import PubSub from "pubsub-js";
import calculateBoardIndex from "./commonUtils";

function createDOMCache() {
  const $playerCellsList = document.querySelectorAll(".player .boardCell");
  const $computerCellsList = document.querySelectorAll(".computer .boardCell");
  return { $playerCellsList, $computerCellsList };
}

const cachedDOM = createDOMCache();

function renderGameboards(eventName, players) {
  console.log(players);
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

const renderShipsEvents = "renderShipsEvents";
PubSub.subscribe(renderShipsEvents, renderGameboards);
