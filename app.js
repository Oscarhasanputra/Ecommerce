var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Session = require("express-session")
const cors = require("cors");

const apiRouter= require("./routes/api")
const indexRouter= require("./routes/index")
const expressStaticGzip = require("express-static-gzip");

var app = express();
// const user =

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(Session({
  secret:"test",
  cookie:{
      maxAge:3600000,
      
  },
})
// ,(req,res,next)=>{
//   req.session['data']={id:3}
//    return next()
// }
)
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// app.use("/assets",(req,res,next)=>{
//   console.log("helloooo.....")
//   next()
// })
// const encodeResToGzip = contentType => (req, res, next) => {
//   // req.url = req.url + '.gz';
//   res.set('Content-Encoding', 'gzip');
//   res.set('Content-Type', contentType);
//   next();
// };

// app.get("/assets/js/*.js.gz", encodeResToGzip('text/javascript'));
// app.use("/assets",express.static(path.join(__dirname, 'public','assets')))
app.use("/assets",expressStaticGzip(path.join(__dirname, 'public','assets'),{
  urlContains: "/assets",
  fallthrough: false,
  enableBrotli: true,
}))


app.use("/api",apiRouter)
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("no url founded")
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
  // res.render('error');
});

module.exports = app;
