import { fastify } from 'fastify' //importando fastify, ele separa a aplicaçao em varia rotas
//import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify() //criando server

//const database = new DatabaseMemory()  //database em memoria
const database = new DatabasePostgres()  //database em postgres

server.get("/", async () => {
  return {
    status: "ok",
    project: "API Videos",
    version: "1.0.0"
  }
})

server.post('/videos', async (request, reply) => {  
  //const body = request.body
  const { title, description, duration } = request.body  //desestruturaçao
  
  await database.create({
    title,  //title: title = short sintax
    description,
    duration
  })

  return reply.status(201).send()  //201 algo foi criado
}) 

server.get('/videos', async(request) => { 
  const search = request.query.search

  const videos = await database.list(search)

  return videos
}) 

server.put('/videos/:id', async (request, reply) => { //PUT http://localhost:3333/videos/id > Route Parameter
  const videoId = request.params.id
  const { title, description, duration } = request.body

  await database.update(videoId, {
    title,
    description,
    duration
  })

  return reply.status(204).send() //204 retorna resposta vazia
})

server.delete('/videos/:id', async (request, reply) => { 
  const videoId = request.params.id

  await database.delete(videoId)

  return reply.status(204).send()
})

server.listen({
  host: '0.0.0.0',
  port: process.env.PORT ?? 3333
})