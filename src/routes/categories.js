const { Router } = require('express');
const router = Router();

const connection = require('../database');


router.post('/add', (req, res) => {
  const { tipo } = req.body

  const data = {
    tipo
  }

  if (req.session.loggedin) {
    const sql = 'INSERT INTO categoria SET ?';
    connection.query(sql, data, (error, result) => {
      if (error) {
        throw error
      } else {
        res.status(200).send({ message: "Category added successfully!" })
      }
    })
  }
});

router.get('/', (req, res) => {
  if (req.session.loggedin) {
    connection.query('SELECT * FROM categoria', (error, result) => {
      if (error) {
        throw error
      } else {
        res.send(result)
      }
    })
  }
});

router.put('/:id', (req, res) => {
  let id = req.params.id
  let tipo = req.body.tipo

  if (req.session.loggedin) {
    const sql = 'UPDATE categoria SET tipo = ? WHERE id_categoria = ?';
    connection.query(sql, [tipo, id], (error, result) => {
      if (error) {
        throw error
      } else {
        res.status(200).send({ message: "Server updated successfully!" })
      }
    })
  }
});

router.delete('/:id', (req, res) => {
  let id = req.params.id
  if (req.session.loggedin) {
    const sql = 'DELETE FROM categoria WHERE id_categoria = ?'
    connection.query(sql, id, (error, result) => {
      if (error) {
        throw error
      } else {
        res.status(200).send({ message: "Server deleted successfully!" })
      }
    })
  }
});

module.exports = router;