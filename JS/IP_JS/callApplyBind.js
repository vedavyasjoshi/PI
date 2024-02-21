// Explicit binding
var obj = {
  name: "qqq",
};
function sayHello(age, profession) {
  return "Hello " + this.name + " is " + age + " is an " + profession;
}
console.log(sayHello()); // Hello
console.log(sayHello.call(obj, 5, "engineer")); // Hello qqq is 5 is an engineer
console.log(sayHello.apply(obj, [5, "engineer"])); // Hello qqq is 5 is an engineer

const bindFunc = sayHello.bind(obj); // reusable
console.log(bindFunc(10, "doctor"));
console.log(bindFunc(15, "lawyer"));

console.log(sayHello.bind(obj, 24)); // function defn

const age = 10;
var person = {
  name: "qqq",
  age: 20,
  getAge: function () {
    return this.age;
  },
};
var person2 = { age: 24 };
console.log(person.getAge.call(person2)); // 24

var status = "😀";
setTimeout(() => {
  const status = "😛";
  const data = {
    status: "😎",
    getStatus: function () {
      return this.status;
    },
  };
  console.log(data.getStatus()); // 😎
  console.log(data.getStatus.call(this)); // 😀 (this refers to global, since this never points to a fn, due to settimeout being a fn)
}, 0);

// Print all animals
const animals = [
  { species: "Lion", name: "king" },
  { species: "Whale", name: "queen" },
];
function printAnimals(i) {
  this.print = function () {
    console.log("#" + i + " " + this.species + ": " + this.name);
  };
  this.print();
}
animals.map((animal, i) => printAnimals.call(animal, i));

// Append array to another array
const array = ["a", "b"];
const elements = [0, 1, 2];
array.push.apply(array, elements);
console.log(array);

// Find min/max in array
const numbers = [5, 6, 2, 3, 7];
console.log(Math.max.apply(null, numbers)); // 7
console.log(Math.min.apply(null, numbers)); // 2

// Bound function
function f() {
  console.log(this);
}
let user = {
  g: f.bind(null),
};
user.g(); // window obj

// Bind chaining
function f1() {
  console.log(this.name);
}
f1 = f1.bind({ name: "John" }).bind({ name: "Ann" });
f1(); // John, once a fn is bound to an obj, its always bound to it, bind chaining doesnt exist

// checkPassword
function checkPassword(success, failed) {
  let password = prompt("password", "");
  if (password == "password") success();
  else failed();
}
let userr = {
  name: "qqq",
  loginSuccessful() {
    console.log(`${this.name} logged in`);
  },
  loginFailed() {
    console.log(`${this.name} failed to log in`);
  },
};
checkPassword(userr.loginSuccessful.bind(userr), userr.loginFailed.bind(userr));

let userrr = {
  name: "qqq",
  login(result) {
    console.log(this.name + (result ? "login successful" : "login failed"));
  },
};
checkPassword(
  userrr.login.bind(userrr, true),
  userrr.login.bind(userrr, false)
);

const agee = 10;
var persona = {
  name: "qqq",
  agee: 20,
  getAgeArrow: () => console.log(this.age), // this get context from parent normal function, which is window obj
  getAge: function () {
    console.log(this.age);
  },
};
var personb = { age: 24 };
persona.getAge.call(personb); // 24
persona.getAgeArrow.call(personb); // undefined

// Call polyfill
Function.prototype.myCall = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + "is not callable");
  }
  context.fn = this;
  context.fn(...args);
};
const myobj = { name: "eee" };
function sayhi(age, job) {
  console.log("HI ", this.name, age, job);
}
sayhi.myCall(myobj, 25, "engineer");

// Apply polyfill
Function.prototype.myApply = function (context = {}, args = []) {
  if (typeof this !== "function") {
    throw new Error(this + "is not callable");
  }
  if (!Array.isArray(args)) {
    throw new TypeError("CreateListFromArrayLike called on non-object");
  }
  context.fn = this;
  context.fn(...args);
};
sayhi.myApply(myobj, [25, "engineer"]);

// Bind polyfill
Function.prototype.myBind = function (context = {}) {
  if (typeof this !== "function") {
    throw new Error(this + "cannot be bound as is not callable");
  }
  context.fn = this;
  return function (...newArgs) {
    return context.fn(...newArgs);
  };
};
const newFn = sayhi.myBind(myobj);
newFn(35, "doctor");
