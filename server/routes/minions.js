const express = require('express');

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabaseById,
} = require('../db')

const router = express.Router({ mergeParams: true })

router.param('minionId', (req, res, next, id) => {
    const minionId = id
    const minion = getFromDatabaseById('minions', minionId);
    if (minion) {
        req.minionId = minionId;
        req.minion = minion;
        next()
    } else {
        return res.status(404).send("Minion Not found!")
    }
})

router.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'))
})

router.post('/', (req, res, next) => {
    const newMinion = req.body;
    if (newMinion) {
        res.status(201).send(addToDatabase('minions', newMinion))
    } else {
        res.status(400).send("Request Doesn't Have A Body")
    }
})

router.get('/:minionId', (req, res, next) => {
    res.send(req.minion)
})

router.put('/:minionId', (req, res, next) => {
    const updateMinion = req.body;
    if (updateMinion) {
        res.send(updateInstanceInDatabase('minions', updateMinion))
    } else {
        res.status(400).send("Request Doesn't Have A Body")
    }
})

router.delete('/:minionId', (req, res, next) => {
    res.status(204).send(deleteFromDatabaseById('minions', req.minionId))
})


module.exports = router;