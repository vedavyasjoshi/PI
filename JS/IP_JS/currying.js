// function(a,b) -> function(a)(b)
// Why use currying?
function f(a) {
  return function (b) {
    return `${a} ${b}`;
  };
}
console.log(f(5)(6));

// sum(2)(6)(1)
function sum(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}
console.log(sum(2)(6)(1));

// evaluate("sum")(4)(2) , "subtract", "multiply", "divide"
function evaluate(op) {
  return function (a) {
    return function (b) {
      if (op === "sum") return a + b;
      else if (op === "subtract") return a - b;
      else if (op === "multiply") return a * b;
      else if (op === "divide") {
        if (b === 0) throw new Error("Division by zero");
        return a / b;
      } else return "Invalid operation";
    };
  };
}
const mul = evaluate("multiply"); // this is reusable, usage of currying
console.log(mul(4)(5));
console.log(evaluate("divide")(4)(2));

// Infinite currying
function add(a) {
  return function (b) {
    if (b) return add(a + b);
    else return a;
  };
}
console.log(add(1)(2)(3)(4)(5)());

// Currying vs partial application
function partial(a) {
  // function which has less nested functions than arg, or which has lesser arity
  return function (b, c) {
    return a + b + c;
  };
}

// Manipulating DOM
function updateElementContent(id) {
  return function (content) {
    document.querySelector("#" + id).textContent = content;
  };
}
const updateHeader = updateElementContent("heading");
updateHeader("Heeeee");

// Implement currying
function curry(func) {
  return function curriedFunc(...args) {
    if (args.length >= func.length) {
      return func(...args);
    } else {
      return function (...next) {
        return curriedFunc(...args, ...next);
      };
    }
  };
}
const sum1 = (a, b, c, d) => a + b + c + d;
const totalSum = curry(sum1);
console.log(totalSum(1)(2)(3)(4));
