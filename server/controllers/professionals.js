const User = require('../models').User;
const Modality = require('../models').Modality;
const Review = require('../models').Review;
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const { generateToken, sendToken } = require('../utils/token.utils');

module.exports = {
  search(req, res) {
    let filter = req.body;
    
    return res.send({ professionals: defaultData.professionals.filter(professional => professional.modalities.includes(parseInt(filter.modality)))});
  },

  create(req, res) {
    let user = {
      ...req.body,
      modalities: req.body.modalities.split(','),
      picture: req.file.path
    };

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
        attributes:{
          attributes: [
            [Sequelize.fn('AVG', Sequelize.col('Reviews.rate')), 'score']
          ],
        },
        include: [
        {
          model: Modality,
          as: 'modalities',
          attributes: ['id', 'name']
        },
        {
          model: Review,
          as: 'reviews',
          limit: 10,
          include: {
            model: User,
            as: 'user',
            attributes: ['firstName', 'lastName', 'picture']
          },
          order: [['createdAt', 'DESC']]
        },
        ]
      })
      .then(user => {
        user.getReviews().then(reviews => {
          let averageRating = 0;

          if(reviews.length) {
            let sum = 0;
  
            reviews.forEach(review => {
              sum = sum + review.rate;
            });
            
            averageRating = sum / reviews.length;
          }

          user.averageRating = averageRating;
          
          return res.send(user); 
        });
      });
  },

  authenticate(req, res) {
    let userData = req.body;
    let error = { error: 'Usuário ou senha inválidos.'};

    if(userData.email) {
      User.findOne({ where: {email: userData.email} }).then(user => {
        if(user !== null && userData.password) {
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
