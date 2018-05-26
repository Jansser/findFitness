const modalitiesController = require('../controllers').modalities;
const professionalsController = require('../controllers').professionals;
const usersController = require('../controllers').users;

module.exports = (app) => {
  app.get('/modalities', modalitiesController.getAll);
  app.post('/professionals/search', professionalsController.search);
  app.post('/professionals', professionalsController.create);
  app.post('/auth/local', professionalsController.authenticate);
  app.post('/users', usersController.save);
};
