const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

connection.connect((error) => {
  if (error) {
    throw error
  }else{
    console.log('Conection is DB');
  }
})


module.exports = connection;