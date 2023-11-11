import {
  createShip,
  createGameboard,
  playerFactory,
  computerFactory,
  gameFactory,
} from "./dataHandler";

const allEqual = (arr) => arr.every((val) => val === arr[0]);

const PubSub = {
  publish: jest.fn(),
  subscribe: jest.fn(),
};

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

test("Ship factory, getName: returns the optional name for the ship", () => {
  const ship = createShip(5, "carrier");
  expect(ship.getName()).toBe("carrier");
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

  test("Gameboard, placing ships: Placing a ship adds it to totalShips of gameboard", () => {
    const cruiser = createShip(3);
    const playerGameboard = createGameboard();
    playerGameboard.placeShip(cruiser, [4, 4], "H");
    expect(playerGameboard.getTotalShips()).toContain(cruiser);
  });

  describe("Tests for placing ships with pubsub mocks", () => {
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

    test("Gameboard ignores ships trying to be placed out of bounds, and sends event", () => {
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

      const outOfBoundsEvent = "outOfBoundsEvent";
      expect(PubSub.publish).toBeCalledWith(outOfBoundsEvent);
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

describe("Player Tests", () => {
  test("Player, turn: retrieve player's turn status (on/off)", () => {
    const player = playerFactory();
    expect(player.getTurnStatus()).toBe("active");
  });

  test("Player, turn: switch player's turn status between on and off", () => {
    const player = playerFactory();
    expect(player.getTurnStatus()).toBe("active");
    player.switchTurns();
    expect(player.getTurnStatus()).toBe("inactive");
  });

  test("Player, gameboard: Each player has a unique gameboard", () => {
    const player = playerFactory();
    expect(player.getGameboard().getShipboard()).toStrictEqual([
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

  test("Player, updateGameboard: player's gameboard can be updated with a new one", () => {
    const player = playerFactory();
    const newGameboard = player.getGameboard();

    const carrier = createShip(5);
    newGameboard.placeShip(carrier, [0, 0], "H", PubSub);
    player.updateGameboard(newGameboard);
    expect(player.getGameboard().getShipboard()).toStrictEqual([
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
});

describe("Computer Tests", () => {
  let computer;
  let player;
  beforeEach(() => {
    computer = computerFactory();
    player = playerFactory();
  });

  test("Computer, turn: retrieve computer's turn status (on/off)", () => {
    expect(computer.getTurnStatus()).toBe("inactive");
  });

  test("Computer, turn: switch computer's turn status between on and off", () => {
    computer = computerFactory("active");
    expect(computer.getTurnStatus()).toBe("active");
    computer.switchTurns();
    expect(computer.getTurnStatus()).toBe("inactive");
  });

  test("Computer, hitPlayer: choose a specific coordinate to hit for testing purposes", () => {
    computer.hitPlayer(player, [0, 1]);
    expect(player.getGameboard().getHitboard()).toStrictEqual([
      [null, null, null, null, null, null, null, null, null, null],
      ["hit", null, null, null, null, null, null, null, null, null],
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

  test("Computer, randomHitPlayer: chooses a random coordinate to hit", () => {
    computer.randomHitPlayer(player);
    expect(player.getGameboard().getHitboard()).not.toStrictEqual([
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

  test("Computer, randomHitPlayer: doesn't choose a coordinate that was already hit before", () => {
    for (let x = 0; x <= 9; x += 1) {
      for (let y = 0; y <= 8; y += 1) {
        computer.hitPlayer(player, [x, y]);
      }
    }
    computer.randomHitPlayer(player);
    expect(player.getGameboard().getHitboard()[9]).not.toStrictEqual([
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ]);
  });

  test("Computer, updateGameboard: Computer's gameboard can be updated with a new one", () => {
    const newGameboard = computer.getGameboard();

    const carrier = createShip(5);
    newGameboard.placeShip(carrier, [0, 0], "H", PubSub);
    computer.updateGameboard(newGameboard);
    expect(computer.getGameboard().getShipboard()).toStrictEqual([
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
});

describe("Game Tests", () => {
  test.skip("Game, getPlayer: returns player", () => {});

  test.skip("Game, getComputer: returns computer", () => {});

  test("Game, devInitialize: places player and computer ships in predefined coordinates", () => {
    const game = gameFactory();
    game.devDefaultInitialize(PubSub);
    const shipboard = game.getPlayer().getGameboard().getShipboard();
    const carrierArray = [
      shipboard[0][0],
      shipboard[0][1],
      shipboard[0][2],
      shipboard[0][3],
      shipboard[0][4],
    ];
    const battleshipArray = [
      shipboard[1][0],
      shipboard[1][1],
      shipboard[1][2],
      shipboard[1][3],
    ];
    const cruiserArray = [shipboard[2][0], shipboard[2][1], shipboard[2][2]];
    const submarineArray = [shipboard[3][0], shipboard[3][1], shipboard[3][2]];
    const destroyerArray = [shipboard[4][0], shipboard[4][1]];

    const allShipsArray = [
      carrierArray,
      battleshipArray,
      cruiserArray,
      submarineArray,
      destroyerArray,
    ];

    const expectedNamesArray = [
      "carrier",
      "battleship",
      "cruiser",
      "submarine",
      "destroyer",
    ];

    const actualNamesArray = [
      carrierArray[0].getName(),
      battleshipArray[0].getName(),
      cruiserArray[0].getName(),
      submarineArray[0].getName(),
      destroyerArray[0].getName(),
    ];

    allShipsArray.forEach((shipArray) =>
      expect(allEqual(shipArray)).toBe(true)
    );

    expect(actualNamesArray).toStrictEqual(expectedNamesArray);

    expect(game.getComputer().getGameboard().getShipboard()).toStrictEqual(
      game.getPlayer().getGameboard().getShipboard()
    );
  });
});

test.skip("Side-effect of bad ship placement: Clear the board", () => {});
test.skip("Side-effect of bad ship placement: Inform user to repeat input after clearing the board.", () => {});
