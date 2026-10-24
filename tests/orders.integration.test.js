// Exercício 3 — Integração: OrderService + ProductRepository + OrderRepository
const service = require('../src/orders/orderService');
const productRepo = require('../src/orders/productRepository');
const orderRepo = require('../src/orders/orderRepository');

beforeEach(() => {
  productRepo.clear();
  orderRepo.clear();
});

describe('Exercício 3 — Pedido e estoque', () => {
  test('Caso A — pedido válido é salvo e o estoque cai de 5 para 3', () => {
    productRepo.create({ id: 1, name: 'Teclado', price: 150, stock: 5 });

    const order = service.createOrder(1, 2);

    // pedido criado
    expect(order).toEqual({ id: 1, productId: 1, quantity: 2, total: 300 });
    expect(order.total).toBe(300);

    // pedido salvo no OrderRepository
    expect(orderRepo.findAll()).toHaveLength(1);
    expect(orderRepo.findAll()[0]).toEqual(order);

    // estoque alterado no ProductRepository
    expect(productRepo.findById(1).stock).toBe(3);
  });

  test('Caso B — estoque insuficiente não deixa alterações parciais', () => {
    productRepo.create({ id: 1, name: 'Teclado', price: 150, stock: 2 });

    expect(() => service.createOrder(1, 5)).toThrow('INSUFFICIENT_STOCK');

    // nenhum pedido criado
    expect(orderRepo.findAll()).toHaveLength(0);

    // estoque continua igual
    expect(productRepo.findById(1).stock).toBe(2);
  });

  test('produto inexistente lança erro e não cria pedido', () => {
    expect(() => service.createOrder(99, 1)).toThrow('PRODUCT_NOT_FOUND');
    expect(orderRepo.findAll()).toHaveLength(0);
  });
});
