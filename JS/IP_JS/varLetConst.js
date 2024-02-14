// var let const
// scope

// var has functional scope
// let, const have block scope

{
  var a = 5;
}
console.log(a);
{
  let b = 5;
}
console.log(b); //not defined

// variable shadowing
function f() {
  let x = "hello";
  if (true) {
    const x = "hi";
    console.log(x);
  }
  console.log(x);
}
f()
// cant shadow let variable by var (illegal shadowing)

// Redeclaration
var z;
var z;
let y;
let y; // Error already declared
const q;
const q; // Err:  Missing initializer

let w;
{
    let w; //valid as this is shadowing
}

// Hoisting
console.log(count);  // undefined, its present in global execution context
var count=1;

console.log(count2);  // err, its hoisted but in temporal dead zone , its present in script execution context
let count2=1; // TDZ is time b/w declaration & initialization

function abc(){
  console.log(a, b, c); // undefinec, err, err
  const b=20; // b, c are in scope but in TDZ
  let c=30; 
  var a=10; 
}
abc()