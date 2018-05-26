const User = require('../models').User;
const Modality = require('../models').Modality;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
    let modality = req.query.modality;

    if(modality === 0) {
      return res.json([]);
    }

    User
      .findAll({
        attributes: ['id'],
        include: [{
          model: Modality,
          as: 'modalities',
          attributes: ['id', 'name'],
          where: {id: modality}
        }],
      })
      .then(users => {
        let ids = users.map(user => user.id);

        User.findAll({
          attributes: ['id', 'firstName', 'lastName', 'email', 'isProfessional', 'description', 'CREF'],
          where: {
            id: {
              [Op.in]: ids
            }
          },
          include: [{
            model: Modality,
            as: 'modalities',
            attributes: ['id', 'name']
          }]
        }).then(users => {
          return res.json(users);
        });
      })
  }
};