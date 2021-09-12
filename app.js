const createError = require('http-errors');
const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// const firebase = require('firebase');
// const firebaseAdmin = require('firebase-admin');
// const firebaseFunction = require('firebase-functions');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mainRouter = require('./routes/main');
// const postRouter = require('./routes/posts');
const storageRouter = require('./routes/storage');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app
})

// const firebaseConfig = {
//   apiKey: "AIzaSyDWIlGCI3SNvHJKLQFxD0eMdXzODAjToLQ",
//   authDomain: "twinships-210906.firebaseapp.com",
//   databaseURL: "https://twinships-210906-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "twinships-210906",
//   storageBucket: "twinships-210906.appspot.com",
//   messagingSenderId: "126211724461",
//   appId: "1:126211724461:web:dbbb0f54e9867d20886224",
//   measurementId: "G-GGXXTRP338"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// firebaseAdmin.initializeApp({
//   credential: firebaseAdmin.credential.cert({
//     "type": "service_account",
//     "project_id": "twinships-210906",
//     "private_key_id": "f949b613eeda9fefbaa6e274e756c4c657f945c0",
//     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCtL/ebXxhAGyy3\nylClbFvghWdfWuBJlEG8yulT+uwdR1xtbVfc3sg9zG/wbIb26FyjPdX2TPeuReFn\nx5a96m/2hop1/bXi0qO1nmNyfH9gyC9xYSRTpE2YP43/cDLc3QiXKPHiccn+gtsH\ne3kVOp58FZlk6Xvj6i2Q9rF25O7xZBke//6Wn/AWXNQBGvN71L5QPXYbCiQvjIi2\nURMMEK8zS00hsCTdpK1sRyG+VJ0PEnYeDnArkHGpBVFroqx8TL9/gJDvUBtsZIK/\ncsNfci4lITx7Lb53zPWAquszqS2+6icX7rgwK4vhVM3CXkmcnHme3o3GKlIwi8Ni\nWalGX/j9AgMBAAECggEAQT2AmRcJm5yhC9s65hYbxkh62IDzXMRsvyHxI6GysJTh\nTJeUMa/63szUnk1Dyl9eBmCU6WO1KgFJGD8nmgNmigfEwQ4CJqAS66fu7oHXui2v\nMZbWiGusj13hsAgkIO9i/Q5/kD4tSaMhv3/T7RtX+IZqcolCEml1INbNo2w6VtQv\nnh8J7CJuxOCowakATPuakocoOKYj4hBAL0xGgPHoBuc/9CJCenAe5bhJpRZmQUJC\n1Cid2bJpwhvRWqPuDnWAU8CfFwyVeTjBRFDCjK9w/q0DQRzSGhXRTNXqMYS+L48m\nzgI8yrlufcDzV0uK8XOpaTyXYv2wJKpnYSKnOjqEQQKBgQDbIi5LYDzxUJAJMLJV\nvLlr1BOSoKEerB5WiiAWGEETPuGu4bXSNTrTCw8EVPvEbha06p9rlsy5oHC3t/8G\noKV4DFGtiHGJhdrzcloYqExu0XWw0G1FP5Wkh83w69MFNx4WtBth2n201mk3K6am\nlK34FqyyFGuQ7U8OAURqumBbOwKBgQDKUvDOzbwkW8n/DUeUZLpaIuLEdHRW4/KR\nveXFPDoH3wSB7VTXa6nMN4BK5fIHqwQCAWA7JEZBMdWZ93Ee8q2YpnCPNKS0BJXk\n8P62r/4eacHB8G76ZG6cxAdgvHuTABwiAYNBoJspl3PKGfbTV5VMo4H8jIdO7QUr\nY008QacJJwKBgF8/Xiv5KsQhJlo4Rmup2laaGd/T3fR9D7rB0uyHolGBNYtUJDm4\nVVdCKUbSwZRB3bDJgn27UEUnDZdtbHYvAX1KrX3mHqOOAPtsKukozgAlHyi5j6VX\n2+1l8gfUGSbdLEDmDDjeRWGDCLyoRomFepCpGmtVIOQfogsOVfSmChfdAoGBAMKX\n/UZaeD9cDS8DXborG1UAQq0C+LZtrWthgrIuF/5kEJjKZJSA16I0K29eNGgNouAu\n5JhdbjjcLn5UkHdcn3y3cIE798Gwu16kL8gUA0zLGPFoR8UKfZzHqfTvs8cSDvzi\nCZVAXJwnL9XNHSnuDgnVJXt6ydUugI9XhfyThI13AoGAB/WoIzedBFrijisjkNKG\n5kIgfnNDkEcoMHMaItcemAD29BPAfJXSW8PR08gyo22rJHl71dLwjatXQEEswzdo\n4U1n4gVzhkFGmjA9n2GDfJHNv87HWfc8o/RIO7gWOuK/GvbXiJqpRbWG3ZiuTIwT\nRgW07fWXZ280H5shISwJ1TQ=\n-----END PRIVATE KEY-----\n",
//     "client_email": "firebase-adminsdk-t9mrb@twinships-210906.iam.gserviceaccount.com",
//     "client_id": "105952474939427161958",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-t9mrb%40twinships-210906.iam.gserviceaccount.com"
//   }),
//   databaseURL: "https://twinships-210906-default-rtdb.asia-southeast1.firebasedatabase.app",
//   storageBucket: "twinships-210906.appspot.com"
// })

// view engine setup
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/main', mainRouter);
// app.use('/posts', postRouter);
app.use('/storage', storageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
