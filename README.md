# API Videos

API RESTful para gerenciamento de vídeos, desenvolvida com Node.js e Fastify.

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [PostgreSQL](https://www.postgresql.org/) (v14 ou superior)

---

## Instalação e Configuração

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd api-nodejs-com-fastify
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente criando um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL=postgres://usuario:senha@localhost:5432/nome_do_banco
PORT=3333
```

| Variável       | Descrição                              | Obrigatória |
|----------------|----------------------------------------|-------------|
| `DATABASE_URL` | URL de conexão com o PostgreSQL        | Sim         |
| `PORT`         | Porta do servidor (padrão: 3333)       | Não         |

---

## Inicialização do Banco de Dados

Após configurar a variável `DATABASE_URL`, execute o script de criação da tabela:

```bash
node create-table.js
```

Isso criará a tabela `videos` com a seguinte estrutura:

| Coluna        | Tipo    | Descrição              |
|---------------|---------|------------------------|
| `id`          | TEXT    | Chave primária         |
| `title`       | TEXT    | Título do vídeo        |
| `description` | TEXT    | Descrição do vídeo     |
| `duration`    | INTEGER | Duração em segundos    |

---

## Executando o Projeto

Modo desenvolvimento (com hot-reload):

```bash
npm run dev
```

Modo produção:

```bash
npm start
```

O servidor será iniciado em `http://localhost:3333` (ou na porta definida pela variável `PORT`).

---

## Endpoints da API

### Visão Geral

**GET** `/`

Retorna informações gerais sobre a API.

**Resposta de sucesso (200):**

```json
{
  "status": "ok",
  "project": "API Videos",
  "environment": "Production",
  "endpoints": {
    "list": "GET /videos",
    "create": "POST /videos",
    "update": "PUT /videos/:id",
    "delete": "DELETE /videos/:id"
  }
}
```

---

### Criar Vídeo

**POST** `/videos`

Cria um novo vídeo.

**Request Body:**

```json
{
  "title": "Meu vídeo",
  "description": "Descrição do vídeo com pelo menos 10 caracteres",
  "duration": 120
}
```

| Campo         | Tipo   | Validação                                  |
|---------------|--------|--------------------------------------------|
| `title`       | string | Mínimo 3 caracteres                        |
| `description` | string | Mínimo 10 caracteres                       |
| `duration`    | number | Inteiro positivo                            |

**Resposta de sucesso (201):** Sem corpo na resposta.

**Resposta de erro (400):**

```json
{
  "message": "Dados inválidos",
  "errors": [
    {
      "field": "title",
      "message": "O título deve ter pelo menos 3 caracteres"
    }
  ]
}
```

**Resposta de erro (500):**

```json
{
  "message": "Erro interno no servidor"
}
```

---

### Listar Vídeos

**GET** `/videos`

Retorna a lista de vídeos. Suporta busca por texto.

**Query Parameters:**

| Parâmetro | Tipo   | Descrição                          | Obrigatório |
|-----------|--------|------------------------------------|-------------|
| `search`  | string | Filtro de busca por texto          | Não         |

**Exemplo:**

```
GET /videos?search=tutorial
```

**Resposta de sucesso (200):**

```json
[
  {
    "id": "uuid-do-video",
    "title": "Meu vídeo",
    "description": "Descrição do vídeo",
    "duration": 120
  }
]
```

---

### Atualizar Vídeo

**PUT** `/videos/:id`

Atualiza um vídeo existente.

**Parâmetros de rota:**

| Parâmetro | Tipo   | Descrição       |
|-----------|--------|-----------------|
| `id`      | string | ID do vídeo     |

**Request Body:**

```json
{
  "title": "Título atualizado",
  "description": "Descrição atualizada com pelo menos 10 caracteres",
  "duration": 180
}
```

**Resposta de sucesso (204):** Sem corpo na resposta.

**Resposta de erro (400):**

```json
{
  "message": "Dados inválidos",
  "errors": [
    {
      "field": "duration",
      "message": "A duração deve ser um número positivo"
    }
  ]
}
```

**Resposta de erro (500):**

```json
{
  "message": "Erro interno no servidor"
}
```

---

### Deletar Vídeo

**DELETE** `/videos/:id`

Remove um vídeo.

**Parâmetros de rota:**

| Parâmetro | Tipo   | Descrição       |
|-----------|--------|-----------------|
| `id`      | string | ID do vídeo     |

**Resposta de sucesso (204):** Sem corpo na resposta.

---

## Como testar

Você pode usar:
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)

Ou via terminal:

```bash
curl http://localhost:3333/videos
```
