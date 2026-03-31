# 🚀 API Videos

API RESTful para gerenciamento de vídeos, desenvolvida com Node.js e Fastify.

---

## 🔗 Deploy
https://api-nodejs-fastify-postgres.onrender.com/

## 📌 Endpoints

### Listar vídeos
GET /videos

### Criar vídeo
POST /videos

Body:
{
  "title": "Meu vídeo",
  "description": "Descrição",
  "duration": 120
}

### Atualizar vídeo
PUT /videos/:id

### Deletar vídeo
DELETE /videos/:id

---

## 🧪 Como testar

Você pode usar:
- Postman
- Insomnia

Ou via terminal:

```bash
curl https://api-nodejs-fastify-postgres.onrender.com/videos
