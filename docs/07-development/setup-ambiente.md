# 🛠️ Setup do Ambiente de Desenvolvimento

Guia completo para configurar o ambiente de desenvolvimento do projeto Letícia Conde Nutrição.

## 📋 Pré-requisitos

### Obrigatórios

- **.NET 8.0 SDK** - [Download](https://dotnet.microsoft.com/download/dotnet/8.0)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **PostgreSQL 12+** - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/)

### Opcionais

- **Visual Studio 2022** ou **VS Code** - IDE
- **Postman** ou **Insomnia** - Testar API
- **Docker Desktop** - Para containerização (opcional)

## 🔧 Configuração do Backend

### 1. Instalar .NET 8.0 SDK

```bash
# Verificar instalação
dotnet --version
# Deve retornar: 8.0.x
```

### 2. Configurar PostgreSQL

#### Windows

```powershell
# Instalar PostgreSQL (se ainda não instalado)
# Download: https://www.postgresql.org/download/windows/

# Criar banco de dados
psql -U postgres
```

```sql
CREATE DATABASE leticia_conde_nutricao;
CREATE USER leticia_user WITH PASSWORD 'leticia123';
GRANT ALL PRIVILEGES ON DATABASE leticia_conde_nutricao TO leticia_user;
\q
```

### 3. Configurar String de Conexão

Edite `backend/LeticiaConde.Api/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=leticia_conde_nutricao;Username=leticia_user;Password=leticia123"
  }
}
```

### 4. Restaurar Dependências

```bash
cd backend
dotnet restore
```

### 5. Executar Migrations

```bash
cd backend/LeticiaConde.Api
dotnet ef database update
```

### 6. Executar Backend

```bash
dotnet run
```

Acesse: `http://localhost:5014/swagger`

## ⚛️ Configuração do Frontend

### 1. Instalar Node.js

```bash
# Verificar instalação
node --version
# Deve retornar: v18.x.x ou superior

npm --version
# Deve retornar: 9.x.x ou superior
```

### 2. Instalar Dependências

```bash
cd frontend
npm install
```

### 3. Configurar Variáveis de Ambiente

Crie arquivo `.env` na raiz do frontend:

```env
VITE_API_URL=http://localhost:5014
VITE_GOOGLE_CLIENT_ID=seu-client-id-aqui
```

### 4. Executar Frontend

```bash
npm run dev
```

Acesse: `http://localhost:5173`

## 🐳 Docker (Opcional)

### Usar Docker Compose

```bash
# Na raiz do projeto
docker-compose up -d
```

Isso iniciará PostgreSQL em container.

## ✅ Verificar Instalação

### Backend

```bash
# Testar endpoint
curl http://localhost:5014/swagger
# Deve retornar HTML do Swagger
```

### Frontend

```bash
# Acessar no navegador
http://localhost:5173
# Deve carregar a aplicação
```

## 🐛 Troubleshooting

### Erro: PostgreSQL não conecta

**Solução**:
1. Verificar se PostgreSQL está rodando
2. Verificar credenciais em `appsettings.json`
3. Testar conexão: `psql -h localhost -U leticia_user -d leticia_conde_nutricao`

### Erro: Porta já em uso

**Solução**:
1. Backend: Alterar porta em `launchSettings.json`
2. Frontend: Alterar porta em `vite.config.ts`
3. Ou parar processo usando a porta

### Erro: Migrations não aplicam

**Solução**:
```bash
# Deletar banco e recriar
psql -U postgres
DROP DATABASE leticia_conde_nutricao;
CREATE DATABASE leticia_conde_nutricao;
\q

# Reexecutar migrations
dotnet ef database update
```

### Erro: CORS no Frontend

**Solução**:
1. Verificar se backend está rodando
2. Verificar `VITE_API_URL` no `.env`
3. Verificar configuração CORS no backend

## 📚 Próximos Passos

Após configurar o ambiente:

1. Leia [Padrões de Código](./padroes-codigo.md)
2. Consulte [Guia de Contribuição](./guia-contribuicao.md)
3. Explore a [Documentação da API](../04-backend/README.md)

---

**Última Atualização**: Janeiro 2025

