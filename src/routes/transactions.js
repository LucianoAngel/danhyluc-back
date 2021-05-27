const { Router } = require('express');
const router = Router();

const connection = require('../database');


router.post('/add', (req, res) => {
  const { fecha, id_cliente, monto_total, id_servicio } = req.body
  const data = {
    fecha,
    id_cliente,
    monto_total,
    id_servicio
  }

  if (req.session.loggedin) {
    const sql = 'INSERT INTO transaccion SET ?';
    connection.query(sql, data, (error, result) => {
      if (error) {
        throw error
      } else {
        res.status(200).send({ message: "Server added successfully!" })
      }
    })
  }
});


router.get('/:id_cliente/:id_servicio', (req, res) => {
  const id_cliente = req.params.id_cliente
  const id_servicio = req.params.id_servicio

  if (req.session.loggedin) {
    connection.query(`SELECT * FROM transaccion 
    INNER JOIN cliente
    ON cliente.id_cliente=?
    INNER JOIN servicio 
    ON servicio.id_servicio=?
    `, [id_cliente,id_servicio], (error, result) => {
      res.send(result)
    })
  }
})

router.get('/:cliente_id', (req, res) => {
  const id = req.params.cliente_id

  if (req.session.loggedin) {
    connection.query(`SELECT * FROM transaccion 
    INNER JOIN cliente 
    ON cliente.id_cliente=transaccion.id_cliente
    WHERE cliente.id_cliente= ?`, id, (error, result) => {
      res.send(result)
    })
  }
})

router.get('/', (req, res) => {
  if (req.session.loggedin) {
    connection.query('SELECT * FROM transaccion', (error, result) => {
      res.send(result)
    })
  }
})

router.put('/:id', (req, res) => {
  let id = req.params.id
  let fecha = req.body.fecha
  let id_cliente = req.body.id_cliente
  let monto_total = req.body.monto_total
  let id_servicio = req.body.id_servicio

  if (req.session.loggedin) {
    const sql = 'UPDATE transaccion SET fecha = ?, id_cliente = ?, monto_total = ?, id_servicio= ? WHERE id_transaccion = ?';
    connection.query(sql, [fecha, id_cliente, monto_total, id_servicio, id], (error, result) => {
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
    const sql = 'DELETE FROM transaccion WHERE id_transaccion = ?'
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