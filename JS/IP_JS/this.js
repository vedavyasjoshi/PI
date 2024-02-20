// 2 types of object binding, implicit & explicit
this.a = 5; // this refers to global obj
const myfunc = () => {
  console.log(this.a);
};
myfunc();

let user = {
  name: "qqq",
  age: 10,
  childObj: {
    newName: "child",
    getChildDetails() {
      console.log(this.newName + " " + this.name); // child, undefined
    },
  },
  getDetails() {
    console.log(this.name); // qqq
    const nestedArrowfn = () => console.log(this); // user obj
    nestedArrowfn();
  },
  getArrowDetails: () => {
    console.log(this.name); // '', this points to parent which is global obj
  },
};
user.getDetails();
user.getArrowDetails();
user.childObj.getChildDetails();

class user1 {
  constructor(n) {
    this.name = n;
  }
  getName() {
    return this.name; // in classes, this points to variables in obj
  }
}
const myUser = new user1("www");
console.log(myUser.getName());

const user2 = {
  firstName: "eee",
  getName() {
    const firstName = "ttt";
    return this.firstName; // eee
  },
};
console.log(user2.getName());

function makeUser() {
  return {
    name: "John",
    ref: this,
  };
}
const myUser1 = makeUser();
console.log(myUser1.ref.name); // nothing
console.log(myUser1); // name: john, ref: window
function makeUser2() {
  return {
    name: "John",
    ref() {
      return this;
    },
  };
}
const myUser2 = makeUser2();
console.log(myUser2.ref().name); // john

const user3 = {
  name: "yyy",
  logMessage() {
    console.log(this.name);
  },
};
setTimeout(
  user3.logMessage, // nothing, it no longer has access to user3 obj, as it goes to macrotask queue
  1000
);
setTimeout(
  user3.logMessage(), // yyy
  1000
);
setTimeout(function () {
  user3.logMessage(); // yyy
}, 1000);

// create an object calculator
let calculator = {
  read() {
    this.a = +prompt("a = ", 0);
    this.b = +prompt("b = ", 0);
  },
  sum() {
    return this.a + this.b;
  },
  mul() {
    return this.a * this.b;
  },
};
calculator.read();
console.log(calculator.sum());
console.log(calculator.mul());

var length = 4;
function callback() {
  console.log(this.length);
}
const object = {
  length: 5,
  method(fn) {
    fn();
  },
  method2() {
    // arguments: [callback, 2,3]
    arguments[0]();
  },
};
object.method(callback); // 4
object.method2(callback, 2, 3); // 3

// Implement calc
const calc = {
  total: 0,
  add(a) {
    this.total += a;
    return this;
  },
  multiply(a) {
    this.total *= a;
    return this;
  },
  subtract(a) {
    this.total -= a;
    return this;
  },
};
const result = calc.add(10).multiply(5).subtract(30).add(10);
console.log(result.total); // 30
