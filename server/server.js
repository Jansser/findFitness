const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const pretty = require('express-prettify');

const app = express();
 

var corsOption = {
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};

app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pretty({ query: 'pretty' }));

/*------------------------ AUTH ------------------------------------------------------*/
const { generateToken, sendToken } = require('./utils/token.utils');
const request = require('request');
const passport = require('passport');

require('./passport')();

app.post('/auth/facebook', passport.authenticate('facebook-token', { session: false }), (req, res, next) => {
  if (!req.user) {
    return res.send(401, 'User Not Authenticated');
  }

  req.auth = {
    id: req.user.id
  };

  next();
}, generateToken, sendToken);

/*------------------------ AUTH ------------------------------------------------------*/



app.get('/', (req, res) => {
  const help = `
  <pre>
    Welcome to the FindFitness API!
  </pre>
  `;

  res.send(help);
});

require('./routes')(app);

app.listen(config.port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', config.port);
}); 


/* 

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var index = require('./routes/index');

var app = express();

var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/', index);

module.exports = app;



router.route('/auth/facebook')
    .post(passport.authenticate('facebook-token', {session: false}), function(req, res, next) {
        if (!req.user) {
            return res.send(401, 'User Not Authenticated');
        }
        req.auth = {
            id: req.user.id
        };

        next();
    }, generateToken, sendToken);
*/