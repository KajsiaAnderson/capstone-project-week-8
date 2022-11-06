const path = require("path")

module.exports = {
    home: (req, res) => {
        res.sendFile(path.join(__dirname, "../../main.html"))
    },
    style: (req, res) => {
        res.sendFile(path.join(__dirname, "../../main.css"))
    }
}