const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('QuizHistory', {
  id: Joi.number().required(),
  quizId: Joi.number().required(),
  profileId: Joi.number().required(),
  quizTitle: Joi.string().required(),
  date: Joi.date().required(),
  score: Joi.number().required(),
  totalQuestions: Joi.number().required(),
  percentageCorrect: Joi.number().required(),
  timeSpent: Joi.number().required(),
  hintsUsed: Joi.number().required(),
})