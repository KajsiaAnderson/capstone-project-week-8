const express = require("express")
const cors = require("cors")
require('dotenv').config()
const path = require("path")

const app = express()

app.use(express.json())
app.use(cors())



const { home, style, js, waterJs, hikesHtml, waterHtml, logo  } = require("./controllers/pageCtrl")

app.get('/', home)
app.get('/css', style)
app.get('/js', js)
app.get('/waterJs', waterJs)
app.get('/myHikes', hikesHtml)
app.get('/water', waterHtml)
app.get('/logo', logo)
app.get('/login', (req, res) => { res.sendFile(path.join(__dirname, "../login.html"))})
app.get('/loginCss', (req, res) => { res.sendFile(path.join(__dirname, "../login.css"))})
app.get('/loginJs', (req, res) => { res.sendFile(path.join(__dirname, "../login.js"))})
app.get('/logoutJs', (req, res) => { res.sendFile(path.join(__dirname, "../logout.js"))})



const { getHikes, createHikes, deleteHikes, register, login, logout } = require('./controllers/pageCtrl')

// app.post('/seed', seed)
app.get('/hikes', getHikes)
app.post('/hikes', createHikes)
app.delete('/hikes/:id', deleteHikes)
app.post('/register', register)
app.post('/login', login)
app.get('/logout', logout);

const { PORT } = process.env

app.listen(PORT, () => console.log(`Server is on ${PORT}`))