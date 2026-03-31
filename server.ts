import { fastify } from 'fastify'
import { DatabasePostgres } from './database-postgres.ts'
import { videoSchema } from './src/schemas/video.schema.ts' 
import { z } from 'zod'

const server = fastify()
const database = new DatabasePostgres()

// Rota Raiz (Visão Geral)
server.get("/", async () => {
  return {
    status: "ok",
    project: "API Videos",
    environment: "Production",
    endpoints: {
      list: "GET /videos",
      create: "POST /videos",
      update: "PUT /videos/:id",
      delete: "DELETE /videos/:id"
    }
  }
})

// Criar Vídeo (POST)
server.post('/videos', async (request, reply) => {
  try {
    // O Zod valida o corpo da requisição e já tipa a variável 'body' automaticamente
    const body = videoSchema.parse(request.body)
    
    await database.create(body)

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof z.ZodError) {
      // O Zod coloca os detalhes em 'error.issues' ou 'error.errors'
      return reply.status(400).send({ 
        message: "Dados inválidos", 
        // Usamos o opcional chaining (?.) para evitar o erro de 'undefined'
        errors: error.issues?.map(err => ({
          field: err.path.join('.'),
          message: err.message
        })) || error.message 
      })
    }
    
    console.error(error) // Importante para você ver no terminal o que houve
    return reply.status(500).send({ message: "Erro interno no servidor" })
  }
})

// Listar Vídeos (GET)
server.get('/videos', async (request) => {
  // Query params no Fastify são tipados como 'unknown' por padrão; fazemos um cast simples ou nova validação
  const { search } = request.query as { search?: string }

  const videos = await database.list(search)

  return videos
})

// Atualizar Vídeo (PUT)
server.put('/videos/:id', async (request, reply) => {
  try {
    // Pegamos o ID da URL (Route Parameter)
    const { id } = request.params as { id: string }
    
    // Validamos o corpo da requisição com o Zod
    const body = videoSchema.parse(request.body)

    await database.update(id, body)

    // 204 No Content: Sucesso, mas sem corpo na resposta (padrão REST)
    return reply.status(204).send()
  } catch (error) {
    if (error instanceof z.ZodError) {
      // O Zod coloca os detalhes em 'error.issues' ou 'error.errors'
      return reply.status(400).send({ 
        message: "Dados inválidos", 
        // Usamos o opcional chaining (?.) para evitar o erro de 'undefined'
        errors: error.issues?.map(err => ({
          field: err.path.join('.'),
          message: err.message
        })) || error.message 
      })
    }
    
    console.error(error) // Importante para você ver no terminal o que houve
    return reply.status(500).send({ message: "Erro interno no servidor" })
  }
})

// Deletar Vídeo (DELETE)
server.delete('/videos/:id', async (request, reply) => {
  const { id } = request.params as { id: string }

  await database.delete(id)

  return reply.status(204).send()
})

// Configuração de Porta para Deploy (Render/Railway)
const port = Number(process.env.PORT) || 3333

server.listen({
  host: '0.0.0.0',
  port: port
}).then(() => {
  console.log(`HTTP Server running on http://localhost:${port}`)
})