const express = require('express')
const app = express()


app.get('/', (req,res)=> res.end('hello world'))


const port = process.env.port || 3000
app.listen(port, ()=> console.log(`Server is listening on port ${port}`))

