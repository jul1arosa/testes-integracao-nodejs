// Exercício 2 — Integração HTTP: Supertest → Express → Rota → UserService → UserRepository
const request = require('supertest');
const app = require('../src/app');
const repo = require('../src/users/userRepository');

beforeEach(() => {
  repo.clear();
});

describe('Exercício 2 — POST /users', () => {
  test('Caso A — usuário válido retorna 201 e fica salvo no repository', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'Ana', email: 'ana@exemplo.com' });

    // resposta HTTP
    expect(response.status).toBe(201);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.id).toBeDefined();
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Ana',
        email: 'ana@exemplo.com',
      }),
    );

    // estado interno do repository
    const saved = repo.findAll();
    expect(saved).toHaveLength(1);
    expect(saved[0]).toEqual(response.body);
  });

  test('Caso B — e-mail duplicado retorna 409 e mantém apenas um registro', async () => {
    const user = { name: 'Ana', email: 'ana@exemplo.com' };

    const first = await request(app).post('/users').send(user);
    const second = await request(app).post('/users').send(user);

    expect(first.status).toBe(201);

    // resposta HTTP do segundo POST
    expect(second.status).toBe(409);
    expect(second.body).toEqual({ error: 'EMAIL_ALREADY_EXISTS' });

    // estado interno do repository
    expect(repo.findAll()).toHaveLength(1);
    expect(repo.findAll()[0].id).toBe(first.body.id);
  });

  test('e-mail vazio retorna 400 e não salva nada', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'Ana', email: '' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'EMAIL_REQUIRED' });
    expect(repo.findAll()).toHaveLength(0);
  });
});
