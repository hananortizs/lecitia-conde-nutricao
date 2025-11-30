# Arquitetura Técnica - Backend

## 1. Tecnologias Utilizadas

### Framework e Linguagem

- **.NET 8.0**: Framework principal
- **C#**: Linguagem de programação
- **ASP.NET Core**: Framework web

### Banco de Dados

- **PostgreSQL**: Banco de dados relacional
- **Entity Framework Core**: ORM
- **Npgsql**: Provedor PostgreSQL

### Outras Dependências

- **Swagger/OpenAPI**: Documentação da API
- **HttpClient**: Comunicação com APIs externas
- **Newtonsoft.Json**: Serialização JSON

## 2. Estrutura do Projeto

```
LeticiaConde.Api/
├── Controllers/           # Controladores da API
│   ├── LeadsController.cs
│   ├── AgendaController.cs
│   └── PagamentoController.cs
├── Services/             # Lógica de negócio
│   ├── ILeadService.cs
│   ├── LeadService.cs
│   ├── IAgendaService.cs
│   └── AgendaService.cs
├── Data/                 # Acesso a dados
│   └── ApplicationDbContext.cs
├── Models/               # Entidades do domínio
│   ├── Lead.cs
│   ├── Agendamento.cs
│   └── ConfiguracaoHorario.cs
├── DTOs/                 # Objetos de transferência
│   ├── LeadDto.cs
│   └── AgendamentoDto.cs
└── Program.cs            # Configuração da aplicação
```

## 3. Padrões de Nomenclatura

### Endpoints (Kebab-Case)

- **Padrão**: `/pms/{recurso}/{acao}`
- **Exemplos**:
  - `GET /pms/leads/calcular-imc`
  - `POST /pms/leads/capturar-imc`
  - `GET /pms/agenda/slots-disponiveis`
  - `POST /pms/agenda/reservar`
  - `POST /pms/pagamento/webhook`

### Classes e Métodos (PascalCase)

- **Classes**: `LeadService`, `AgendaController`
- **Métodos**: `CalcularImcAsync`, `ReservarHorarioAsync`
- **Propriedades**: `Nome`, `Email`, `DataHora`

### Variáveis e Parâmetros (camelCase)

- **Variáveis**: `dataInicio`, `agendamentoExistente`
- **Parâmetros**: `leadId`, `dataHora`

## 4. Padrões de Resposta da API

### Estrutura Padrão

```json
{
  "data": { ... },
  "error": null,
  "success": true
}
```

### Códigos de Status HTTP

- **200 OK**: Operação bem-sucedida
- **201 Created**: Recurso criado com sucesso
- **400 Bad Request**: Dados inválidos
- **404 Not Found**: Recurso não encontrado
- **409 Conflict**: Conflito (ex: horário ocupado)

## 5. Configurações do Banco de Dados

### String de Conexão

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=leticia_conde_nutricao;Username=postgres;Password=postgres"
  }
}
```

### Migrações

- **Automáticas**: Em ambiente de desenvolvimento
- **Manuais**: Em produção
- **Comando**: `dotnet ef migrations add NomeMigracao`

## 6. Configurações de CORS

### Política Permitida

```csharp
policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
      .AllowAnyHeader()
      .AllowAnyMethod();
```

## 7. Logs e Monitoramento

### Níveis de Log

- **Information**: Operações normais
- **Warning**: Situações suspeitas
- **Error**: Falhas do sistema

### Logs Importantes

- Captura de leads
- Criação de agendamentos
- Confirmação de pagamentos
- Erros de integração com APIs externas

## 8. Integrações Externas

### API de Pôr do Sol

- **URL**: `https://api.sunrise-sunset.org/json`
- **Parâmetros**: `lat`, `lng`, `date`, `formatted=0`
- **Timeout**: 30 segundos
- **Fallback**: Retorna null em caso de erro

### Sistema de Pagamento

- **Webhook**: `/pms/pagamento/webhook`
- **Método**: POST
- **Validação**: Verificar assinatura (futuro)

## 9. Segurança

### Validações

- **Model Validation**: Data Annotations
- **Input Sanitization**: Automático pelo ASP.NET Core
- **SQL Injection**: Protegido pelo Entity Framework

### CORS

- **Origins**: Apenas frontend autorizado
- **Methods**: Apenas métodos necessários
- **Headers**: Configurável conforme necessário

## 10. Performance

### Otimizações

- **Async/Await**: Todas as operações de I/O
- **Entity Framework**: Queries otimizadas
- **HttpClient**: Reutilização de instâncias
- **Caching**: Futuro (Redis)

### Monitoramento

- **Logs**: Estruturados para análise
- **Métricas**: Tempo de resposta, taxa de erro
- **Health Checks**: Futuro implementação
