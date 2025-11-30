# 🥗 Letícia Conde Nutrição - Sistema de Agendamento

Sistema completo de captação de leads e agendamento de consultas nutricionais online.

## 🚀 Início Rápido

### Pré-requisitos

- **.NET 8.0 SDK** - Para o backend
- **Node.js 18+** - Para o frontend
- **PostgreSQL 12+** - Banco de dados

### Executar o Projeto

#### Backend

```bash
cd backend/LeticiaConde.Api
dotnet restore
dotnet ef database update
dotnet run
```

Acesse: `http://localhost:5014/swagger`

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse: `http://localhost:5173`

## 📚 Documentação

**Toda a documentação está organizada em [`/docs`](./docs/)**

Consulte o [README da Documentação](./docs/README.md) para navegar por todas as seções.

### Documentação Rápida

- 📖 [Visão Geral do Projeto](./docs/01-project/README.md)
- 🏗️ [Arquitetura Técnica](./docs/02-architecture/arquitetura-tecnica-backend.md)
- 📋 [Regras de Negócio](./docs/03-business-rules/regras-negocio.md)
- 🔧 [Backend](./docs/04-backend/README.md)
- ⚛️ [Frontend](./docs/05-frontend/README.md)
- 🔗 [Integração Frontend ↔ Backend](./docs/06-integration/integracao-frontend-backend.md)
- 📊 [Análise e Próximos Passos](./docs/08-project-management/analise-proximos-passos.md)

## 🛠️ Stack Tecnológico

### Backend
- ASP.NET Core 8.0
- PostgreSQL
- Entity Framework Core
- Clean Architecture

### Frontend
- React 19
- TypeScript
- Vite
- Styled Components

## 📁 Estrutura do Projeto

```
leticia-conde-nutricao/
├── backend/              # API ASP.NET Core
├── frontend/             # SPA React
├── docs/                 # 📚 Documentação completa
└── README.md             # Este arquivo
```

## 🎯 Funcionalidades Principais

- ✅ Calculadora de IMC com captação de leads
- ✅ Sistema de agendamento online
- ✅ Integração com Google Login
- ✅ Anamnese multi-step
- ✅ Respeito a horários e Sabbat
- ✅ Sistema de reserva com timeout

## 📝 Contribuindo

Consulte o [Guia de Contribuição](./docs/07-development/guia-contribuicao.md) para mais informações.

## 📄 Licença

Este projeto é privado e proprietário.

---

**Desenvolvido para Letícia Conde - Nutricionista**  
**Última Atualização**: Janeiro 2025

