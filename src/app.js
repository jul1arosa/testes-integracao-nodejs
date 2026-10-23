const express = require('express');
const userRoutes = require('./users/userRoutes');

const app = express();

app.use(express.json());
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'API de usuários em execução',
  });
});

module.exports = app;
