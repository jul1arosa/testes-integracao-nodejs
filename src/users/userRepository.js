// Exercício 1 — Repository de usuários (dados em memória)
const users = [];

function create(user) {
  const saved = {
    id: users.length + 1,
    ...user,
  };

  users.push(saved);
  return saved;
}

function findAll() {
  return [...users];
}

function findByEmail(email) {
  return users.find((user) => user.email === email) ?? null;
}

function clear() {
  users.length = 0;
}

module.exports = {
  create,
  findAll,
  findByEmail,
  clear,
};
