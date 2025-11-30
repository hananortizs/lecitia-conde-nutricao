# 🔗 Integração Frontend ↔ Backend

## ✅ Correções Realizadas

### 1. URLs da API Atualizadas

**Problema identificado:**
- Frontend estava usando `/lcn/leads/...` mas backend usa `/lcn/v1/leads/...`
- Frontend estava configurado para porta `5000` mas backend roda na porta `5014`

**Correções aplicadas:**

#### `frontend/src/services/api.ts`
- ✅ Base URL atualizada: `http://localhost:5014` (era `5000`)
- ✅ Todas as rotas atualizadas para incluir `/v1`:
  - `/lcn/leads/...` → `/lcn/v1/leads/...`
  - `/lcn/appointment/...` → `/lcn/v1/appointment/...`
  - `/lcn/payment/...` → `/lcn/v1/payment/...`

#### `frontend/src/config/google.ts`
- ✅ API_BASE_URL atualizada: `http://localhost:5014/lcn/v1`

#### `frontend/vite.config.ts`
- ✅ Porta padrão atualizada: `http://localhost:5014`

## 📋 Endpoints Configurados

### Leads
- `POST /lcn/v1/leads/validate-bmi` - Validar cálculo de IMC
- `POST /lcn/v1/leads/capture-lead` - Capturar lead
- `GET /lcn/v1/leads/{id}` - Obter lead por ID
- `GET /lcn/v1/leads` - Listar leads (com paginação)
- `GET /lcn/v1/leads/search` - Buscar leads
- `PUT /lcn/v1/leads/{id}/mark-converted` - Marcar como convertido

### Appointments
- `GET /lcn/v1/appointment/available-slots` - Horários disponíveis
- `POST /lcn/v1/appointment/reserve` - Reservar horário
- `GET /lcn/v1/appointment/{id}` - Obter appointment por ID
- `GET /lcn/v1/appointment` - Listar appointments
- `PUT /lcn/v1/appointment/{id}/cancel` - Cancelar appointment
- `GET /lcn/v1/appointment/check-availability` - Verificar disponibilidade

### Payment
- `POST /lcn/v1/payment/webhook` - Webhook de pagamento

## 🧪 Como Testar a Integração

### 1. Iniciar o Backend

```powershell
cd backend/LeticiaConde.Api
dotnet run
```

**Verificar:**
- ✅ API rodando em `http://localhost:5014`
- ✅ Swagger disponível em `http://localhost:5014/swagger`
- ✅ Banco de dados conectado

### 2. Iniciar o Frontend

```powershell
cd frontend
npm run dev
```

**Verificar:**
- ✅ Frontend rodando em `http://localhost:5173`
- ✅ Variável `VITE_API_URL` configurada (ou usando padrão `http://localhost:5014`)

### 3. Testar Endpoints no Swagger

1. Acesse `http://localhost:5014/swagger`
2. Teste os endpoints principais:
   - `POST /lcn/v1/leads/capture-lead`
   - `GET /lcn/v1/appointment/available-slots`
   - `POST /lcn/v1/appointment/reserve`

### 4. Testar no Frontend

#### Teste 1: Calculadora de IMC
1. Acesse a página inicial
2. Preencha peso e altura
3. Calcule o IMC
4. Verifique se o lead é capturado no backend

#### Teste 2: Agendamento
1. Complete a anamnese
2. Selecione data e horário
3. Verifique se os slots disponíveis são carregados do backend
4. Tente reservar um horário

### 5. Verificar CORS

Se houver erro de CORS, verifique:

**Backend (`Program.cs`):**
```csharp
policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
```

**Frontend:**
- Deve estar rodando em uma das portas permitidas

## 🔍 Troubleshooting

### Erro: "Network Error" ou "CORS Error"

**Solução:**
1. Verifique se o backend está rodando
2. Verifique se a porta está correta (5014)
3. Verifique as configurações de CORS no backend
4. Limpe o cache do navegador

### Erro: "404 Not Found"

**Solução:**
1. Verifique se a URL inclui `/v1`:
   - ✅ Correto: `/lcn/v1/leads/capture-lead`
   - ❌ Incorreto: `/lcn/leads/capture-lead`
2. Verifique se o backend está usando o prefixo `/lcn/v1`

### Erro: "Connection Refused"

**Solução:**
1. Verifique se o backend está rodando
2. Verifique se a porta 5014 está livre
3. Verifique o firewall

### Dados não aparecem

**Solução:**
1. Verifique o console do navegador (F12)
2. Verifique os logs do backend
3. Verifique se o banco de dados está conectado
4. Verifique se há dados no banco

## 📝 Variáveis de Ambiente

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5014
VITE_GOOGLE_CLIENT_ID=seu-client-id
VITE_API_BASE_URL=http://localhost:5014/lcn/v1
```

**Nota:** Se não criar arquivo `.env`, os valores padrão serão usados.

## ✅ Checklist de Validação

- [ ] Backend rodando na porta 5014
- [ ] Frontend rodando na porta 5173
- [ ] Swagger acessível
- [ ] CORS configurado corretamente
- [ ] Endpoints respondendo com sucesso
- [ ] Calculadora de IMC funcionando
- [ ] Captura de lead funcionando
- [ ] Agendamento funcionando
- [ ] Slots disponíveis sendo carregados
- [ ] Reserva de horário funcionando

## 🚀 Próximos Passos

1. Testar todos os fluxos principais
2. Verificar tratamento de erros
3. Adicionar loading states
4. Melhorar feedback visual
5. Adicionar validações no frontend

