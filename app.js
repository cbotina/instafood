require('dotenv').config()
const express = require('express')
const { getTest } = require('./controllers/foodItem')
const app = express()
const connectDB = require('./db/connect')
const FoodItemRouter = require('./routes/foodItem')

app.get('/', (req,res)=> res.end('hello world'))
app.get('/test', getTest)
 
// routes

app.use('/api/v1/food', FoodItemRouter)

const port = process.env.port || 3000

async function start(){
    try {
        await connectDB(process.env.MONGO_URI).then(console.log('DB Connection stablished'))
        app.listen(port, ()=> console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()

