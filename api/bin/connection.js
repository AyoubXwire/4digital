const mysql = require("mysql2")

// const mysqlConnection = mysql.createConnection({
//     database: 'exampledb',
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     port: 8082
// })
//
// mysqlConnection.connect((err) => {
//     if (err) {
//         console.log(err.message)
//     } else {
//         console.log('Database connected')
//         module.exports = mysqlConnection
//     }
// })

const pool = mysql.createPool({
    database: 'exampledb',
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: 8082,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

module.exports = pool
