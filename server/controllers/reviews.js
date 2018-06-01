const Review = require('../models').Review;
const User = require('../models').User;

module.exports = {
  save(req, res) {
    let review = req.body;

    console.log('Review', review);
  
    Review
      .create({
        userId: review.userId,
        professionalId: review.professionalId,
        content: review.content,
        rate: review.rate
      })
      .then(review => {
        Review
          .findById(review.id, {
            include: [
              {
                model: User,
                as: 'user',
                attributes: ['id', 'firstName', 'lastName'],
              },
              {
                model: User,
                as: 'professional',
                attributes: ['id', 'firstName', 'lastName'],
              }],
          })
          .then(review => {
            return res.send(review);    
          });
      })
      .catch(error => {
        console.log(error);
        return res.send({error: 'Não foi possível salvar a avaliação.'});
      });
  },

  init(req, res) {

  },

  findProfessionalReviews(req, res) {
    res.send("OK");
  }
};