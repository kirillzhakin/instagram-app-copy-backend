require('dotenv').config();
const express = require("express");
const app = express();
const { PORT } = process.env;

app.get("/posts", (_req, res) => {
  const posts = {
    capture: "Winter Palace",
    location: "SP",
  };

  res.send(posts);
});

app.listen(PORT || 3000, () => {
  console.log(`Port ${PORT}`);
});
