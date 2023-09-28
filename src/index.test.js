import checkTestingWorks from "./index";

test("adds 1 + 2 to equal 3", () => {
  expect(checkTestingWorks(1, 2)).toBe(3);
});
