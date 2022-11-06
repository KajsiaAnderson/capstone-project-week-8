const express = require("express")
const cors = require("cors")
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())


const {home, style} = require("./controllers/pageCtrl")

app.get('/', home)
app.get('/style', style)


const {PORT} = process.env

app.listen(PORT, () => console.log(`Server is on ${PORT}`))