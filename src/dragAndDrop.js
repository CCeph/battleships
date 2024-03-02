import PubSub from "pubsub-js";

function createDOMCache() {
  const $draggables = document.querySelectorAll(".draggable");
  const $playerCellsList = document.querySelectorAll(".player .boardCell");

  return {
    $draggables,
    $playerCellsList,
  };
}

const cachedDOM = createDOMCache();

cachedDOM.$draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});
