var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const crypto = require('crypto')

var indexRouter = require('./routes/index');
var produtosRouter = require('./routes/produtos');
var petsRouter = require('./routes/pets');
var loginRouter = require('./routes/login');
var registroRouter = require('./routes/registro');
var protectedRouter = require('./routes/protected');
const generateAuthToken = () => {
  return crypto.randomBytes(30).toString('hex');
}

const authTokens = {};
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bootstrap-5.2.2-dist')));

app.use('/', indexRouter);
app.use('/produtos', produtosRouter);
app.use('/pets', petsRouter);
app.use('/login', loginRouter);
app.use('/registro', registroRouter);
app.use('/protected', protectedRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use((req, res, next) => {
  const authToken = req.cookies['AuthToken'];
  req.user = authTokens[authToken];
  next();
});

app.listen(3000)
module.exports = app;
