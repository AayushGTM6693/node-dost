const fs = require("fs");

// blocking, synchronous way
const inputText = fs.readFileSync("sync.txt", "utf-8");
console.log(inputText);
fs.writeFileSync("sync.txt", ` ${inputText},/ written by Aayush hency`);
console.log("file was written successfully");

// non-blocking , async way, callback hunxa => so variable ma store garna parena
// 1st => error , 2nd => data

fs.readFile("async.txt", "utf-8", (error, data) => {
  console.log(data);
  fs.writeFile("async.txt", "i am writing async coddde", "utf-8", (err) => {
    console.log("file has been written async-lly"); // call back hell
  });
});
console.log("i am not blocked bro 🥲");
