export function calculateBoardIndex(rowIndex, colIndex) {
  return rowIndex * 10 + colIndex;
}

export function convertIndexToCoordinates(index) {
  const x = index % 10;
  const y = Math.floor(index / 10);
  return [x, y];
}

export function checkValidBounds(shipPlacement, shipLength) {
  let valid = true;

  if (shipPlacement.alignment === "V") {
    if (shipPlacement.Y > 10 - shipLength) {
      valid = false;
      return valid;
    }
  }

  if (shipPlacement.alignment === "H") {
    if (shipPlacement.X > 10 - shipLength) {
      valid = false;
      return valid;
    }
  }

  return valid;
}

export function createSequentialArrayFromTo(initial, end, interval) {
  const array = [];
  for (let i = initial; i <= end; i += interval) {
    array.push(i);
  }
  return array;
}
