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

  test("Gameboard objects can place ships in the middle vertically", () => {
    const cruiser = createShip(3);
    const playerGameboard = createGameboard();
    playerGameboard.placeShip(cruiser, [4, 4], "V");
    expect(playerGameboard.getShipboard()).toStrictEqual([
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, cruiser, null, null, null, null, null],
      [null, null, null, null, cruiser, null, null, null, null, null],
      [null, null, null, null, cruiser, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ]);
  });

  test("Gameboard objects can place ships in the middle horizontally", () => {
    const cruiser = createShip(3);
    const playerGameboard = createGameboard();
    playerGameboard.placeShip(cruiser, [4, 4], "H");
    expect(playerGameboard.getShipboard()).toStrictEqual([
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, cruiser, cruiser, cruiser, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ]);
  });

  test("Gameboard, placing ships: Can place multiple ships on the same board", () => {
    const carrier = createShip(5);
    const cruiser = createShip(3);
    const submarine = createShip(1);
    const playerGameboard = createGameboard();
    playerGameboard.placeShip(cruiser, [4, 4], "H");
    playerGameboard.placeShip(carrier, [1, 1], "V");
    playerGameboard.placeShip(submarine, [9, 9], "H");
    expect(playerGameboard.getShipboard()).toStrictEqual([
      [null, null, null, null, null, null, null, null, null, null],
      [null, carrier, null, null, null, null, null, null, null, null],
      [null, carrier, null, null, null, null, null, null, null, null],
      [null, carrier, null, null, null, null, null, null, null, null],
      [null, carrier, null, null, cruiser, cruiser, cruiser, null, null, null],
      [null, carrier, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, submarine],
    ]);
  });

  test.skip("Gameboard, placing ships: Ships can't be placed within 1 box of one another", () => {});

  test("Gameboard, placing ships: Placing a ship adds it to totalShips of gameboard", () => {
    const cruiser = createShip(3);
    const playerGameboard = createGameboard();
    playerGameboard.placeShip(cruiser, [4, 4], "H");
    expect(playerGameboard.getTotalShips()).toContain(cruiser);
  });

  test.skip("If gameboard can throw and catch an error for out of bounds, that would be nice", () => {});

  describe("Tests for placing ships with pubsub mocks", () => {
    let PubSub;
    beforeEach(() => {
      PubSub = {
        publish: jest.fn(),
        subscribe: jest.fn(),
      };
    });

    test("Gameboard, placing ships: Ships can't be placed on top of each other.", () => {
      const carrier = createShip(5);
      const cruiser = createShip(3);
      const submarine = createShip(1);
      const playerGameboard = createGameboard();
      playerGameboard.placeShip(cruiser, [4, 4], "H", PubSub);
      playerGameboard.placeShip(carrier, [4, 1], "V", PubSub);
      playerGameboard.placeShip(submarine, [9, 9], "H", PubSub);

      const badShipPlacementEvent = "badShipPlacementEvent";
      expect(PubSub.publish).toBeCalledWith(badShipPlacementEvent);
    });

    test("Gameboard ignores ships trying to be placed out of bounds", () => {
      const cruiser = createShip(3);
      const playerGameboard = createGameboard();
      playerGameboard.placeShip(cruiser, [8, 8], "H", PubSub);
      expect(playerGameboard.getShipboard()).toStrictEqual([
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
      ]);
    });
  });

  test("Gameboard can get hitboard", () => {
    const playerGameboard = createGameboard();
    expect(playerGameboard.getHitboard()).toStrictEqual([
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
    ]);
  });

  test("Gameboards can receive attacks and record the hits", () => {
    const cruiser = createShip(3);
    const playerGameboard = createGameboard();
    playerGameboard.placeShip(cruiser, [0, 0], "V");
    playerGameboard.receiveAttack([0, 0]);
    expect(playerGameboard.getHitboard()[0][0]).toBe("hit");
  });

  test("Gameboard, receive attack recognizes if a ship was hit", () => {
    const cruiser = createShip(3);
    const playerGameboard = createGameboard();
    playerGameboard.placeShip(cruiser, [2, 0], "V");
    playerGameboard.receiveAttack([2, 0]);
    expect(cruiser.getTotalHits()).toBe(1);
  });

  test("Gameboard, receive attack: hitting the same location does not hit ship twice", () => {
    const cruiser = createShip(3);
    const playerGameboard = createGameboard();
    playerGameboard.placeShip(cruiser, [2, 0], "V");
    playerGameboard.receiveAttack([2, 0]);
    playerGameboard.receiveAttack([2, 0]);
    expect(cruiser.getTotalHits()).toBe(1);
  });

  test.skip("Gameboard, receive attack: checks if all ships sunk after hit", () => {});

  test("Gameboard, isAllSunk: works with 1 ship", () => {
    const cruiser = createShip(3);
    const playerGameboard = createGameboard();
    playerGameboard.placeShip(cruiser, [2, 0], "V");
    playerGameboard.receiveAttack([2, 0]);
    playerGameboard.receiveAttack([2, 1]);
    playerGameboard.receiveAttack([2, 2]);
    const totalShips = playerGameboard.getTotalShips();
    expect(playerGameboard.isAllSunk(totalShips)).toBe(true);
  });

  test("Gameboard, isAllSunk: works with 2 ships", () => {
    const cruiser = createShip(3);
    const submarine = createShip(1);
    const playerGameboard = createGameboard();
    playerGameboard.placeShip(cruiser, [2, 0], "V");
    playerGameboard.placeShip(submarine, [8, 7], "H");
    playerGameboard.receiveAttack([2, 0]);
    playerGameboard.receiveAttack([2, 1]);
    playerGameboard.receiveAttack([2, 2]);
    playerGameboard.receiveAttack([8, 7]);
    const totalShips = playerGameboard.getTotalShips();
    expect(playerGameboard.isAllSunk(totalShips)).toBe(true);
  });
});

test.skip("Side-effect of bad ship placement: Clear the board", () => {});
test.skip("Side-effect of bad ship placement: Inform user to repeat input after clearing the board.", () => {});
