const { Router } = require('express');
const router = Router();

const connection = require('../database');


router.post('/add', (req, res) => {
  const { descripcion, telefono, email, identificacion } = req.body
  const data = {
    descripcion,
    telefono,
    email,
    identificacion
  }

  if (req.session.loggedin) {
    const sql = 'INSERT INTO cliente SET ?';
    connection.query(sql, data, (error, result) => {
      if (error) {
        throw error
      } else {
          res.status(200).send({ message: "Client added successfully!" })
      }
    })
  }
});

router.get('/', (req, res) => {
  if (req.session.loggedin) {
    connection.query('SELECT * FROM cliente', (error, result) => {
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
  let email = req.body.email
  let identificacion = req.body.identificacion

  if (req.session.loggedin) {
    const sql = 'UPDATE cliente SET descripcion = ?, telefono = ?, email = ?, identificacion = ? WHERE id_cliente = ?';
    connection.query(sql, [descripcion, telefono, email, identificacion, id], (error, result) => {
      if (error) {
        throw error
      } else {
        res.status(200).send({ message: "Client updated successfully!" })
      }
    })
  }
});

router.delete('/:id', (req, res) => {
  let id = req.params.id
  if (req.session.loggedin) {
    const sql = 'DELETE FROM cliente WHERE id_cliente = ?'
    connection.query(sql, id, (error, result) => {
      if (error) {
        throw error
      } else {
        res.status(200).send({ message: "Client deleted successfully!" })
      }
    })
  }
});

module.exports = router;