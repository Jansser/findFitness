const User = require('../models').User;
const Modality = require('../models').Modality;
const Review = require('../models').Review;
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
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
            attributes: ['firstName', 'lastName']
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

/* 

SELECT "User"."id", "User"."firstName", "User"."lastName", "User"."email", "User"."active", "User"."isProfessional", "User"."password_digest", 
"User"."description", "User"."CREF", "User"."facebook_id", "User"."createdAt", "User"."updatedAt", 

"modalities"."id" AS "modalities.id", 
"modalities"."name" AS "modalities.name", 
"modalities->UserModalities"."userId" AS "modalities.UserModalities.userId", 
"modalities->UserModalities"."createdAt" AS "modalities.UserModalities.createdAt", "modalities->UserModalities"."updatedAt" AS "modalities.UserModalities.updatedAt", 
"modalities->UserModalities"."modalityId" AS "modalities.UserModalities.modalityId" 
FROM "Users" AS "User"

LEFT OUTER JOIN ( "UserModalities" AS "modalities->UserModalities" INNER JOIN "Modalities" AS "modalities" ON "modalities"."id" = "modalities->UserModalities"."modalityId") 
ON "User"."id" = "modalities->UserModalities"."userId" 

WHERE "User"."id" = '39'; 

Executing (default): SELECT "id", AVG("Reviews"."rate") AS "score" FROM "Reviews" AS "Review" WHERE "Review"."professionalId" IN (39) ORDER BY "Review"."createdAt" DESC LIMIT 10;
*/
