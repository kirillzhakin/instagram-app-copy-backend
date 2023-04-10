require("dotenv").config();
const express = require("express");
const serviceAccount = require("./serviceAccountKey.json");

// const cors = require('./middlewares/cors');

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");
const busboy = require("busboy");
const path = require("path");
const os = require("os");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');;

const app = express();
// app.use(cors);

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: "chromium-d89a6.appspot.com",
});

const db = getFirestore();
const bucket = getStorage().bucket();

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

app.post("/createPost", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const bb = busboy({ headers: req.headers });
  let uuid = uuidv4()
  let fields = {};
  let fileData = {};

  bb.on("file", (name, file, info) => {
    const { filename, encoding, mimeType } = info;
    console.log(
      `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
      filename,
      encoding,
      mimeType
    );

    const filepath = path.join(os.tmpdir(), filename);
    file.pipe(fs.createWriteStream(filepath));
    fileData = { filepath, mimeType };
  });

  bb.on("field", (name, val, info) => {
    fields[name] = val;
  });

  bb.on("close", () => {
    bucket.upload(
      fileData.filepath,
      {
        uploadType: "media",
        metadata: {
          metadata: {
            contentType: fileData.mimeType,
            firebaseStorageDownloadTokens: uuid,
          },
        },
      },
      (err, uploadedFile) => {
        if (!err) {
          createPost(uploadedFile);
        }
      }
    );

    const createPost = (uploadedFile) => {
      db.collection("posts")
        .doc(fields.id)
        .set({
          id: fields.id,
          caption: fields.caption,
          location: fields.location,
          date: parseInt(fields.date),
          imageUrl: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${uploadedFile.name}?alt=media&token=${uuid}`,
        })
        .then(() => res.send(`Post added: ${fields.id}`));
    };
  });

  req.pipe(bb);
});

app.listen(PORT || 3000, () => {
  console.log(`Port ${PORT}`);
});
