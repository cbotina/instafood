const express = require('express')
const app = express()
const connectDB = require('./db/connect')
require('dotenv').config()

app.get('/', (req,res)=> res.end('hello world'))


const port = process.env.port || 3000

async function start(){
    try {
        await connectDB(process.env.MONGO_URI).then(console.log('DB Connection stablished'))
        app.listen(port, ()=> console.log(`Server is listening on port ${port}`))
    } catch (error) {
        
    }
}

start()

