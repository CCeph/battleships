import { calculateBoardIndex, convertIndexToCoordinates } from "./commonUtils";

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
