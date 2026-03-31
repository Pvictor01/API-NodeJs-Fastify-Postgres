import { sql } from "./db.js"

sql`
  CREATE TABLE IF NOT EXISTS videos (
    id          TEXT PRIMARY KEY,
    title       TEXT,
    description TEXT,
    duration    INTEGER
  )
`.then(() => {
  console.log('Tabela criada com sucesso!')
})

/*
async function clearDatabase() {
  try {
    // RESTART IDENTITY reseta os IDs para 1
    // CASCADE garante que se houver chaves estrangeiras, elas também sejam limpas
    await sql`TRUNCATE TABLE videos RESTART IDENTITY CASCADE`
    
    console.log('✅ Tabela de vídeos limpa com sucesso!')
  } catch (error) {
    console.error('❌ Erro ao limpar banco:', error)
  } finally {
    process.exit()
  }
}

clearDatabase()*/