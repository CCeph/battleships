import PubSub from "pubsub-js";

function createDOMCache() {
  const $draggables = document.querySelectorAll(".draggable");

  return {
    $draggables,
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
