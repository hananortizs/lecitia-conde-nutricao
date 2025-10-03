# Backend - Letícia Conde Nutricionista

API REST para sistema de captação de leads e agendamento de consultas nutricionais.

## 🚀 Tecnologias

- **.NET 8.0** - Framework principal
- **ASP.NET Core** - Framework web
- **Entity Framework Core** - ORM
- **PostgreSQL** - Banco de dados
- **Swagger/OpenAPI** - Documentação da API

## 📋 Pré-requisitos

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [PostgreSQL](https://www.postgresql.org/download/) (versão 12 ou superior)
- [Git](https://git-scm.com/)

## 🛠️ Instalação

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd leticia-conde-nutricao/backend
```

### 2. Configure o PostgreSQL

```sql
-- Conecte-se ao PostgreSQL e execute:
CREATE DATABASE leticia_conde_nutricao;
CREATE USER leticia_user WITH PASSWORD 'leticia123';
GRANT ALL PRIVILEGES ON DATABASE leticia_conde_nutricao TO leticia_user;
```

### 3. Atualize a string de conexão

Edite o arquivo `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=leticia_conde_nutricao;Username=leticia_user;Password=leticia123"
  }
}
```

### 4. Restaure as dependências

```bash
dotnet restore
```

### 5. Execute as migrações

```bash
dotnet ef database update
```

## 🏃‍♂️ Execução

### Desenvolvimento

```bash
dotnet run
```

### Usando o script PowerShell

```powershell
.\test-backend.ps1
```

## 📚 Documentação da API

Após iniciar o servidor, acesse:

- **Swagger UI**: https://localhost:7000/swagger
- **API Base URL**: https://localhost:7000/pms

## 🔗 Endpoints Principais

### Leads

- `POST /pms/leads/calcular-imc` - Calcular IMC
- `POST /pms/leads/capturar-imc` - Capturar lead
- `GET /pms/leads` - Listar leads
- `GET /pms/leads/{id}` - Obter lead por ID

### Agenda

- `GET /pms/agenda/slots-disponiveis` - Slots disponíveis
- `POST /pms/agenda/reservar` - Reservar horário
- `GET /pms/agenda` - Listar agendamentos
- `GET /pms/agenda/{id}` - Obter agendamento por ID

### Pagamento

- `POST /pms/pagamento/webhook` - Webhook de pagamento
- `POST /pms/pagamento/confirmar-agendamento` - Confirmar agendamento

## ⚙️ Configurações

### Horários de Funcionamento

- **Segunda a Quinta**: 17:00h às 22:00h
- **Domingo**: Horário aberto
- **Sexta e Sábado**: Bloqueado (Sabbat)

### Regra do Sabbat

- Integração com API de pôr do sol
- Bloqueio automático do pôr do sol de sexta ao pôr do sol de sábado
- Coordenadas: São Paulo (-23.5505, -46.6333)

## 🧪 Testes

### Testar Cálculo de IMC

```bash
curl -X POST "https://localhost:7000/pms/leads/calcular-imc" \
  -H "Content-Type: application/json" \
  -d '{"peso": 70, "altura": 1.75}'
```

### Testar Captura de Lead

```bash
curl -X POST "https://localhost:7000/pms/leads/capturar-imc" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@email.com",
    "whatsapp": "11999999999",
    "peso": 70,
    "altura": 1.75
  }'
```

## 🐛 Troubleshooting

### Erro de Conexão com PostgreSQL

- Verifique se o PostgreSQL está rodando
- Confirme as credenciais no `appsettings.json`
- Teste a conexão: `psql -h localhost -U leticia_user -d leticia_conde_nutricao`

### Erro de Porta em Uso

- Altere a porta no `launchSettings.json`
- Ou pare o processo que está usando a porta 7000

### Erro de Migração

- Delete o banco e recrie: `DROP DATABASE leticia_conde_nutricao;`
- Execute novamente: `dotnet ef database update`

## 📁 Estrutura do Projeto

```
LeticiaConde.Api/
├── Controllers/          # Controladores da API
├── Services/            # Lógica de negócio
├── Data/               # Contexto do banco de dados
├── Models/             # Entidades do domínio
├── DTOs/               # Objetos de transferência
├── Migrations/         # Migrações do banco
└── Program.cs          # Configuração da aplicação
```

## 🔒 Segurança

- Validação de entrada com Data Annotations
- CORS configurado para frontend específico
- Proteção contra SQL Injection (Entity Framework)
- Logs estruturados para auditoria

## 📊 Monitoramento

- Logs em diferentes níveis (Information, Warning, Error)
- Swagger para documentação interativa
- Health checks (futuro)
- Métricas de performance (futuro)
