import PubSub from "pubsub-js";
import {
  convertIndexToCoordinates,
  createSequentialArrayFromTo,
} from "./commonUtils";

function createDOMCache() {
  const $draggables = document.querySelectorAll(".draggable");
  const $playerCellsList = document.querySelectorAll(".player .boardCell");
  const $shipCells = document.querySelectorAll(".ship-cell");
  const $port = document.querySelector("[data-port]");
  const $playerBoard = document.querySelector(".player .board");
  const $startGameButton = document.querySelector("[data-start-game]");

  return {
    $draggables,
    $playerCellsList,
    $shipCells,
    $port,
    $playerBoard,
    $startGameButton,
  };
}

const cachedDOM = createDOMCache();

const activeShipCell = {
  cellNumber: null,
  setCellNumber(newNumber) {
    this.cellNumber = newNumber;
  },
};

const lastHoveredBoardCell = {
  cell: null,
  setCell(newCell) {
    this.cell = newCell;
  },
};

const shipValues = {
  values: {},
  addShip(newShip) {
    const shipName = newShip.name;
    this.values[shipName] = newShip;
  },
  resetValues() {
    this.values = {};
  },
};

cachedDOM.$shipCells.forEach((cell) => {
  cell.addEventListener("mousedown", () => {
    activeShipCell.setCellNumber(Number(cell.dataset.cell));
  });
});

function pureGetDraggingShip(draggingElement) {
  const ship = {
    name: draggingElement.dataset.ship,
  };
  if ([...draggingElement.classList].includes("vertical")) {
    ship.orientation = "V";
  } else {
    ship.orientation = "H";
  }

  switch (ship.name) {
    case "carrier":
      ship.length = 5;
      break;

    case "battleship":
      ship.length = 4;
      break;

    case "cruiser":
      ship.length = 3;
      break;

    case "submarine":
      ship.length = 3;
      break;

    case "destroyer":
      ship.length = 2;
      break;

    default:
      break;
  }

  return ship;
}

function checkValidBounds(shipPlacement, selectedShipCell, shipLength) {
  let valid = true;

  if (shipPlacement.alignment === "V") {
    const topOverHang = selectedShipCell;
    const bottomOverHang = shipLength - (selectedShipCell + 1);
    if (
      shipPlacement.Y + bottomOverHang > 9 ||
      shipPlacement.Y - topOverHang < 0
    ) {
      valid = false;
      return valid;
    }
  }

  if (shipPlacement.alignment === "H") {
    const rightOverHang = shipLength - (selectedShipCell + 1);
    const leftOverHang = selectedShipCell;
    if (
      shipPlacement.X + rightOverHang > 9 ||
      shipPlacement.X - leftOverHang < 0
    ) {
      valid = false;
      return valid;
    }
  }

  return valid;
}

function checkNoOverlap(
  shipPlacement,
  selectedShipCell,
  shipLength,
  boardCell
) {
  let valid = true;

  if (shipPlacement.alignment === "V") {
    const topEndCell = boardCell - 10 * selectedShipCell;
    const bottomEndCell = topEndCell + (shipLength - 1) * 10;
    const cellsToCheck = createSequentialArrayFromTo(
      topEndCell,
      bottomEndCell,
      10
    );
    cellsToCheck.forEach((cell) => {
      const cellElement = document.querySelector(
        `[data-player-cell='${cell}']`
      );
      if ([...cellElement.classList].includes("occupied")) {
        valid = false;
      }
    });
    return valid;
  }

  if (shipPlacement.alignment === "H") {
    const leftEndCell = boardCell - selectedShipCell;
    const rightEndCell = leftEndCell + (shipLength - 1);
    const cellsToCheck = createSequentialArrayFromTo(
      leftEndCell,
      rightEndCell,
      1
    );
    cellsToCheck.forEach((cell) => {
      const cellElement = document.querySelector(
        `[data-player-cell='${cell}']`
      );
      if ([...cellElement.classList].includes("occupied")) {
        valid = false;
      }
    });
    return valid;
  }
}

function checkValidShipPlacement(ship, selectedShipCell, boardCell) {
  const coordinatesArray = convertIndexToCoordinates(boardCell.id);
  const shipPlacement = {
    X: coordinatesArray[0],
    Y: coordinatesArray[1],
    alignment: ship.orientation,
  };
  if (checkValidBounds(shipPlacement, selectedShipCell, ship.length)) {
    if (
      checkNoOverlap(shipPlacement, selectedShipCell, ship.length, boardCell.id)
    ) {
      return true;
    }
  }
  return false;
}

function addToShipValues(shipPlacement, startCell) {
  const coordinatesArray = convertIndexToCoordinates(startCell);
  const ship = {
    name: shipPlacement.name,
    X: coordinatesArray[0],
    Y: coordinatesArray[1],
    alignment: shipPlacement.alignment,
  };
  shipValues.addShip(ship);
}

function displayTempShip(ship, selectedShipCell, boardCell) {
  const coordinatesArray = convertIndexToCoordinates(boardCell.id);
  const shipPlacement = {
    name: ship.name,
    X: coordinatesArray[0],
    Y: coordinatesArray[1],
    alignment: ship.orientation,
  };
  const shipLength = ship.length;
  if (shipPlacement.alignment === "H") {
    const leftEndCell = boardCell.id - selectedShipCell;
    const rightEndCell = leftEndCell + (shipLength - 1);
    const cellsToCheck = createSequentialArrayFromTo(
      leftEndCell,
      rightEndCell,
      1
    );
    addToShipValues(shipPlacement, leftEndCell);
    cellsToCheck.forEach((cell) => {
      const cellElement = document.querySelector(
        `[data-player-cell='${cell}']`
      );
      cellElement.classList.add("occupied");
    });
  }

  if (shipPlacement.alignment === "V") {
    const topEndCell = boardCell.id - 10 * selectedShipCell;
    const bottomEndCell = topEndCell + (shipLength - 1) * 10;
    const cellsToCheck = createSequentialArrayFromTo(
      topEndCell,
      bottomEndCell,
      10
    );
    addToShipValues(shipPlacement, topEndCell);
    cellsToCheck.forEach((cell) => {
      const cellElement = document.querySelector(
        `[data-player-cell='${cell}']`
      );
      cellElement.classList.add("occupied");
    });
  }
}

cachedDOM.$playerCellsList.forEach((cell) => {
  cell.addEventListener("dragover", () => {
    lastHoveredBoardCell.setCell(cell);
  });
});

cachedDOM.$draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", (e) => {
    const { cell } = lastHoveredBoardCell;
    const draggingElement = document.querySelector(".dragging");
    draggable.classList.remove("dragging");
    const selectedShipCell = activeShipCell.cellNumber;
    const ship = pureGetDraggingShip(draggingElement);
    const { $playerBoard } = cachedDOM;
    const bounds = $playerBoard.getBoundingClientRect();
    if (cell === null) {
      return;
    }
    if (
      e.clientX > bounds.left &&
      e.clientX < bounds.right &&
      e.clientY > bounds.top &&
      e.clientY < bounds.bottom
    ) {
      if (checkValidShipPlacement(ship, selectedShipCell, cell)) {
        displayTempShip(ship, selectedShipCell, cell);
        draggingElement.classList.add("hide");
      }
    }
  });
});

cachedDOM.$startGameButton.addEventListener("click", () => {
  const inputValues = shipValues.values;
  if (
    "carrier" in inputValues &&
    "battleship" in inputValues &&
    "cruiser" in inputValues &&
    "submarine" in inputValues &&
    "destroyer" in inputValues
  ) {
    const shipsInputEvent = "shipsInputEvent";
    PubSub.publish(shipsInputEvent, shipValues.values);
  } else {
    const badShipPlacementEvent = "badShipPlacementEvent";
    PubSub.publish(badShipPlacementEvent);
  }
});

const resetGameEvent = "resetGameEvent";
PubSub.subscribe(resetGameEvent, () => {
  shipValues.resetValues();
});
