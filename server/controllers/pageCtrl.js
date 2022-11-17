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
    waterJs: (req, res) => {
        res.sendFile(path.join(__dirname, "../../water.js"))
    },
    hikesHtml: (req, res) => {
        res.sendFile(path.join(__dirname, "../../my-hikes.html"))
    },
    waterHtml: (req, res) => {
        res.sendFile(path.join(__dirname, "../../water-calculator.html"))
    },
    logo: (req, res) => {
        res.sendFile(path.join(__dirname, "../../logo-new.png"))
    },
    // seed: (req, res) => {
    //     sequelize.query(`
    //     drop table if exists hikes;

    //     CREATE TABLE hikes(
    //         id SERIAL PRIMARY KEY,
    //         name VARCHAR(100) NOT NULL,
    //         distance FLOAT NOT NULL,
    //         elevation INT NOT NULL,
    //         route VARCHAR(100) NOT NULL,
    //         rating INT NOT NULL
    //       );

    //       INSERT INTO hikes (name, distance, elevation, route, rating)
    //       VALUES ('Lone Peak', 16.8, 5554, 'Out & Back', 5),
    //       ('Mount Timpanogos', 14.3, 4448, 'Out & Back', 5),
    //       ('Cascade Mountain', 16.7, 5396, 'Out & Back', 4),
    //       ('Provo Peak', 11.6, 6522, 'Out & Back', 1),
    //       ('Mount Nebo', 8.6, 3569, 'Out & Back', 4),
    //       ('Spanish Fork Peak', 10.6, 4685, 'Out & Back', 3),
    //       ('Loafer Mountain', 11.2, 3536, 'Out & Back', 2);
    //       `).then(() => {
    //         console.log('DB seeded!')
    //         res.sendStatus(200)
    //     }).catch(err => console.log('error seeding DB', err))
    // },

    getHikes: (req, res) => {
        sequelize.query(`
        SELECT * FROM hikes
        ORDER BY rating DESC;
    `)
            .then((dbRes) => {
                res.status(200).send(dbRes[0])
            })
    },

    createHikes: (req, res) => {
        let { name, distance, elevation, route, rating, token } = req.body
        // console.log(token)
        name = name.replaceAll("'", "''")

        sequelize.query(`
        INSERT INTO hikes (name, distance, elevation, route, rating, userid)
          VALUES (:name, :distance, :elevation, :route, :rating, :token);
          
          SELECT * FROM hikes
          WHERE userid = :token
          ORDER BY rating DESC;
          `,
            {
                replacements: { token: token, name, distance, elevation, route, rating }
            })
            .then((dbRes) => {
                res.status(200).send(dbRes[0])
            })
    },

    deleteHikes: (req, res) => {
        const { id } = req.params

        sequelize.query(`
        DELETE FROM hikes WHERE id = :id
        `,
            {
                replacements: { id: id }
            })
            .then((dbRes) => {
                console.log(dbRes)
                res.status(200).send(dbRes[0])
            })
            .catch((err) => {
                console.log(err)
                res.status(500).send('sequelize error')
            })
    },

    register: (req, res) => {
        const { first_name, last_name, email, password } = req.body

        sequelize.query(`
        INSERT INTO login (first_name, last_name, email, password)
          VALUES (:first_name, :last_name, :email, :password);
          `,
          {
            replacements: {first_name: first_name, last_name: last_name, email: email, password: password}
          })
            .then((dbRes) => {
                res.status(200).send(dbRes[0])
            })
    },

    login: (req, res) => {
        const { email, password } = req.body
        sequelize.query(`
        SELECT *
        FROM login
        WHERE email = :email AND password = :password
    `,
            {
                replacements: { email: email, password }
            })
            .then((dbRes) => {
                res.status(200).send(dbRes[0])
            })

    },

    logout: (req, res) => {
        res.clearCookie('accessToken');
        return res.status(200).send('Logout successful.');
    }
}