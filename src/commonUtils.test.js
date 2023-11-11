import calculateBoardIndex from "./commonUtils";

test("calculateBoardIndex: returns the correct index corresponding to HTML code", () => {
  expect(calculateBoardIndex(0, 0)).toBe(0);
  expect(calculateBoardIndex(0, 9)).toBe(9);
  expect(calculateBoardIndex(1, 1)).toBe(11);
  expect(calculateBoardIndex(3, 5)).toBe(35);
});
