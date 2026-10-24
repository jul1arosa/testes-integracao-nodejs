// Exercício 3 — Repository de pedidos (dados em memória)
const orders = [];

function create(order) {
  const saved = {
    id: orders.length + 1,
    ...order,
  };

  orders.push(saved);
  return saved;
}

function findAll() {
  return [...orders];
}

function clear() {
  orders.length = 0;
}

module.exports = {
  create,
  findAll,
  clear,
};
