// Exercício 3 — Repository de produtos (dados em memória)
const products = [];

function create(product) {
  const saved = { ...product };
  products.push(saved);
  return { ...saved };
}

function findById(id) {
  const product = products.find((item) => item.id === Number(id));
  return product ? { ...product } : null;
}

function updateStock(id, stock) {
  const product = products.find((item) => item.id === Number(id));
  product.stock = stock;
  return { ...product };
}

function clear() {
  products.length = 0;
}

module.exports = {
  create,
  findById,
  updateStock,
  clear,
};
