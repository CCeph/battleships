export function calculateBoardIndex(rowIndex, colIndex) {
  return rowIndex * 10 + colIndex;
}

export function convertIndexToCoordinates(index) {
  const x = index % 10;
  const y = Math.floor(index / 10);
  return [x, y];
}
