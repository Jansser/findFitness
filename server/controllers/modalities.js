const Modality = require('../models').Modality;

module.exports = {
  getAll (req, res) {
    Modality.all()
      .then(modalities => res.send({modalities}))
      .catch(error => res.send(error));
  },
};