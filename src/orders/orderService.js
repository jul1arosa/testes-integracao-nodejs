// Exercício 3 — Regras de negócio de pedidos e estoque
const productRepo = require('./productRepository');
const orderRepo = require('./orderRepository');

function createOrder(productId, quantity) {
  if (typeof quantity !== 'number' || quantity <= 0) {
    throw new Error('INVALID_QUANTITY');
  }

  // 1. localizar o produto
  const product = productRepo.findById(productId);

  if (!product) {
    throw new Error('PRODUCT_NOT_FOUND');
  }

  // 2. verificar o estoque
  // Todas as validações acontecem ANTES de alterar qualquer dado.
  // Assim, se der erro, nada fica alterado pela metade.
  if (product.stock < quantity) {
    throw new Error('INSUFFICIENT_STOCK');
  }

  // 3. calcular o valor total
  const total = product.price * quantity;

  // 4. diminuir o estoque
  productRepo.updateStock(product.id, product.stock - quantity);

  // 5. salvar o pedido
  return orderRepo.create({
    productId: product.id,
    quantity,
    total,
  });
}

module.exports = {
  createOrder,
};
