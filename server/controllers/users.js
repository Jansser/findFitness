const User = require('../models').User;
const Modality = require('../models').Modality;

module.exports = {
  save(req, res) {
  },

  init(req, res) {
    User.create({
      "firstName": "Jansser",
      "lastName": "Kent",
      "email": "j@hotmail.com",
      "active": true,
      "isProfessional": true,		
      password: '123456',
      "CREF": "123456",
      "description": "\"Hi My name is Crark\"",
    }).then(jansser => {
      jansser.setModalities([1, 2]);
      
    }).then(() => {
      res.send("OK");
    });
  },

  findAll(req, res) {
    User
      .findAll({
        include: [{
          model: Modality,
          as: 'modalities',
          attributes: ['id', 'name'],
          where: {id: 1}
        }]
      })
      .then(users => res.json(users))
  }
};