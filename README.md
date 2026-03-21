# API-NodeJs-Fastify-Postgre
Video Management API 🚀
Uma API RESTful de alta performance para gerenciamento de metadados de vídeos, desenvolvida para demonstrar conceitos de arquitetura moderna em Node.js.

🛠️ Tecnologias e Decisões Técnicas
Node.js: Runtime principal pela eficiência em operações de I/O.

Fastify: Escolhido em vez do Express por sua baixíssima sobrecarga (low overhead) e sistema de plugins eficiente.

PostgreSQL: Banco de dados relacional para garantir integridade e consistência dos dados.

Neon: Database-as-a-service (Serverless Postgres) que permite escalabilidade automática e facilidade no deploy.

📌 Funcionalidades (CRUD)
Create: Registro de novos vídeos (título, descrição, duração).

Read: Listagem de vídeos com suporte a filtros de busca (query params).

Update: Atualização de informações de vídeos existentes.

Delete: Remoção de registros do banco de dados.

🚀 Como rodar o projeto
Clone o repositório: git clone https://github.com/Pvictor01/API-NodeJs-Fastify-Postgre.git

Instale as dependências: npm install

Configure suas variáveis de ambiente (.env) com a connection string do Neon.

Execute a aplicação: npm run dev