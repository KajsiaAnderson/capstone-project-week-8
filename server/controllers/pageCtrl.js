const path = require("path")
require('dotenv').config()
const CONNECTION_STRING = process.env.CONNECTION_STRING
const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    home: (req, res) => {
        res.sendFile(path.join(__dirname, "../../main.html"))
    },
    style: (req, res) => {
        res.sendFile(path.join(__dirname, "../../main.css"))
    },
    js: (req, res) => {
        res.sendFile(path.join(__dirname, "../../main.js"))
    },
    getHikes: (req, res) => {
        sequelize.query(`
        SELECT * FROM hikes
    `)
        .then((dbRes) => {
            res.status(200).send(dbRes[0])
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send('error in getting hikes')
        })
    },
    deleteHikes: (req, res) => {
        const { id } = req.params

        sequelize.query(`
        DELETE FROM hikes WHERE hike_id = ${id}
        `)
            .then((dbRes) => {
                res.status(200).send(dbRes[0])
            })
            .catch((err) => {
                console.log(err)
                res.status(500).send('sequelize error')
            })
    },
    createHikes: (req, res) => {
        const { title, rating, imageUrl } = req.body
       

        // this code finds me the next, non-used id in my "database"
        let greatestId = -1
        for (let i = 0; i < hikes.length; i++) {
            if (hikes[i].id > greatestId) {
                greatestId = hikes[i].id
            }
        }
        let nextId = greatestId + 1

        let newHike = {
            id: nextId,
            title,
            // same thing as: title: title
            rating,
            imageUrl
        }

        hikes.push(newHike)
        // console.log(movies)
        res.status(200).send(hikes)
    },
    // updateHikes: (req, res) => {
    //     let type = req.body.type
    //     let id = req.params.id
    //     // console.log(type + ' to ' + id)
    //     let index = movies.findIndex(element => element.id === +id)

    //     if (type === 'plus') {
    //         movies[index].rating++
    //         res.status(200).send(movies)
    //     } else if (type === 'minus') {
    //         movies[index].rating--
    //         res.status(200).send(movies)
    //     } else {
    //         res.sendStatus(400)
    //     }
    // }
}