const express = require("express")
const cors = require("cors")
require('dotenv').config()
const { PORT } = process.env

const app = express()

app.use(express.json())
app.use(cors())



const { home, style, js, waterJs, hikesHtml, waterHtml, logo  } = require("./controllers/pageCtrl")

app.get('/', home)
app.get('/css', style)
app.get('/js', js)
app.get('/waterJs', waterJs)
app.get('/hikesHtml', hikesHtml)
app.get('/waterHtml', waterHtml)
app.get('/logo', logo)



const { seed, getHikes, deleteHikes, createHikes } = require('./controllers/pageCtrl')

app.post('/seed', seed)
app.get('/hikes', getHikes)
app.post('/hikes', createHikes)
app.delete('/hikes/:id', deleteHikes)



app.listen(PORT, () => console.log(`Server is on ${PORT}`))