const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Gamemode', {
    gamemodeId:Joi.number().required(),
    name:Joi.string().required(),
})