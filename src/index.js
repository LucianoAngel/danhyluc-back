const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const path = require('path');

const app = express();
dotenv.config({path: __dirname + '/.env'});

app.set('port', process.env.PORT || 4000);

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);


app.use(cors({
  origin: ['http://localhost:8080'],
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true
}));


// app.use(('/'), require('./routes/index'));

app.use(('/auth'), require('./routes/auth'));
app.use(('/api/clients'), require('./routes/clients'));
app.use(('/api/servers'), require('./routes/servers'));
app.use(('/api/categories'), require('./routes/categories'));
app.use(('/api/services'), require('./routes/services'));
app.use(('/api/transactions'), require('./routes/transactions'));

app.use(express.static(path.join(__dirname, '../public/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dist/index.html'))
})

app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
