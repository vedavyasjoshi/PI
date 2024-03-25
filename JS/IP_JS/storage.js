localStorage.setItem("name", "abc");
localStorage.removeItem('name')
localStorage.setItem("name", "xyz");
console.log(localStorage.key(0)); // name (returns key of nth item)
console.log(localStorage.getItem("name"));

document.cookie = 'name=abc;expires='+new Date(2025, 1, 2).toUTCString()
document.cookie = 'lastName=asd;expires='+new Date(2025, 1, 2).toUTCString()
console.log(document.cookie);