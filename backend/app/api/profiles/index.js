const { Router } = require('express')
const Profiles = require('../../models/profile.model')
const router = new Router()

router.get('/', (req, res) => {
    try {
        res.status(200).json(Profiles.get())
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})

router.get('/:id', (req, res) => {
    try {
        const profile = Profiles.getById(req.params.id)
        res.status(200).json(profile)
    } catch (err) { console.log(err); }
})

router.delete('/:id', (req, res) => {
    try {
        Profiles.delete(req.params.id)
        res.status(200).json(Profiles.get())
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})

router.post('/', (req, res) => {
    try {
        const profiles = Profiles.create(req.body)
        res.status(201).json(profiles)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})


router.put('/', (req, res) => {
    try {
        const profiles = Profiles.update(req.body);
        res.status(201).json(profiles)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})

module.exports = router