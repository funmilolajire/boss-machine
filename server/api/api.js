const express = require('express');
const apiRouter = express.Router();


//require the ideas, meetings, minions routes
const ideasRouter = require('../routes/ideas');
const meetingsRouter = require('../routes/meetings');
const minionsRouter = require('../routes/minions');
const workRouter = require('../routes/work');

//mount the ideas, meetings, minions routes
apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/meetings', meetingsRouter);
apiRouter.use('/minions', minionsRouter);

// mount the work route
minionsRouter.use('/:minionId/work', workRouter)

module.exports = apiRouter;
