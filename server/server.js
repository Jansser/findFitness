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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../frontend/build'));
} else {
  app.get('/', (req, res) => {
    const help = `
    <pre>
      Welcome to the FindFitness API!
    </pre>
    `;
  
    res.send(help);
  });
}


require('./routes')(app);

app.listen(config.port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', config.port);
}); 


/* 

/** configure cloudinary

const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: 'YOUR_CLOUDINARY_NAME_HERE',
  api_key: 'YOUR_CLOUDINARY_API_KEY_HERE',
  api_secret: 'YOUR_CLOUDINARY_API_SECRET_HERE'
})


//oncontroller
if (req.files.image) {
            cloudinary.uploader.upload(req.files.image.path, (result) => {
                let obj = { text, title, claps, description, feature_img: result.url != null ? result.url : '' }
                saveArticle(obj)
                /*(new Student({...{url: result.url},...req.body})).save((err, newStudent) => {
                const cloud_res = {
                    url: result.url
                }
                const newS = newStudent.toObject()
                console.log({...{url: result.url},...req.body})
                if(err)
                    res.send(err)
                else if (!newStudent)
                    res.send(400)
                else
                    res.send({...newS,...cloud_res})
                next()
            })/
          },{
            resource_type: 'image',
            eager: [
                {effect: 'sepia'}
            ]
        })
*/