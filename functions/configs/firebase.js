const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://reactjs-api-a31a3-default-rtdb.firebaseio.com",
  storageBucket: "reactjs-api-a31a3.appspot.com",
});

const db = admin.firestore();

module.exports = {admin, db};
