const checkMillionDollarIdea = (req, res, next) => {
    const millionDollarIdea = (req.body.numWeeks * req.body.weeklyRevenue) >= 1000000;
    if (millionDollarIdea) {
        req.millionDollarIdea = millionDollarIdea;
        next()
    } else {
        return res.status(400).send("Not a million dollar idea plix. Take your smelling idea away from here.")
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
