import { randomUUID } from "node:crypto"
import { sql } from "./db.js"
import type { Video } from "./src/schemas/video.schema" // Importando o tipo gerado pelo Zod

export class DatabasePostgres {
  // O parâmetro 'search' é opcional, então usamos a interrogação (?)
  async list(search?: string) {
    let videos

    if (search) {
      // O 'sql' do pacote postgres cuida da segurança contra SQL Injection automaticamente
      videos = await sql`select * from videos where title ilike ${'%' + search + '%'}`
    } else {
      videos = await sql`select * from videos`
    }

    return videos
  }

  // método 'create' só aceita objetos que respeitem o contrato do VideoSchema
  async create(video: Video) {
    const videoId = randomUUID()
    const { title, description, duration } = video

    await sql`
      insert into videos (id, title, description, duration) 
      values (${videoId}, ${title}, ${description}, ${duration})
    `
  }

  async update(id: string, video: Video) {
    const { title, description, duration } = video

    await sql`
      update videos 
      set title = ${title}, description = ${description}, duration = ${duration} 
      where id = ${id}
    `
  }

  async delete(id: string) {
    await sql`delete from videos where id = ${id}`
  }
}