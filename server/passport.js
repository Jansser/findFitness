'use strict';

const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const config = require('./config');
const User = require('./models').User;

module.exports = function () {
  passport.use(new FacebookTokenStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret
  },

  function (accessToken, refreshToken, profile, done) {
    let profileData = profile._json;

    console.log('ProfileData', profile);

    let user = {
      firstName: profileData.first_name,
      lastName: profileData.last_name,
      email: profileData.email,
      facebook_id: profileData.id,
      picture: profile.photos ? profile.photos[0].value : ''
    };
    
    console.log(profile.photos[0].value);

    User
      .findOrCreate({where: {email: profileData.email}, defaults: user})
      .spread((user, created) => {
        return done(null, user);
      })
      .catch((error) => {
        console.log('Error', error);
        return done(error, {});
      });
  }));
}