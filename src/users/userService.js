// Exercício 1 — Regras de negócio do cadastro de usuários
const repo = require('./userRepository');

function register(user) {
  const email = user && typeof user.email === 'string' ? user.email.trim() : '';

  // 1. rejeitar e-mail vazio
  if (email === '') {
    throw new Error('EMAIL_REQUIRED');
  }

  // 2. impedir e-mail duplicado
  if (repo.findByEmail(email)) {
    throw new Error('EMAIL_ALREADY_EXISTS');
  }

  // 3. cadastrar o usuário  /  4. o repository gera o id
  return repo.create({
    name: user.name,
    email,
  });
}

module.exports = {
  register,
};
