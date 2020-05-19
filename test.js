// example.js
console.log("script start");
setTimeout(function () {
  console.log("setTimeout");
}, 0);
new Promise((resolve, reject) => {
  //   for (let i = 0; i < 1000000000; i++) {}
  //   while (true)
    resolve("123");
//   setTimeout(() => {
//     resolve("123");
//   }, 3000);
}).then(console.log);
// Promise.resolve()
//   .then(function () {
//     console.log("promise1");
//   })
//   .then(function () {
//     console.log("promise2");
//   });
console.log("script end");
