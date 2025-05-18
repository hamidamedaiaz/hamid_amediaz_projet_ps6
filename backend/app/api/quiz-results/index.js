const { Router } = require('express')
const QuizResults = require('../../models/quiz-result.model')
const router = new Router()

router.get('/', (req, res) => {
  try {
    const quizResults = QuizResults.get();
    res.status(200).json(quizResults);
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
})

router.post('/', (req, res) => {
  try {
    const newResult = QuizResults.create(req.body)
    res.status(200).json(newResult);
  } catch(err) {
    res.status(500).json(err)
    console.log(err)
  }
})

module.exports = router
