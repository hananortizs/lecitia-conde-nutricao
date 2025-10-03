# Letícia Conde Nutricionista - SPA

Sistema de captação de leads e agendamento para a nutricionista Letícia Conde.

## Visão Geral

Este projeto consiste em uma Single Page Application (SPA) que automatiza a qualificação de leads através de uma Calculadora de IMC e gerencia o agendamento de consultas online, respeitando regras de negócio complexas de horário (incluindo o Sabbat).

## Tecnologias

### Backend
- **C# ASP.NET Core** - API robusta para lógica de agendamento
- **PostgreSQL** - Banco de dados relacional
- **Entity Framework Core** - ORM

### Frontend
- **React** - Framework JavaScript
- **Vite** - Build tool e dev server
- **TypeScript** - Tipagem estática

## Estrutura do Projeto

```
root/
├── backend/                  # Projeto C# ASP.NET Core
├── frontend/                 # Projeto SPA (Vite/React)
└── README.md                 # Este arquivo
```

## Configuração de Ambiente

### Basepath da API
A API utiliza basepath dinâmico baseado no ambiente:
- **Desenvolvimento**: `lc-dev/`
- **Homologação**: `lc-hml/`
- **Produção**: `lc-prd/`

### Padrão de Rotas
Todas as rotas seguem o padrão kebab-case com `[controller]`:
- `/api/agenda/slots-disponiveis`
- `/api/agenda/reservar`
- `/api/leads/capturar-imc`

## Regras de Negócio

### Horários de Funcionamento
- **Segunda a Quinta-feira**: 17:00h às 22:00h
- **Domingo**: Horário aberto
- **Sexta-feira e Sábado**: Totalmente bloqueado (Sabbat)

### Paleta de Cores

#### Tema Claro
- Fundo Principal: #FAFAFA
- Texto Principal: #333333
- Principal (Saúde): #4CAF50
- Secundária (Confiança): #2196F3
- Acento/CTA (Energia): #FF7043

#### Tema Escuro
- Fundo Principal: #121212
- Texto Principal: #FAFAFA
- Principal (Saúde): #66BB6A
- Acento/CTA (Energia): #FF8A65

## Como Executar

### Backend
```bash
cd backend/LeticiaConde.Api
dotnet run
```

### Frontend
```bash
cd frontend/nutri-frontend
npm install
npm run dev
```

## Documentação da API

A documentação completa da API está disponível através do Swagger quando o backend estiver em execução.

