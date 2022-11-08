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
    // home: (req, res) => {
    //     res.sendFile(path.join(__dirname, "../../main.html"))
    // },
    // style: (req, res) => {
    //     res.sendFile(path.join(__dirname, "../../main.css"))
    // },
    // js: (req, res) => {
    //     res.sendFile(path.join(__dirname, "../../main.js"))
    // },
    seed: (req, res) => {
        sequelize.query(`
        drop table if exists hikes;
        drop table if exists mine;

        CREATE TABLE hikes(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            distance FLOAT NOT NULL,
            elevation INT NOT NULL,
            route VARCHAR(100) NOT NULL
          );

           
          CREATE TABLE mine(
            id SERIAL PRIMARY KEY,
            hike VARCHAR(100) NOT NULL,
            rating INT NOT NULL
            );
          
          INSERT INTO hikes (name, distance, elevation, route)
          VALUES ('Lone Peak', 15.6, 5554, 'Out & back'),
          ('Mount Timpanogos', 14.3, 4448, 'Out & back'),
          ('Cascade Mountain', 13.0, 5396, 'Out & back'),
          ('Provo Peak', 11.6, 6522, 'Out & back'),
          ('Mount Nebo', 8.6, 3569, 'Out & back'),
          ('Spanish Fork Peak', 10.6, 4685, 'Out & back'),
          ('Loafer Mountain', 11.2, 3536, 'Out & back');

          INSERT INTO mine(hike, rating)
          VALUES ('Big Baldy', 5);
          `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    },

    getHikes: (req, res) => {
        sequelize.query(`
        SELECT * FROM mine
    `)
            .then((dbRes) => {
                res.status(200).send(dbRes[0])
            })
    },

    createHikes: (req, res) => {
        const { hike, rating } = req.body

        sequelize.query(`
        INSERT INTO mine(hike, rating)
          VALUES('${hike}', ${rating})
          `)
          .then((dbRes) => {
            res.status(200).send(dbRes[0])
          })
    },

    deleteHikes: (req, res) => {
        const { id } = req.params

        sequelize.query(`
        DELETE FROM mine WHERE id = ${id}
        `)
            .then((dbRes) => {
                console.log(dbRes)
                res.status(200).send(dbRes[0])
            })
            .catch((err) => {
                console.log(err)
                res.status(500).send('sequelize error')
            })
    }
}