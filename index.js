require("dotenv").config();
const express = require("express");
// const cors = require('./middlewares/cors');

const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

const app = express();
// app.use(cors);

const serviceAccount = require("./serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const { PORT } = process.env;

app.get("/posts", (_req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  const posts = [];

  db.collection("posts")
    .orderBy("date", "desc")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => posts.push(doc.data()));
      res.send(posts);
    });
});

app.get("/createPost", (_req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  res.send("createPost");
});

app.listen(PORT || 3000, () => {
  console.log(`Port ${PORT}`);
});
