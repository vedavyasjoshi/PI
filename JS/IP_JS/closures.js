// Every closure has 3 scopes: localStorage(own), outer function, global

function makeFunc() {
  var name = "abc";
  function displayName(num) {
    console.log(name, num);
  }
  return displayName;
}
makeFunc()(5); // abc

let cnt = 0;
(function fn() {
  if (cnt == 0) {
    let cnt = 1;
    console.log(cnt); // 1, shadowing
  }
  console.log(cnt); // 0, block scoped
})(); // 1, 0

var addSix = createBase(6); // create fn
addSix(10); // should return 16
addSix(21); // should return 27
function createBase(num) {
  return function (newNum) {
    console.log(num + newNum);
  };
}

// Time Optimisation
function find(index) {
  let a = [];
  for (let i = 0; i < 100000; i++) {
    a[i] = i * i;
  }
  console.log(a[index]);
}
const res = find2();
console.time("6");
find(6);
res(6);
console.timeEnd("6");
console.time("12");
find(12);
res(12);
console.timeEnd("12");
// Ans
function find2() {
  let a = [];
  for (let i = 0; i < 100000; i++) {
    a[i] = i * i;
  }
  return function (index) {
    console.log(a[index]);
  };
}

function a() {
  for (var i = 0; i < 3; i++) {
    setTimeout(function log() {
      console.log(i);
    }, i * 1000);
  }
}
a(); // 3 3 3, if let is used instead, 0,1,2 sicne its block scoped

function b() {
  for (var i = 0; i < 3; i++) {
    function inner(i) {
      return setTimeout(function log() {
        console.log(i);
      }, i * 1000);
    }
    inner(i);
  }
}
b(); // 0,1,2

// Private counter
function counter() {
  var _count = 0;
  function add(x) {
    _count += x;
  }
  function retrieve() {
    return "counter val is: ", _count;
  }
  return { add, retrieve };
}
const c = counter();
c.add(5);
c.add(2);
console.log(c.retrieve());

// What is module pattern
var Module = (function () {
  function privateMethod() {
    // do something
  }
  return {
    publicMethod: function () {
      // can call privateMethod
    },
  };
})();
Module.publicMethod(); // works
Module.privateMethod(); // err

// Make this run only once
let x;
function d() {
  let cnt = 0;
  return function () {
    if (cnt == 0) {
      x = "xyz";
      console.log("Value is: ", x);
      cnt++;
    } else console.log("already called");
  };
}
const dd = d();
dd();
dd();
dd();

// Polyfill for lodash
function once(fn, context) {
  let ran;
  return function () {
    if (fn) {
      ran = fn.apply(context || this, arguments);
      fn = null;
    }
  };
  return ran;
}
const hello = once((a, b) => console.log("Hello", a, b));
hello(1, 2);
hello(3, 4);
hello(5, 6);

// Polyfill memoise
const clumsyProduct = (num1, num2) => {
  for (let i = 0; i < 100000000; i++) {}
  return num1 * num2;
};
function myMemoise(fn, context) {
  const res = {};
  return function (...args) {
    var argsCache = JSON.stringify(args);
    if (!res[argsCache]) {
      res[argsCache] = fn.call(context || this, ...args);
    }
    return res[argsCache];
  };
}
console.time("First call");
console.log(clumsyProduct(9467, 7649));
console.timeEnd("First call");
console.time("Second call");
console.log(clumsyProduct(9467, 7649));
console.timeEnd("Second call");

const myMem = myMemoise(clumsyProduct);
console.time("First call");
console.log(myMem(9467, 7649));
console.timeEnd("First call");
console.time("Second call");
console.log(myMem(9467, 7649));
console.timeEnd("Second call");

// Closures vs scope
