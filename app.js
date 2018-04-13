var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var download = require('./routes/download');
var create_api = require('./routes/api/create_gif');
var img_list_api = require('./routes/api/img_list');

var app = express();

// Cookie
app.use(cookieParser());

// // セッションの設定を行います.
// app.use(session({

//   // 必須項目（署名を行うために使います）
//   secret: 'cait.sith',

//   // 推奨項目（セッション内容に変更がない場合にも保存する場合にはtrue）
//   resave: false,

//   // 推奨項目（新規にセッションを生成して何も代入されていなくても値を入れる場合にはtrue）
//   saveUninitialized: false,

//   // アクセスの度に、有効期限を伸ばす場合にはtrue
//   rolling: false,

//   // クッキー名（デフォルトでは「connect.sid」）
//   name: 'my-special-site-cookie',

//   // 一般的なCookie指定
//   // デフォルトは「{ path: '/', httpOnly: true, secure: false, maxAge: null }」
//   cookie: {
//     // 生存期間（単位：ミリ秒）
//     maxAge: 1000 * 60 * 60 * 24 * 1, // 30日
//   }
// }));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/download', download);
app.use('/api/create_gif', create_api);
app.use('/api/img_list', img_list_api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
