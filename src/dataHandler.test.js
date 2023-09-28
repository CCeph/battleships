import createShip from "./dataHandler";

test("Ship factory creates an object with correct length provided", () => {
  expect(createShip(4).length).toBe(4);
});
