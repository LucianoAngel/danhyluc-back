const { Router } = require('express');
const router = Router();

const connection = require('../database');


router.get('/', (req, res) => {
  connection.query('SELECT * FROM articulos', (error, files) => {
    if (error) {
      throw error
    } else {
      res.send(files)
    }
  })
})

module.exports = router;