var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mydataRouter = require('./routes/mydata');
var usersRouter = require('./routes/users');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // Corrected the path.join
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Register your route handlers
app.use('/mydata', mydataRouter);
app.use('/users', usersRouter);

// Define a new route handler for /computation
app.get('/computation', (req, res) => {
  // Parse the query parameter 'x' or use a random value
  const x = parseFloat(req.query.x) || Math.random() * 100; // Change the range or default value as needed

  // Apply the Math.log() function
  const result = Math.log(x);

  // Construct the response string
  const response = `[Math.log()] applied to ${x} is ${result}`;

  // Send the response
  res.send(response);
});

// Catch 404 and forward to the error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
