require('dotenv').config();
const express = require('express');
const serviceAccount = require('./serviceAccountKey.json');

const cors = require('./middlewares/cors');

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');
const { v4: uuidv4 } = require('uuid');
const webpush = require('web-push');
const busboy = require('busboy');
const path = require('path');
const os = require('os');
const fs = require('fs');

const app = express();
// app.use(cors);

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'chromium-d89a6.appspot.com'
});

const db = getFirestore();
const bucket = getStorage().bucket();

const { PORT } = process.env;

const WEB_PUSH_PUBLIC_KEY =
  BG01MtyPGvDl5NFWAFhhBigyG0VOb6x78I1KwiC0q2b30xd4MFpJQzhYxq5fSSGkfosq74iM -
  kcLkj36xoEHzpE;
const WEB_PUSH_PRIVATE_KEY = F4ouwm0dIsx2_Yi4Ry8XDrcaEaJT7U0Ra0kqyoVtoXU;

// const { WEB_PUSH_PUBLIC_KEY } = process.env;
// const { WEB_PUSH_PRIVATE_KEY } = process.env;

webpush.setGCMAPIKey('<Your GCM API Key Here>');
webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  WEB_PUSH_PUBLIC_KEY,
  WEB_PUSH_PRIVATE_KEY
);

app.get('/posts', (_req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  const posts = [];

  db.collection('posts')
    .orderBy('date', 'desc')
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => posts.push(doc.data()));
      res.send(posts);
    });
});

app.post('/createPost', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const bb = busboy({ headers: req.headers });
  let uuid = uuidv4();
  let fields = {};
  let fileData = {};

  bb.on('file', (name, file, info) => {
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

  bb.on('field', (name, val, info) => {
    fields[name] = val;
  });

  bb.on('close', () => {
    bucket.upload(
      fileData.filepath,
      {
        uploadType: 'media',
        metadata: {
          metadata: {
            contentType: fileData.mimeType,
            firebaseStorageDownloadTokens: uuid
          }
        }
      },
      (err, uploadedFile) => {
        if (!err) {
          createPost(uploadedFile);
        }
      }
    );

    const createPost = (uploadedFile) => {
      db.collection('posts')
        .doc(fields.id)
        .set({
          id: fields.id,
          caption: fields.caption,
          location: fields.location,
          date: parseInt(fields.date),
          imageUrl: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${uploadedFile.name}?alt=media&token=${uuid}`
        })
        .then(() => {
          sendPushNotification();
          res.send(`Post added: ${fields.id}`);
        });
    };

    const sendPushNotification = () => {
      let subscriptions = [];
      db.collection('subscriptions')
        .get()
        .then((data) => {
          data.forEach((doc) => {
            subscriptions.push(doc.data());
          });
          return subscriptions;
        })
        .then((subscriptions) => {
          subscriptions.forEach((sub) => {
            const pushSubscription = {
              endpoint: sub.endpoint,
              keys: {
                auth: sub.keys.auth,
                p256dh: sub.keys.p256dh
              }
            };
            const pushContent = {
              title: 'New Instsgram Post!',
              body: 'New Post Added! Check it out!',
              openUrl: '/'
            };
            const pushContentStringified = JSON.stringify(pushContent);
            webpush.sendNotification(pushSubscription, pushContentStringified);
          });
        });
    };
  });

  req.pipe(bb);
});

app.post('/createSubscription', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  db.collection('subscriptions')
    .add(req.query)
    .then((data) => {
      console.log(data);
      res.send({
        message: 'Subscription added',
        postData: req.query
      });
    });
});

app.listen(PORT || 3000, () => {
  console.log(`Port ${PORT}`);
});
