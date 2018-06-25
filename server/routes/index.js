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
  app.get('/api/modalities', modalitiesController.getAll);
  
  app.get('/api/professional', professionalsController.findById);
  app.post('/api/professionals/search', professionalsController.search);
  app.post('/api/professional', upload.single('picture'), professionalsController.create);
  app.post('/api/auth/local', professionalsController.authenticate);
  
  app.get('/api/users', usersController.findAll);
  
  app.post('/api/users', usersController.save);
  app.post('/api/users/init', usersController.init);

  app.get('/api/schedule', scheduleController.find);
  app.get('/api/schedule/user', scheduleController.findLastScheduleUser);
  app.post('/api/schedule', scheduleController.create);
  app.put('/api/schedule', scheduleController.updateStatus);

  app.get('/api/reviews', reviewsController.findProfessionalReviews);
  app.post('/api/review', reviewsController.save);

};
