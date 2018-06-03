const modalitiesController = require('../controllers').modalities;
const professionalsController = require('../controllers').professionals;
const usersController = require('../controllers').users;
const scheduleController = require('../controllers').schedule;
const reviewsController = require('../controllers').reviews;

const multer  = require('multer');
const storage = multer.diskStorage({
  destination: 'public/images',
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage });

module.exports = (app) => {
  app.get('/modalities', modalitiesController.getAll);
  
  app.get('/professional', professionalsController.findById);
  app.post('/professionals/search', professionalsController.search);
  app.post('/professional', upload.single('picture'), professionalsController.create);
  app.post('/auth/local', professionalsController.authenticate);
  
  app.get('/users', usersController.findAll);
  
  app.post('/users', usersController.save);
  app.post('/users/init', usersController.init);

  app.get('/schedule', scheduleController.find);
  app.get('/schedule/user', scheduleController.findLastScheduleUser);
  app.post('/schedule', scheduleController.create);
  app.put('/schedule', scheduleController.updateStatus);

  app.get('/reviews', reviewsController.findProfessionalReviews);
  app.post('/review', reviewsController.save);

};
