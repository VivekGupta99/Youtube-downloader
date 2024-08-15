const express = require("express")
const cors = require('cors');
// const mongoose = require('mongoose');
// const MONGO_CONNECT = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}mymongoinit.6md0cxy.mongodb.net/smvd?retryWrites=true&w=majority`
require("dotenv").config()
const PORT = 3000


const app = express()

app.use(express.json())
app.use(cors());

const User = require('./models/user')

const publicRoutes = require('./routes/public')


app.use(publicRoutes)


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
