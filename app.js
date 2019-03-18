const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const logger = require('morgan');
const Sequelize = require('sequelize');
const expressValidator = require('express-validator');
const passport = require('passport');
const helpers = require('./helpers');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const errorHandlers = require('./handlers/errorHandlers');

const app = express();
require('dotenv').config();
// Requiring our models for syncing
const db = require('./models');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Exposes a bunch of methods for validating data. Used heavily on userController.validateRegister
app.use(expressValidator());

// use Morgan for logging
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));
// RIP BODY PARSER Takes the raw requests and turns them into usable properties on req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* Sessions allow us to store data on visitors from request to request
This keeps users logged in and allows us to send flash messages
*/
app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    // resave: false,
    // saveUninitialized: false,
    // store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// // Passport JS is what we use to handle our logins
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productsRouter);
// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// One of our error handlers will see if these errors are just validation errors
app.use(errorHandlers.flashValidationErrors);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

module.exports = app;
