import {
  calculateBoardIndex,
  convertIndexToCoordinates,
  checkValidBounds,
} from "./commonUtils";

test("calculateBoardIndex: returns the correct index corresponding to HTML code", () => {
  expect(calculateBoardIndex(0, 0)).toBe(0);
  expect(calculateBoardIndex(0, 9)).toBe(9);
  expect(calculateBoardIndex(1, 1)).toBe(11);
  expect(calculateBoardIndex(3, 5)).toBe(35);
});

test("convertIndexToCoordinates: returns the correct x,y coordinates from index", () => {
  expect(convertIndexToCoordinates(0)).toStrictEqual([0, 0]);
  expect(convertIndexToCoordinates(9)).toStrictEqual([9, 0]);
  expect(convertIndexToCoordinates(15)).toStrictEqual([5, 1]);
  expect(convertIndexToCoordinates(30)).toStrictEqual([0, 3]);
});

test("checkOutOfBounds: works properly horizontally", () => {
  let shipPlacement = { X: 0, Y: 0, alignment: "H" };
  let shipLength = 5;
  expect(checkValidBounds(shipPlacement, shipLength)).toBe(true);

  shipPlacement = { X: 5, Y: 0, alignment: "H" };
  shipLength = 5;
  expect(checkValidBounds(shipPlacement, shipLength)).toBe(true);

  shipPlacement = { X: 6, Y: 0, alignment: "H" };
  shipLength = 5;
  expect(checkValidBounds(shipPlacement, shipLength)).toBe(false);

  shipPlacement = { X: 7, Y: 7, alignment: "H" };
  shipLength = 5;
  expect(checkValidBounds(shipPlacement, shipLength)).toBe(false);

  shipPlacement = { X: 9, Y: 9, alignment: "H" };
  shipLength = 1;
  expect(checkValidBounds(shipPlacement, shipLength)).toBe(true);

  shipPlacement = { X: 7, Y: 3, alignment: "H" };
  shipLength = 3;
  expect(checkValidBounds(shipPlacement, shipLength)).toBe(true);

  shipPlacement = { X: 8, Y: 3, alignment: "H" };
  shipLength = 3;
  expect(checkValidBounds(shipPlacement, shipLength)).toBe(false);
});

test("checkOutOfBounds: works properly vertically", () => {
  let shipPlacement = { X: 0, Y: 0, alignment: "V" };
  let shipLength = 5;
  expect(checkValidBounds(shipPlacement, shipLength)).toBe(true);

  shipPlacement = { X: 9, Y: 0, alignment: "V" };
  shipLength = 5;
  expect(checkValidBounds(shipPlacement, shipLength)).toBe(true);

  shipPlacement = { X: 0, Y: 9, alignment: "V" };
  shipLength = 5;
  expect(checkValidBounds(shipPlacement, shipLength)).toBe(false);

  shipPlacement = { X: 0, Y: 5, alignment: "V" };
  shipLength = 5;
  expect(checkValidBounds(shipPlacement, shipLength)).toBe(true);

  shipPlacement = { X: 0, Y: 6, alignment: "V" };
  shipLength = 5;
  expect(checkValidBounds(shipPlacement, shipLength)).toBe(false);

  shipPlacement = { X: 9, Y: 9, alignment: "V" };
  shipLength = 5;
  expect(checkValidBounds(shipPlacement, shipLength)).toBe(false);

  shipPlacement = { X: 9, Y: 5, alignment: "V" };
  shipLength = 5;
  expect(checkValidBounds(shipPlacement, shipLength)).toBe(true);

  shipPlacement = { X: 9, Y: 6, alignment: "V" };
  shipLength = 5;
  expect(checkValidBounds(shipPlacement, shipLength)).toBe(false);
});
