export default function createShip(length) {
  const totalHits = 0;

  function hit() {
    this.totalHits += 1;
  }

  function isSunk() {
    if (this.totalHits === this.length) {
      return true;
    }
    return false;
  }
  return { length, totalHits, hit, isSunk };
}
