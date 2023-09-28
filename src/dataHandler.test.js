import createShip from "./dataHandler";

test("Ship factory creates an object with correct length provided", () => {
  expect(createShip(4).length).toBe(4);
});

test("Ship factory creates objects with a default hit count of 0", () => {
  expect(createShip(4).totalHits).toBe(0);
});

test("Ships have a hit method to increase their totalHits", () => {
  const ship = createShip(2);
  expect(ship.totalHits).toBe(0);
  ship.hit();
  expect(ship.totalHits).toBe(1);
});

test("Ship factory creates objects that can tell if they've been sunk or not", () => {
  const ship = createShip(1);
  expect(ship.isSunk()).toBeFalsy();
  ship.hit();
  expect(ship.isSunk()).toBeTruthy();
});
