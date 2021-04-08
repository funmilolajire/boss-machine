const express = require('express');

const {
    createMeeting,
    addToDatabase,
    getAllFromDatabase,
    deleteAllFromDatabase,
} = require('../db')

const router = express.Router({ mergeParams: true })

router.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'))
})

router.post('/', (req, res, next) => {
    const newMeeting = createMeeting()
    res.status(201).send(addToDatabase('meetings', newMeeting))
})

router.delete('/', (req, res, next) => {
    res.status(204).send(deleteAllFromDatabase('meetings'))
})

//FINISHED

module.exports = router;