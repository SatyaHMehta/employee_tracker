const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'employees'
})

connection.connect((err)=>{
    if(err) throw err;
})

module.exports = connection;