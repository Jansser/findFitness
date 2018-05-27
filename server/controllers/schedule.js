const User = require('../models').User;
const Schedule = require('../models').Schedule;

module.exports = {
  find(req, res) {
  },

  create(req, res) {
    let schedule = req.body;

    console.log('schedule', req.body);

    Schedule
      .create({
        userId: schedule.userId,
        professionalId: schedule.professionalId,
        date: schedule.date
      })
      .then(schedule => {
        Schedule
          .findById(schedule.id, {
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
          .then(schedule => {
            return res.send(schedule);    
          });

      })
      .catch(error => {
        console.log(error);
        return res.send({error: 'Não foi possível criar o agendamento'});
      });
  }
};

//Postgres
//set timezone="America/Sao_Paulo";