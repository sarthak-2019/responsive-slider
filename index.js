const wrapper = document.querySelector(".CardsContainer");
const list = document.querySelector(".Cards");
const items = Array.from(document.querySelectorAll(".Card"));

//general settings
const settings = {
  observerOptions: {
    root: list, //list for parent element, Or null for viewport
    rootMargin: "0px",
    threshold: 0.85,
  },
};

/*
  Simple State control Functionality
  */
const state = {
  isPaginationRendered: false,
  currentPageIndex: 0,
  intersectingTargetsIndexes: [],
  setState: function (targetName, curentTargetValue, newTargetValue) {
    //assign new value
    this[targetName] = newTargetValue;
    //run call back function
    stateChange(targetName, curentTargetValue, newTargetValue);
  },
};

function stateChange(targetName, target, value) {
  //logging is a feature not a bug
  console.log(
    `😲 State of ${targetName} with value ${target} has changed to ${value}`
  );
}
/* Intersection Observer Functionality */

// create an observer with the list as intersection root
const observer = new IntersectionObserver(
  onIntersectionObserved,
  settings.observerOptions
);

// observe each item
items.forEach((item, index) => {
  observer.observe(item);
});

let map = [];

function onIntersectionObserved(entries) {
  entries.forEach((entry, index) => {
    const intersectingIndex = items.indexOf(entry.target);

    if (entry.isIntersecting) {
      map = [...map, intersectingIndex];

      state.setState(
        "currentPageIndex",
        state.currentPageIndex,
        intersectingIndex
      );
    } else {
      map = map.filter((item) => item !== intersectingIndex);
    }
  });

  const intersectingIndexes = map.sort((a, b) => a - b);

  state.setState(
    "intersectingTargetsIndexes",
    state.intersectingTargetsIndexes,
    intersectingIndexes
  );
}
