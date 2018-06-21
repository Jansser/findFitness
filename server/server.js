const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const pretty = require('express-prettify');
const static = require('express-static'); 
const path = require('path');

const app = express();

app.use('/public/images',express.static('public/images'));

var corsOption = {
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};

app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pretty({ query: 'pretty' }));

console.log('NODE_ENV', process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
  console.log('WE ARE IN FUCKING PRODUCTION!')
  console.log(__dirname);
  app.use('/', express.static('frontend/build'));
} else {
  /* app.get('/', (req, res) => {
    const help = `
    <pre>
      Welcome to the FindFitness API!
    </pre>
    `;
  
    res.send(help);
  }); */
}

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


require('./routes')(app);

app.listen(config.port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', config.port);
}); 