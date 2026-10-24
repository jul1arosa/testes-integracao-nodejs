# Atividade N2_E4 — Testes de Integração com Node.js

**Estudante:** Julia Rosa

Projeto com testes de integração usando:

- Node.js;
- JavaScript;
- Express;
- Jest;
- Supertest.

O objetivo é verificar se as camadas do sistema funcionam corretamente **juntas**, e não apenas isoladamente. Nenhuma camada é substituída por mock: os testes usam os repositories reais (dados em memória).

---

## 1. Pré-requisitos

- Node.js e npm instalados.

Para conferir:

```bash
node -v
npm -v
```

---

## 2. Como instalar as dependências

Abra o terminal na pasta onde está o `package.json` e execute:

```bash
npm install
```

Esse comando cria a pasta `node_modules/` com o Express, o Jest e o Supertest.

---

## 3. Como executar os testes

Todos os testes:

```bash
npm test
```

Cada exercício separado:

```bash
npm run test:ex1
npm run test:ex2
npm run test:ex3
```

O resultado esperado é **3 suítes e 10 testes passando**. A imagem em `evidencias/` mostra essa execução.

---

## 4. Onde está cada exercício

```text
src/
├─ users/
│  ├─ userRepository.js     → Exercícios 1 e 2 (dados dos usuários)
│  ├─ userService.js        → Exercícios 1 e 2 (regras do cadastro)
│  └─ userRoutes.js         → Exercício 2 (rota POST /users)
├─ orders/
│  ├─ productRepository.js  → Exercício 3 (produtos e estoque)
│  ├─ orderRepository.js    → Exercício 3 (pedidos)
│  └─ orderService.js       → Exercício 3 (regras do pedido)
├─ app.js                   → Exercício 2 (configura o Express, sem listen())
└─ server.js                → inicia o servidor para teste manual
tests/
├─ users.integration.test.js       → Exercício 1
├─ users.http.integration.test.js  → Exercício 2
└─ orders.integration.test.js      → Exercício 3
examples/
└─ requests.http           → requisições para teste manual da API
evidencias/
└─ npm-test-todos-passando.png
```

### Exercício 1 — UserService + UserRepository

```text
UserService
    ↓
UserRepository
```

`register(user)` rejeita e-mail vazio (`EMAIL_REQUIRED`), impede e-mail duplicado (`EMAIL_ALREADY_EXISTS`), cadastra o usuário e o repository gera o `id`.

Testes em `tests/users.integration.test.js`:

- **Caso A — cadastro válido:** o usuário tem `id`, nome e e-mail corretos e fica salvo no repository.
- **Caso B — e-mail duplicado:** ocorre erro e a quantidade de registros continua 1.

### Exercício 2 — Integração HTTP com Supertest

```text
Supertest
    ↓
Express (app.js)
    ↓
Rota POST /users (userRoutes.js)
    ↓
UserService
    ↓
UserRepository
```

Testes em `tests/users.http.integration.test.js`:

- **Caso A — usuário válido:** status 201, dados corretos no body, `id` presente e usuário salvo no repository.
- **Caso B — e-mail duplicado:** o segundo POST retorna 409 com `{ "error": "EMAIL_ALREADY_EXISTS" }` e o repository continua com apenas 1 registro.

Os testes verificam a resposta HTTP **e também** o estado interno do repository.

### Exercício 3 — Pedido e estoque

```text
OrderService
    ↓                ↓
ProductRepository   OrderRepository
```

`createOrder(productId, quantity)` localiza o produto, verifica o estoque, calcula o total, diminui o estoque e salva o pedido. Todas as validações são feitas **antes** de alterar qualquer dado, por isso um erro não deixa alterações parciais.

Testes em `tests/orders.integration.test.js`:

- **Caso A — pedido válido:** com estoque 5 e quantidade 2, o pedido tem total 300, é salvo no OrderRepository e o estoque passa para 3.
- **Caso B — estoque insuficiente:** com estoque 2 e quantidade 5, ocorre erro, nenhum pedido é criado e o estoque continua 2.

---

## 5. Repositories reiniciados entre os testes

Cada arquivo de teste usa `beforeEach()` chamando `clear()` nos repositories:

```js
beforeEach(() => {
  repo.clear();
});
```

Assim, cada teste começa com os dados vazios e um teste não interfere no outro.

---

## 6. Executar a API manualmente (opcional)

```bash
npm start
```

A API sobe em `http://localhost:3000`. As requisições de exemplo estão em `examples/requests.http`.
