require('dotenv').config();
require('express-async-errors');

const express = require('express');
const { getTest } = require('./controllers/foodItem');
const connectDB = require('./db/connect');

const app = express();
const FoodItemRouter = require('./routes/foodItem');
const NotFoundMiddleware = require('./middleware/not-found');
const ErrorHandlerMiddleware = require('./middleware/error-handler');

app.get('/', (req, res) => res.end('hello world'));
app.get('/test', getTest);

// routes
app.use('/api/v1/food', FoodItemRouter);

// Middlewares
app.use(NotFoundMiddleware);
app.use(ErrorHandlerMiddleware);

const port = process.env.port || 3000;

async function start() {
  try {
    await connectDB(process.env.MONGO_URI).then(console.log('DB Connection stablished'));
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
}

start();
