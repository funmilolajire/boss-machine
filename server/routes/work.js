const express = require('express');

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabaseById,
} = require('../db')

const router = express.Router();

router.param('workId', (req, res, next, id) => {
    const workId = id
    const work = getFromDatabaseById('work', workId);
    if (workId === req.minionId) {
        req.workId = workId;
        req.work = work;
        next()
    } else {
        return res.status(400).send("Work Not found!")
    }
})

router.get('/', (req, res, next) => {
    const allWork = getAllFromDatabase('work');
    const minionWork = allWork.filter(work => work.minionId === req.minionId)
    res.send(minionWork)
})

router.post('/', (req, res, next) => {
    const newWork = req.body;
    if (newWork) {
        res.status(201).send(addToDatabase('work', newWork))
    } else {
        res.status(400).send("Request Does Not Have A Body")
    }
})

router.put('/:workId', (req, res, next) => {
    const updateWork = req.body;
    if (updateWork) {
        res.status(201).send(updateInstanceInDatabase('work', updateWork))
        return updateWork;
    } else {
        res.status(400).send("Request Does Not Have A Body")
    }

})

router.delete('/:workId', (req, res, next) => {
    res.status(204).send(deleteFromDatabaseById('work', req.workId))
})

module.exports = router;