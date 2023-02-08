const notFoundMiddleware = (req, res) => res.status(404).send("Route doesn't exists");

module.exports = notFoundMiddleware;
