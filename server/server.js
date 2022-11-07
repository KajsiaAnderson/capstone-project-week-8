const express = require("express")
const cors = require("cors")
require('dotenv').config()
const {SERVER_PORT} = process.env

const app = express()

app.use(express.json())
app.use(cors())



const {home, style, js} = require("./controllers/pageCtrl")

app.get('/', home)
app.get('/style', style)
app.get('/js', js)



const {getHikes, deleteHikes, createHikes, updateHikes } = require('./controllers/pageCtrl')

app.get('/hikes', getHikes)
app.delete('/api/hikes/:id', deleteHikes)
app.post('/api/hikes', createHikes)
app.put('/api/hikes/:id', updateHikes)


const {PORT} = process.env

app.listen(PORT, () => console.log(`Server is on ${PORT}`))