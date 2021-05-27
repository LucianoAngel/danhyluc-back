const { Router } = require('express');
const router = Router();

const connection = require('../database');


router.post('/add', (req, res) => {
  const { descripcion, id_categoria, monto } = req.body
  const data = {
    descripcion,
    id_categoria,
    monto,
  }

  if (req.session.loggedin) {
    const sql = 'INSERT INTO servicio SET ?';
    connection.query(sql, data, (error, result) => {
      if (error) {
        throw error
      } else {
        res.status(200).send({ message: "Server added successfully!" })
      }
    })
  }
});

router.get('/:categoria_id', (req, res) => {
  const id = req.params.categoria_id

  if (req.session.loggedin) {
    connection.query(`SELECT * FROM servicio 
    INNER JOIN categoria 
    ON categoria.id_categoria=servicio.id_categoria
    WHERE categoria.id_categoria= ?`, id, (error, result) => {
      res.send(result)
    })
  }
})

router.get('/', (req, res) => {
  if (req.session.loggedin) {
    connection.query('SELECT * FROM servicio', (error, result) => {
      res.send(result)
    })
  }
})

router.put('/:id', (req, res) => {
  let id = req.params.id
  let descripcion = req.body.descripcion
  let id_categoria = req.body.id_categoria
  let monto = req.body.monto

  if (req.session.loggedin) {
    const sql = 'UPDATE servicio SET descripcion = ?, id_categoria = ?, monto = ? WHERE id_servicio = ?';
    connection.query(sql, [descripcion, id_categoria, monto, id], (error, result) => {
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
    const sql = 'DELETE FROM servicio WHERE id_servicio = ?'
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