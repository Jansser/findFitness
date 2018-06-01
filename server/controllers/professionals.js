const User = require('../models').User;
const Modality = require('../models').Modality;
const bcrypt = require('bcrypt');
const { generateToken, sendToken } = require('../utils/token.utils');

const defaultData = {
  professionals: [
    {
      id: 1,
      name: 'Jansser',
      rate: 5,
      sexo: 'M',
      modalities: [1, 2, 4, 8]
    },
    {
      id: 2,
      name: 'George',  
      rate: 3,
      sexo: 'F',
      modalities: [1]
    },
    {
      id: 3,
      name: 'Fulana',
      rate: 2,
      sexo: 'F',
      modalities: [5]
    },
    {
      id: 4,
      sexo: 'M',
      name: 'Clark kent',
      rate: 4,
      modalities: [5, 8, 1, 6, 7, 12]
    },
    
  ]
}


module.exports = {
  search(req, res) {
    let filter = req.body;
    
    return res.send({ professionals: defaultData.professionals.filter(professional => professional.modalities.includes(parseInt(filter.modality)))});
  },

  create(req, res) {
    let user = req.body;
    
    if(user.password) {
      let hash = bcrypt.hashSync(user.password, 10);
      user.password_digest = hash;
    }

    let modalities = user.modalities;
    user.isProfessional = true;
    
    User
      .create(user)
      .then(user => {
          user.setModalities(modalities);

          res.send(user)
      }).catch((error) => {
        console.log('Error', error);
        return res.send(user);
      });
  },

  findById(req, res) {
    let query = req.query;
    let id = query.id;

    User
      .findById(id, {
        include: [{
          model: Modality,
          as: 'modalities',
          attributes: ['id', 'name']
        }]
      })
      .then(user => {
        return res.send(user);    
      });
  },

  authenticate(req, res) {
    let userData = req.body;
    let error = { error: 'Usuário ou senha inválidos.'};

    if(userData.email) {
      User.findOne({ where: {email: userData.email} }).then(user => {
        if(userData.password) {
          if(bcrypt.compareSync(userData.password, user.password_digest)) {
            return res.send(user);
           } else {
            return res.send(error);
           }
        } else {
          return res.send(error);
        }
      }).catch((error) => {
        return res.send(error);
      });
    } else {
      return res.send(error);
    }
  }
};
