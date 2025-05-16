const { Router } = require('express')
const QuizzesRouter = require('./quizzes')
const ProfileRouter = require('./profiles')
const GamemodeRouter = require('./gamemodes')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))

router.use('/quizzes', QuizzesRouter)

router.use('/profiles', ProfileRouter)

router.use('/gamemodes', GamemodeRouter)

module.exports = router
