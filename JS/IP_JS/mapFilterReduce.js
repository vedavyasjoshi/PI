const nums = [1, 2, 3, 4];

// Map
Array.prototype.myMap = function (cb) {
  let res = [];
  for (let i = 0; i < this.length; i++) {
    res.push(cb(this[i], i, this));
  }
  return res;
};
const multiplyThree = nums.myMap((num, i, arr) => {
  return num * 3 + i;
});
console.log(multiplyThree);

// Filter
Array.prototype.myFilter = function (cb) {
  let res = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) res.push(this[i]);
  }
  return res;
};
const moreThanTwo = nums.myFilter((num, i, arr) => {
  return num > 2;
});
console.log(moreThanTwo);

// Reduce
// If acc is not initialized, it takes the first value, if arr is empty then err
Array.prototype.myReduce = function (cb, initialValue) {
  if (!init && this.length === 0)
    throw new Error("Invalid fun call, no initial value");
  let acc = initialValue;
  for (let i = 0; i < this.length; i++) {
    acc = acc ? cb(acc, this[i], i, this) : this[i];
  }
  return acc;
};
const total = nums.myReduce((acc, curr, i, arr) => {
  return acc + curr;
}, 0);
console.log(total);

// map vs forEach => map returns new Array, forEach doesnt.
// We can chain other functions on each other, map, filter, reduce. but not on forEach
