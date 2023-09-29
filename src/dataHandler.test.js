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

    playerGameboard.getShipboard().forEach((row) => {
      expect(row.length === 10);
    });
  });

  test("Gameboard objects can place ships on the board", () => {
    const submarine = createShip(1);
    const playerGameboard = createGameboard();
    playerGameboard.placeShip(submarine, [0, 0], "H");
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

  test("Gameboard objects can place ships, with length bigger than 1, on the board", () => {
    const carrier = createShip(5);
    const playerGameboard = createGameboard();
    playerGameboard.placeShip(carrier, [0, 0], "H");
    expect(playerGameboard.getShipboard()).toStrictEqual([
      [
        carrier,
        carrier,
        carrier,
        carrier,
        carrier,
        null,
        null,
        null,
        null,
        null,
      ],
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

  test("Gameboard objects can place ships with length 3 vertically on the board", () => {
    const cruiser = createShip(3);
    const playerGameboard = createGameboard();
    playerGameboard.placeShip(cruiser, [0, 0], "V");
    expect(playerGameboard.getShipboard()).toStrictEqual([
      [cruiser, null, null, null, null, null, null, null, null, null],
      [cruiser, null, null, null, null, null, null, null, null, null],
      [cruiser, null, null, null, null, null, null, null, null, null],
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
