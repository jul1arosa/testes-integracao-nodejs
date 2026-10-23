// Exercício 2 — Rota HTTP de usuários
const express = require('express');
const { register } = require('./userService');

const router = express.Router();

router.post('/', (req, res) => {
  try {
    const user = register(req.body);
    return res.status(201).json(user);
  } catch (error) {
    if (error.message === 'EMAIL_ALREADY_EXISTS') {
      return res.status(409).json({ error: error.message });
    }

    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
