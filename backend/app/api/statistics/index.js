const { Router } = require('express')
const HistoryRouter = require('./history')

const router = new Router()

// Tu peux ajouter des routes générales pour les statistiques ici si nécessaire
router.get('/', (req, res) => {
  try {
    res.status(200).json("Statistics API is working")
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
})

// Utilise le routeur history pour les routes /statistics/history
router.use('/history', HistoryRouter)

module.exports = router