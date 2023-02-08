// eslint-disable-next-line no-unused-vars
const errorHandlerMiddleware = async (err, req, res, next) => {
  console.log(err);
  return res.status(500).json({ message: 'Something went wrong...' });
};

module.exports = errorHandlerMiddleware;
