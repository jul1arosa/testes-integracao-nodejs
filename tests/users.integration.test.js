// Exercício 1 — Integração: UserService + UserRepository (sem HTTP)
const service = require('../src/users/userService');
const repo = require('../src/users/userRepository');

beforeEach(() => {
  repo.clear();
});

describe('Exercício 1 — UserService + UserRepository', () => {
  test('Caso A — cadastro válido persiste o usuário com id', () => {
    const created = service.register({ name: 'Ana', email: 'ana@exemplo.com' });
    const saved = repo.findAll();

    // resultado retornado pelo service
    expect(created.id).toBeDefined();
    expect(created.name).toBe('Ana');
    expect(created.email).toBe('ana@exemplo.com');

    // estado do repository
    expect(saved).toHaveLength(1);
    expect(saved[0]).toEqual(created);
  });

  test('Caso B — e-mail duplicado lança erro e não cria segundo usuário', () => {
    service.register({ name: 'Ana', email: 'ana@exemplo.com' });
    const before = repo.findAll().length;

    expect(() =>
      service.register({ name: 'Outra Ana', email: 'ana@exemplo.com' }),
    ).toThrow('EMAIL_ALREADY_EXISTS');

    expect(repo.findAll()).toHaveLength(before);
    expect(repo.findAll()).toHaveLength(1);
    expect(repo.findAll()[0].name).toBe('Ana');
  });

  test('rejeita e-mail vazio e não persiste nada', () => {
    expect(() => service.register({ name: 'Ana', email: '' })).toThrow(
      'EMAIL_REQUIRED',
    );
    expect(repo.findAll()).toHaveLength(0);
  });

  test('cada teste começa com o repository vazio', () => {
    expect(repo.findAll()).toHaveLength(0);
  });
});
