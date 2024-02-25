// JS executes sync before async code

function fn(x) {
  setTimeout(() => {
    return "hello" + x;
  }, 1000);
}
const res = fn("world");
console.log(res); // undefined

function fn2(x, cb) {
  setTimeout(() => {
    cb("hello" + x);
  }, 1000);
}
// const res2 = fn2("world", (ans) => console.log(ans)); // hello world
function fn3(x, cb) {
  setTimeout(() => {
    cb("inside fn3" + x);
  }, 1000);
}
const res2 = fn2("world", (ans) => {
  console.log(ans);
  fn3("this is fn3", (ans2) => console.log(ans2));
}); // hello world  inside fn3 this is fn3

// Pyramid of doom -> callback hell
const sub = new Promise((resolve, reject) => {
  setTimeout(() => {
    const result = true;
    if (result) resolve("Resolving");
    else reject("Rejecting");
  }, 1000);
});
sub.then((res) => console.log(res)).catch((err) => console.error(err));
console.log(sub);

const sub2 = Promise.resolve("Directly resolving");
console.log(sub2);

function fn2p(x) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve("hello" + x + "in promise");
    }, 1000)
  );
}
const res2 = fn2("world", (ans) => console.log(ans)); // hello world
function fn3p(x) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve("inside fn3 promise" + x);
    }, 500)
  );
}

fn2p("world")
  .then((res) => {
    console.log(res);
    fn3p("this is fn3p").then((res) => {
      console.log(res);
    });
  })
  .catch((err) => {
    console.error(err);
  });
// To prevent similar pyramid structure, promise chaining
fn2p("world")
  .then((res) => {
    console.log(res);
    return fn3p("this is fn3p");
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });

// Promise combinator
Promise.all([fn2p("world"), fn3p("this is fn3p")]) // all should resolve
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
Promise.race([fn2p("world"), fn3p("this is fn3p")]) // returns first promise that succeeds
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
Promise.allSettled([fn2p("world"), fn3p("this is fn3p")]) // returns all settled promises, both resolved & rejected
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
Promise.any([fn2p("world"), fn3p("this is fn3p")]) // returns first fulfilled promise
  .then((res) => console.log(res))
  .catch((err) => console.error("promise faield"));

// async await
const result = async () => {
  try {
    const msg1 = await fn2p("world");
    console.log(msg1);
    const msg2 = await fn3p("inside fn3p");
    console.log(msg2);
  } catch (err) {
    console.log(err);
  }
};
result();

console.log("start");
const promise1 = new Promise((resolve, reject) => {
  console.log(1);
  resolve(2);
});
promise1.then((res) => console.log(res)).catch((err) => console.log(err));
console.log("end"); // start 1 end 2 , since JS runs sync before async

console.log("start");
const promise2 = new Promise((resolve, reject) => {
  console.log(1);
  resolve(2);
  console.log(3);
});
promise2.then((res) => console.log(res)).catch((err) => console.log(err));
console.log("end"); // start 1 3 end 2 , since JS runs sync before async

console.log("start");
const promise2 = new Promise((resolve, reject) => {
  console.log(1);
  console.log(3);
});
promise2
  .then((res) => console.log("Result is ", res))
  .catch((err) => console.log(err));
console.log("end"); // start 1 3 end

console.log("start");
const fn = () =>
  new Promise((resolve, reject) => {
    console.log(1);
    resolve("success");
  });
console.log("middle");
fn()
  .then((res) => console.log("Result is ", res))
  .catch((err) => console.log(err));
console.log("end"); // start middle 1 end success

// strings or new Error("test") are not rejected promises, they are resolved

const first = new Promise((resolve, reject) => {
  console.log("First");
});
const second = new Promise((resolve, reject) => {
  resolve(first);
});
second.then((res) => res).then((res) => console.log(res));

// Rewrite using async-await
function loadJson(url) {
  return fetch(url).then((response) => {
    if (response.status == 200) return response.json();
    else throw new Error(response.status);
  });
}
loadJson("url").catch((err) => console.error(err));

async function loadJson(url) {
  const response = await fetch(url);
  if (response.status == 200) return response.json();
  else throw new Error(response.status);
}
loadJson("url").catch((err) => console.error(err));

// Solve promise recursively
function promiseRecur(promises) {
  if (promises.length == 0) return;
  const currentPromise = promises.shift();
  currentPromise
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.error(err));
  return promiseRecur(promises);
}
promiseRecur([fn2p("world"), fn3p("inside fn3p")]);

// Promise polyfills
function myPromise(executor) {
  let onResolve,
    onReject,
    isFulfilled = false,
    isRejected = false,
    isCalled = false,
    value;

  function resolve(val) {
    isFulfilled = true;
    value = val;
    if (typeof onResolve === "function") {
      onResolve(value);
      isCalled = true;
    }
  }

  function reject(val) {
    isRejected = true;
    value = val;
    if (typeof onReject === "function") {
      onReject(val);
      isCalled = true;
    }
  }

  this.then = function (callback) {
    onResolve = callback;
    if (isFulfilled && !isCalled) {
      isCalled = true;
      onResolve(value);
    }
    return this;
  };

  this.catch = function (callback) {
    onReject = callback;
    if (isRejected && !isCalled) {
      isCalled = true;
      onReject(value);
    }
    return this;
  };
  try {
    executor(resolve, reject);
  } catch (err) {
    reject(err);
  }
}

const example = new myPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 1000);
});
example.then((res) => console.log(res)).catch((err) => console.error(err));
myPromise.resolve = (val) => {
  return new myPromise(function executor(resolve, reject) {
    resolve(val);
  });
};
myPromise.reject = (val) => {
  return new myPromise(function executor(resolve, reject) {
    reject(val);
  });
};

// Promise.all polyfill
Promise.allPolyFill = (promises) => {
  return new Promise((resolve, reject) => {
    const results = [];
    if (!promises.length) {
      resolve(results);
      return;
    }
    let pending = promises.length;
    promises.forEach((promise, idx) => {
      Promise.resolve(promise).then((res) => {
        results[idx] = res;
        pending--;
        if (pending == 0) resolve(results);
      }, reject);
    });
  });
};
Promise.allPolyFill([fn2p("world"), fn3p("inside fn3p")])
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
