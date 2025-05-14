const { Router } = require('express')

const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).status("ok")
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
})

module.exports = router