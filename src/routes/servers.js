const { Router } = require('express');
const router = Router();

const connection = require('../database');


router.post('/add', (req, res) => {
  const { descripcion, telefono, usuario, clave } = req.body
  const data = {
    descripcion,
    telefono,
    usuario,
    clave
  }

  if (req.session.loggedin) {
    const sql = 'INSERT INTO servidor SET ?';
    connection.query(sql, data, (error, result) => {
      if (error) {
        throw error
      } else {
        res.status(200).send({ message: "Server added successfully!" })
      }
    })
  }
});

router.get('/', (req, res) => {

  if (req.session.loggedin) {
    connection.query('SELECT * FROM servidor', (error, result) => {
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
  let descripcion = req.body.descripcion
  let telefono = req.body.telefono
  let usuario = req.body.usuario
  let clave = req.body.clave

  if (req.session.loggedin) {
    const sql = 'UPDATE servidor SET descripcion = ?, telefono = ?, usuario = ?, clave = ? WHERE id_servidor = ?';
    connection.query(sql, [descripcion, telefono, usuario, clave, id], (error, result) => {
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
    const sql = 'DELETE FROM servidor WHERE id_servidor = ?'
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