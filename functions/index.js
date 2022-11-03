const functions = require("firebase-functions");
const express = require('express');
const cookieParser = require('cookie-parser')();
const cors = require('cors')({origin: true});

const userRouter = require('./routes/userRoutes');
const autiMiddleware = require('./middlewares/authMinddleware')

const app = express();

app.use(express.json());
app.use(cors);
app.use(cookieParser);
app.use(autiMiddleware)

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/users', userRouter);

exports.app = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
