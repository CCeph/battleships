import PubSub from "pubsub-js";
import { convertIndexToCoordinates } from "./commonUtils";

function createDOMCache() {
  const $draggables = document.querySelectorAll(".draggable");
  const $playerCellsList = document.querySelectorAll(".player .boardCell");
  const $shipCells = document.querySelectorAll(".ship-cell");

  return {
    $draggables,
    $playerCellsList,
    $shipCells,
  };
}

const cachedDOM = createDOMCache();

const activeShipCell = {
  cellNumber: null,
  setCellNumber(newNumber) {
    this.cellNumber = newNumber;
  },
};

cachedDOM.$shipCells.forEach((cell) => {
  cell.addEventListener("mousedown", () => {
    activeShipCell.setCellNumber(Number(cell.dataset.cell));
  });
});

cachedDOM.$draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

/* function checkValidShipPlacement(shipInput) {
  const shipArray = Object.entries(shipInput);
  let mockShipboard = [
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
  const valid = shipArray.every((ship) => {
    const shipName = ship[0];
    const shipPlacement = ship[1];
    const shipLength = getShipLengthByName(shipName);

    const validBounds = checkValidBounds(shipPlacement, shipLength);
    const validNoOverlap = checkNoOverlap(
      shipPlacement,
      shipLength,
      mockShipboard
    );
    mockShipboard = validNoOverlap.mockShipboardCopy;
    if (validBounds === true && validNoOverlap.valid === true) {
      return true;
    }
    return false;
  });
  return valid;
} */

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

    case "destroyer":
      ship.length = 2;
      break;

    case "submarine":
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

function checkValidShipPlacement(ship, selectedShipCell, boardCell) {
  const coordinatesArray = convertIndexToCoordinates(boardCell.id);
  const shipPlacement = {
    X: coordinatesArray[0],
    Y: coordinatesArray[1],
    alignment: ship.orientation,
  };
  checkValidBounds(shipPlacement, selectedShipCell, ship.length);
}

cachedDOM.$playerCellsList.forEach((cell) => {
  cell.addEventListener("dragover", () => {
    const draggingElement = document.querySelector(".dragging");
    const selectedShipCell = activeShipCell.cellNumber;
    const ship = pureGetDraggingShip(draggingElement);
    checkValidShipPlacement(ship, selectedShipCell, cell);
  });
});
