var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mydataRouter = require('./routes/mydata');
var usersRouter = require('./routes/users');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
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
  // Extract the last digit from your ID (e.g., 'dronamraju' from your full name)
  const id = 'dronamraju';
  const lastDigit = id[id.length - 1];

  // Parse the query parameter 'x' (if it exists)
  const x = parseFloat(req.query.x);

  // Use the last digit to determine the Math function
  let result;
  switch (lastDigit % 4) {
    case 0:
      result = Math.log(x || Math.random());
      break;
    case 1:
      result = Math.log10(x || Math.random());
      break;
    case 2:
      result = Math.exp(x || Math.random());
      break;
    case 3:
      result = Math.sqrt(x || Math.random());
      break;
    default:
      result = 'Invalid last digit';
  }

  // Construct the response string
  const response = `[Math.log()] applied to ${x || 'a random value'} is ${result}`;

  // Send the response
  res.send(response);
});

// Catch 404 and forward to error handler
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
