const { Router } = require('express')
const QuizHistory = require('../../models/quiz-history.model')
const HistoryManager = require('./manager')

const router = new Router()

// Récupérer tout l'historique des quiz
router.get('/', (req, res) => {
  try {
    res.status(200).json(QuizHistory.get())
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
})

// Récupérer l'historique par ID
router.get('/:id', (req, res) => {
  try {
    const history = QuizHistory.getById(req.params.id)
    res.status(200).json(history)
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
})

// Récupérer l'historique par profileId
router.get('/profile/:profileId', (req, res) => {
  try {
    const profileId = parseInt(req.params.profileId, 10)
    const history = HistoryManager.getHistoryByProfileId(profileId)
    res.status(200).json(history)
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
})

// Récupérer l'historique par quizId
router.get('/quiz/:quizId', (req, res) => {
  try {
    const quizId = parseInt(req.params.quizId, 10)
    const history = HistoryManager.getHistoryByQuizId(quizId)
    res.status(200).json(history)
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
})

// Créer un nouvel enregistrement d'historique
router.post('/', (req, res) => {
  try {
    const quizHistory = QuizHistory.create(req.body)
    res.status(201).json(quizHistory)
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
})

// Supprimer un enregistrement d'historique par ID
router.delete('/:id', (req, res) => {
  try {
    QuizHistory.delete(req.params.id)
    res.status(200).json(QuizHistory.get())
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
})

module.exports = router