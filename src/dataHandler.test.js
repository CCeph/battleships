import { createShip, createGameboard } from "./dataHandler";

test("Ship factory creates an object with correct length provided", () => {
  expect(createShip(4).getLength()).toBe(4);
});

test("Ship factory creates objects with a default hit count of 0", () => {
  expect(createShip(4).getTotalHits()).toBe(0);
});

test("Ships have a hit method to increase their totalHits", () => {
  const ship = createShip(2);
  expect(ship.getTotalHits()).toBe(0);
  ship.hit();
  expect(ship.getTotalHits()).toBe(1);
});

test("Ship factory creates objects that can tell if they've been sunk or not", () => {
  const ship = createShip(1);
  expect(ship.isSunk()).toBeFalsy();
  ship.hit();
  expect(ship.isSunk()).toBeTruthy();
});

describe("Gameboard tests", () => {
  test("Gameboard factory creates 10x10 shipboard", () => {
    const playerGameboard = createGameboard();

    /* const emptyShipboard = [
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
    ]; */

    playerGameboard.getShipboard().forEach((row) => {
      expect(row.length === 10);
    });
  });

  test("Gameboard objects can place ships on the board", () => {
    const submarine = createShip(1, "H");
    const playerGameboard = createGameboard();
    playerGameboard.placeShip(submarine, [0, 0]);
    expect(playerGameboard.getShipboard()).toStrictEqual([
      [submarine, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ]);
  });
});
