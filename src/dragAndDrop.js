import PubSub from "pubsub-js";

function createDOMCache() {
  const $draggables = document.querySelectorAll(".draggable");
  const $playerCellsList = document.querySelectorAll(".player .boardCell");

  return {
    $draggables,
    $playerCellsList,
  };
}

const cachedDOM = createDOMCache();

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
    ship.orientation = "vertical";
  } else {
    ship.orientation = "horizontal";
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

function checkValidShipPlacement(ship, cell) {
  console.log(ship, cell);
}

cachedDOM.$playerCellsList.forEach((cell) => {
  cell.addEventListener("dragover", () => {
    const draggingElement = document.querySelector(".dragging");
    const ship = pureGetDraggingShip(draggingElement);
    // checkValidShipPlacement(ship, cell);
  });
});
