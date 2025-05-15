const { Router } = require('express')
const Quiz = require('../../models/quiz.model')
const NotFoundError = require('../../utils/errors/not-found-error')


const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json(Quiz.get())
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
})

router.post('/', (req, res) => {
  try {
    try {
      const quiz = Quiz.update(req.body.id, req.body)
      res.status(200).json(quiz)
    } catch (err) {
      const quiz = Quiz.create(req.body)
      res.status(201).json(quiz)
      return
    }
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
})

router.put('/', (req, res) => {
  try {
    const quiz = Quiz.update(req.body.id, req.body)
    res.status(200).json(quiz)
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
})


module.exports = router
