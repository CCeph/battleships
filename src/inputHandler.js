import PubSub from "pubsub-js";

function createDOMCache() {
  const $placeShipsForm = document.querySelector(
    "[data-form-name='placeShips']"
  );
  return { $placeShipsForm };
}

const cachedDOM = createDOMCache();

function getShipInputElements() {
  const carrier = {
    $X: document.querySelector("#carrierX"),
    $Y: document.querySelector("#carrierY"),
    $H: document.querySelector("#carrierH"),
    $V: document.querySelector("#carrierV"),
  };
  const battleship = {
    $X: document.querySelector("#battleshipX"),
    $Y: document.querySelector("#battleshipY"),
    $H: document.querySelector("#battleshipH"),
    $V: document.querySelector("#battleshipV"),
  };
  const cruiser = {
    $X: document.querySelector("#cruiserX"),
    $Y: document.querySelector("#cruiserY"),
    $H: document.querySelector("#cruiserH"),
    $V: document.querySelector("#cruiserV"),
  };
  const submarine = {
    $X: document.querySelector("#submarineX"),
    $Y: document.querySelector("#submarineY"),
    $H: document.querySelector("#submarineH"),
    $V: document.querySelector("#submarineV"),
  };
  const destroyer = {
    $X: document.querySelector("#destroyerX"),
    $Y: document.querySelector("#destroyerY"),
    $H: document.querySelector("#destroyerH"),
    $V: document.querySelector("#destroyerV"),
  };
  return {
    carrier,
    battleship,
    cruiser,
    submarine,
    destroyer,
  };
}

function getShipValues(shipElements) {
  const shipValues = {};
  const shipEntries = Object.entries(shipElements);
  shipEntries.forEach((ship) => {
    const shipName = ship[0];
    const shipObject = ship[1];

    let shipAlignment = "";
    if (shipObject.$H.checked === true) {
      shipAlignment = "H";
    } else {
      shipAlignment = "V";
    }
    shipValues[shipName] = {
      X: shipObject.$X.value,
      Y: shipObject.$Y.value,
      alignment: shipAlignment,
    };
  });
  return shipValues;
}

function listenToInputs() {
  cachedDOM.$placeShipsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputElements = getShipInputElements();
    const shipValues = getShipValues(inputElements);
    console.log(shipValues);

    const shipsInputEvent = "shipsInputEvent";
    PubSub.publish(shipsInputEvent, shipValues);
  });
}

listenToInputs();
