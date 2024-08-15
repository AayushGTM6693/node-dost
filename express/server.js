const app = require("./app"); // own module => ./ use garni

const port = 3000;
app.listen(port, () => {
  console.log(`running in port ${port} `);
});
