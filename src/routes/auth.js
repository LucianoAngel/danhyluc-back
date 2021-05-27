const { Router } = require('express');
const router = Router();
const bcrypt = require('bcryptjs');

const connection = require('../database');


router.post('/register', (req, res) => {
  const { nombre, usuario, clave } = req.body;

  connection.query('SELECT usuario FROM usuarios WHERE usuario = ?', [usuario], async (error, result) => {
    if (error) {
      throw error;
    };
    if (result.length > 0) {
      return res.send({ message: 'That user is already in use' });
    };
    const hash = await bcrypt.hash(clave, 8);
    connection.query('INSERT INTO usuarios SET ?', { nombre: nombre, usuario: usuario, clave: hash }, (error, result) => {
      if (error) {
        throw error
      } else {
        res.send({ message: 'User register successfully!' })
      }
    });
  });
});

router.post('/login', async (req, res) => {

  try {
    const { usuario, clave } = req.body;
    if (!usuario || !clave) {
      return res.status(400).send({ message: 'Please provide user and password' })
    };
    connection.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario], async (error, result) => {
      if (error) {
        res.status(400).send({ message: 'failed":"error ocurred' })
      } else {
        if (result.length > 0) {
          const comparation = await bcrypt.compare(clave, result[0].clave)
          if (comparation) {
            req.session.loggedin = true;
            req.session.usuario = usuario;
            res.status(200).send({ message: 'Loggin is successfully!' })
          } else {
            res.status(401).send({ message: 'User or password invalid' })
          }
        } else {
          res.status(206).send({ message: 'Email does not exits' });
        }
      }
    })

  } catch (error) {
    throw error;
  }
})

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.send('Login again here!');
});

module.exports = router;