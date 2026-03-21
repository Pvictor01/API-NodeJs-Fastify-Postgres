import { randomUUID } from "node:crypto" //gera um id unico universal

export class DatabaseMemory {
  #videos = new Map() //propriedade privada, a info so pode ser vista dentro da classe
  //map armazena chave, valor
  list(search) {
    return Array.from(this.#videos.entries()).map((videoArray) => { //retorno em forma de array, map percorre o arr e retorna o id e os dados 
      const id = videoArray[0]
      const data = videoArray[1]

      return {
        id,
        ...data
      }
    }).filter(video => {
      if(search) {
        return video.title.includes(search)
      }

      return true
    })
  }
  
  create(video) {
    const videoId = randomUUID()

    this.#videos.set(videoId, video)
  } 

  update(id, video) {
    this.#videos.set(id, video)
  }

  delete(id) {
    this.#videos.delete(id)
  }
}