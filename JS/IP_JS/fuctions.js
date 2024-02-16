function fn_declaration() {
  console.log("fn_declaration");
}

const fn_expression = function () {
  console.log("fn_expression, anonymous fn");
};

const f = function innerF(x) {
  console.log(x);
};

// f(5)
// innerF(5) // err: innerF is not defined

// First class fn fn can be treated as variables, paased as argument, return value
const square = function (x) {
  return x * x;
};
const display = function (fn) {
  console.log("Square is ", fn(5));
};
display(square);

// IIFE: immediately invoked fn
(function mySquare(x) {
  console.log(x * x);
})(10);

for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
// here let is block scoped, hence prints 1,2,3,4,5 but var prints 5,5,5,5,5
// Functions are hoisted completely

var x = 20;
function fun() {
  console.log(x); //undefined, since this has a separate exec context
  var x = 21;
}
fun();

function f2(...nums) {
  // params, rest operator, rest should be the last param
  console.log(nums);
}
const arr = [5, 6];
f2(...arr); // arguments, spread operator

function f3() {
  console.log(arguments); // works in normal functions, but not in arrow fn
}
f4(1, 2, 3, 4, 5);
const f4 = () => console.log(arguments); // err
// This in arrow fn refers to global obj
