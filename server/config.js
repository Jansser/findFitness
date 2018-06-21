exports.port = process.env.PORT || 3001;
exports.origin = process.env.ORIGIN || `http://localhost:${exports.port}`;

exports.facebook = {
  clientID: '297087374163131',
  clientSecret: 'd99a7135127a13474b0a82b0b33a414f',
  callbackURL: 'http://localhost:3001/auth/facebook/callback',
  profileFields: ['id', 'name', 'displayName', 'picture', 'email'],
};
