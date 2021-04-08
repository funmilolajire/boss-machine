const express = require('express');

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabaseById,
} = require('../db')

//import middleware for checking if new or updated ideas are still worth at least one million dollars
const checkMillionDollarIdea = require('../checkMillionDollarIdea');

//create router
const router = express.Router({ mergeParams: true })

router.param('ideaId', (req, res, next, id) => {
    const ideaId = id
    const idea = getFromDatabaseById('ideas', ideaId);
    if (idea) {
        req.ideaId = ideaId;
        req.idea = idea;
        next()
    } else {
        return res.status(404).send("Idea Not found!")
    }
})

router.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'))
})

router.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = req.body;
    if (newIdea) {
        res.status(201).send(addToDatabase('ideas', newIdea))
    } else {
        res.status(400).send("Request Doesn't Have A Body")
    }
})

router.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
})

router.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    const updateIdea = req.body;
    if (updateIdea) {
        res.send(updateInstanceInDatabase('ideas', req.body))
    } else {
        res.status(400).send("Request Doesn't Have A Body")
    }
})

router.delete('/:ideaId', (req, res, next) => {
    res.status(204).send(deleteFromDatabaseById('ideas', req.ideaId))
})

module.exports = router;