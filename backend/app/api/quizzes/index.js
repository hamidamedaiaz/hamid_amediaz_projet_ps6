const { Router } = require('express')
const Quiz = require('../../models/quiz.model')


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
    const quiz = Quiz.create(req.body)
    res.status(201).json(quiz)
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
})


module.exports = router
