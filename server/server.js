const express = require("express")
const cors = require("cors")
require('dotenv').config()
const { SERVER_PORT } = process.env

const app = express()

app.use(express.json())
app.use(cors())



// const { home, style, js } = require("./controllers/pageCtrl")

// app.get('/', home)
// app.get('/style', style)
// app.get('/js', js)



const { seed, getHikes, deleteHikes, createHikes } = require('./controllers/pageCtrl')

app.post('/seed', seed)
app.get('/hikes', getHikes)
app.post('/hikes', createHikes)
app.delete('/hikes/:id', deleteHikes)
// app.put('/api/hikes/:id', updateHikes)


const { PORT } = process.env

app.listen(PORT, () => console.log(`Server is on ${PORT}`))