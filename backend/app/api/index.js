const { Router } = require('express')
const QuizzesRouter = require('./quizzes')
const ProfileRouter = require('./profiles')
const StatisticsRouter = require('./statistics')  // Ce chemin doit pointer vers le dossier statistics

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))

router.use('/quizzes', QuizzesRouter)
router.use('/profiles', ProfileRouter)
router.use('/statistics', StatisticsRouter)  // Cette ligne doit matcher le nom du router

module.exports = router