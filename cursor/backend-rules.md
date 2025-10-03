# Backend Rules - Letícia Conde Nutrição

## 🏗️ **Arquitetura**

### **Clean Architecture**
- **Core**: Entidades e interfaces de domínio
- **Application**: Casos de uso, DTOs e serviços de aplicação
- **Infrastructure**: Implementações concretas (EF Core, PostgreSQL)
- **API**: Controllers e configurações da API

### **Estrutura de Projetos**
```
backend/
├── LeticiaConde.Core/           # Entidades e interfaces
├── LeticiaConde.Application/    # Casos de uso e DTOs
├── LeticiaConde.Infrastructure/ # Implementações concretas
└── LeticiaConde.Api/           # API e controllers
```

## 📝 **Nomenclatura**

### **Classes e Métodos**
- **PascalCase** para classes, métodos e propriedades
- **camelCase** para variáveis locais e parâmetros
- **UPPER_SNAKE_CASE** para constantes

### **Exemplos**
```csharp
// ✅ Correto
public class LeadService
{
    private const string DEFAULT_EMAIL = "contato@leticiaconde.com";
    
    public async Task<CapturedLeadDto> CaptureLeadAsync(CaptureLeadDto dto)
    {
        var leadId = await CreateLeadAsync(dto);
        return leadId;
    }
}

// ❌ Incorreto
public class lead_service
{
    public async Task<captured_lead_dto> capture_lead(lead_dto dto) { }
}
```

## 🗄️ **Banco de Dados**

### **PostgreSQL**
- **Nome do banco**: `lcn-database`
- **Usuário**: `leticia_user`
- **Senha**: `leticia123`
- **Timezone**: UTC (obrigatório)

### **Entity Framework**
- **Code First** approach
- **Migrations** automáticas em desenvolvimento
- **Configurações** no `ApplicationDbContext`

### **Entidades**
```csharp
// ✅ Estrutura padrão
public class EntityName
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    // ... outras propriedades
}
```

## 🌐 **API**

### **Endpoints**
- **Kebab-case** para rotas: `/api/resource-name/action`
- **PascalCase** para controllers: `LeadsController`
- **PascalCase** para métodos: `GetAllLeadsAsync`

### **Exemplos de Rotas**
```csharp
[Route("api/leads")]
public class LeadsController : ControllerBase
{
    [HttpGet]                    // GET /api/leads
    [HttpGet("{id}")]           // GET /api/leads/1
    [HttpPost("capture-lead")]  // POST /api/leads/capture-lead
    [HttpPut("{id}/mark-converted")] // PUT /api/leads/1/mark-converted
}
```

### **DTOs**
- **Sufixo**: `Dto` para todos os DTOs
- **Validação**: Data Annotations
- **Exemplo**: `CaptureLeadDto`, `CapturedLeadDto`

### **Respostas Padrão**
```csharp
public class ApiResponse<T>
{
    public T? Data { get; set; }
    public string? Error { get; set; }
    public bool Success => Error == null;
}
```

## 🔧 **Serviços**

### **Interfaces**
- **Prefixo**: `I` + nome do serviço
- **Sufixo**: `Service`
- **Exemplo**: `ILeadService`, `IAppointmentService`

### **Implementações**
- **Sufixo**: `Service`
- **Exemplo**: `LeadService`, `AppointmentService`

### **Injeção de Dependência**
```csharp
// Program.cs
builder.Services.AddScoped<ILeadService, LeadService>();
builder.Services.AddScoped<IAppointmentService, AppointmentService>();
```

## 📅 **Agendamentos**

### **Regras de Negócio**
1. **Horários fixos**: Seg-Qui 17:00-22:00, Dom aberto
2. **Sábado**: Bloqueado (Sabbath)
3. **Sexta**: Bloqueado após pôr do sol (Sabbath)
4. **Reserva provisória**: 15 minutos
5. **Confirmação**: Via webhook de pagamento

### **Validações**
- Verificar disponibilidade do horário
- Validar regras de Sabbath
- Confirmar existência do lead
- Gerar link da sala virtual

## 🔒 **Segurança**

### **Validação de Dados**
- **Data Annotations** em todos os DTOs
- **Validação de consistência** (ex: BMI)
- **Sanitização** de inputs

### **CORS**
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
```

## 📊 **Logs**

### **Níveis**
- **Information**: Operações normais
- **Warning**: Situações anômalas
- **Error**: Erros que não quebram a aplicação
- **Critical**: Erros críticos

### **Exemplo**
```csharp
_logger.LogInformation("Lead captured: {LeadId} - {Email}", lead.Id, lead.Email);
_logger.LogWarning("Payment not approved: {TransactionId}", transactionId);
_logger.LogError(ex, "Error processing payment webhook: {TransactionId}", transactionId);
```

## 🧪 **Testes**

### **Estrutura**
- **Unit Tests**: Para serviços e lógica de negócio
- **Integration Tests**: Para controllers e banco de dados
- **Nomenclatura**: `ClassName_MethodName_Scenario_ExpectedResult`

### **Exemplo**
```csharp
[Test]
public void CalculateBmi_ValidInputs_ReturnsCorrectBmi()
{
    // Arrange
    var dto = new CalculateBmiDto { Weight = 70, Height = 1.75 };
    
    // Act
    var result = _service.CalculateBmiAsync(dto).Result;
    
    // Assert
    Assert.AreEqual(22.86m, result.Bmi);
}
```

## 🚀 **Deploy**

### **Docker**
- **Multi-stage build** para otimização
- **Health checks** para monitoramento
- **Environment variables** para configuração

### **Configurações**
- **Development**: Logs detalhados, migrações automáticas
- **Production**: Logs mínimos, validações rigorosas
