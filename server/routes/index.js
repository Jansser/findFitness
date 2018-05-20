const modalitiesController = require('../controllers').modalities;
const professionalsController = require('../controllers').professionals;

module.exports = (app) => {
  app.get('/modalities', modalitiesController.getAll);

  app.post('/professionals/search', (req, res) => {
    let filter = req.body;
  
    console.log('req.body', filter);
  
    professionals.search(filter)
      .then(
          (data) => res.send(data),
  
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              });
          }
      )
  });
};

/* (req, res) => {
  modalitiesController.getAll()
    .then(
        (data) => res.send(data),

        (error) => {
            console.error(error)
            res.status(500).send({
                error: 'There was an error.'
            });
        }
    )
} */