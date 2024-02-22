// Debounce used in searchbar, throttling used in infinite scrolling

// Create a button and add debounce as follows
// Show "Button pressed (X) times" everytime the button is pressed
// Increase "Triggered (Y) times" count after 800ms of debounce
const btn = document.querySelector(".increment_btn");
const btnPress = document.querySelector(".increment_pressed");
const count = document.querySelector(".increment_count");

var pressedCount = 0;
var triggeredCount = 0;

const debouncedCount = myDebounce(() => {
  count.innerHTML = ++triggeredCount;
}, 800);

btn.addEventListener("click", () => {
  btnPress.innerHTML = ++pressedCount;
  debouncedCount();
});

// Create a button and add throttle as follows
// Show "Button pressed (X) times" everytime the button is pressed
// Increase "Triggered (Y) times" count after 800ms of throttle
const throttledCount = myThrottle(() => {
  count.innerHTML = ++triggeredCount;
}, 800);

btn.addEventListener("click", () => {
  btnPress.innerHTML = ++pressedCount;
  throttledCount();
});

// Debounce polyfill
function myDebounce(cb, d) {
  let timer;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, d);
  };
}

// Throttle polyfill
function myThrottle(cb, d) {
  let last = 0;
  return (...args) => {
    let now = new Date().getTime();
    if (now - last < d) return;
    last = now;
    return cb(...args);
  };
}
