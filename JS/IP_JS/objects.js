// Everything is JS is an object

const func = (function (a) {
  delete a; // only deletes objects prop
  return a; // logs 5
})(5);
console.log(func);

const key = "firstName";
const val = "ABC";
let obj = {
  [key]: val,
};
console.log(obj);

const obj1 = {
  a: "one",
  b: "two",
  a: "three",
};
console.log(obj1); // a: three, b: two

// Create a fn that multiplies all num prop vals by 2
let obj2 = {
  a: 2,
  b: 5,
  name: "qqq",
};
function mulby2(obj) {
  for (let key in obj) {
    if (typeof obj2[key] === "number") obj2[key] = 2 * obj2[key];
  }
}
mulby2(obj2);
console.log(obj2);

const a = {};
const b = { key: "b" };
const c = { key: "c" };
a[b] = 123; // b is [object Object]
a[c] = 456; // c is [object Object], so gets overriden
console.log(a[b]); // 456, a={[object Object]: 456}

const user = {
  name: "qqq",
  age: 5,
};
const strObj = JSON.stringify(user);
localStorage.setItem("user", strObj); // use case is in localstorage, as we cant store obj in local storage
console.log(JSON.parse(localStorage.getItem("user")));

console.log([..."lydia"]); // ['l', 'y', 'd', 'i', 'a']

const settings = {
  username: "qqq",
  level: 10,
  health: 20,
  fullName: {
    first: "zzz",
    last: "www",
  },
};
const data = JSON.stringify(settings, ["level", "health"]); // only stringyfies level, health
console.log(data); // {"level":10,"health":20}

const shape = {
  radius: 5,
  diameter: function () {
    return 2 * this.radius; // this is current obj
  },
  perimeter: () => 2 * Math.PI * this.radius, // this in arrow fn refers to global obj
};
console.log(shape.diameter()); // 10
console.log(shape.perimeter()); // Nan

const username = "yyy";
// const {username} = settings
// console.log(username);
const { username: myName } = settings;
console.log(myName); // qqq
const {
  fullName: { first },
} = settings;
console.log(first); // zzz

// Spread operators can be used in between but not rest
console.log({ a: 1 } == { a: 1 }); // false
console.log({ a: 1 } === { a: 1 }); // false

let person = { name: "lydia" };
const members = [person];
person = null;
console.log(members); // [{name:'lydia}]
person.name = null; // name will become null

const value = { number: 10 };
const multipy = (x = { ...value }) => {
  console.log((x.number *= 2));
};
multipy(); // 20
multipy(); // 20
multipy(value); // 20
multipy(value); // 40

function f(person) {
  person.age = 25;
  person = {
    // since this is reassigning, wont affect the reference
    name: "John",
    age: 50,
  };
  return person;
}
const person1 = {
  name: "Alex",
  age: 30,
};
const person2 = f(person1);
console.log(person1); // alex, 25
console.log(person2); // john, 50

// Implement deep copy
const person3 = Object.assign({}, person1);
const person4 = JSON.parse(JSON.stringify(person1));
const person5 = { ...person1 };
