const User = require('../models').User;

/* User.create({ username: 'fnord', job: 'omnomnom' })
  .then(() => User.findOrCreate({where: {username: 'fnord'}, defaults: {job: 'something else'}}))
  .spread((user, created) => {
    console.log(user.get({
      plain: true
    }))
    console.log(created)
  }); */

module.exports = {
  save(req, res) {
    console.log('req.body', req.body);
  },
};