# Arquitetura de Agendamento Unificado - WhatsApp + Site

## 🎯 **Objetivo**

Implementar um sistema unificado de controle de agenda que funcione tanto para agendamentos via WhatsApp quanto via site, **evitando conflitos de horários** e permitindo **reagendamento**.

---

## 📊 **Fluxo de Agendamento Atual**

### **Via Site:**

```
Lead → IMC Calculator → Formulário → Agendamento → Pagamento → Confirmação
```

### **Via WhatsApp (Proposto):**

```
Cliente → WhatsApp → Verifica Disponível → Agenda → Confirmação Manual
```

---

## 🏗️ **Arquitetura Proposta**

### **1. Sistema de Controle de Agenda Único**

```
┌─────────────────────────────────────────────────────────────┐
│                    BANCO DE DADOS ÚNICO                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Appointments (todas as consultas)                   │   │
│  │  - Status: Reserved, Confirmed, Cancelled            │   │
│  │  - Origin: 'site' ou 'whatsapp'                      │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  AvailableSlots (horários disponíveis)              │   │
│  │  - Calculado em tempo real                          │   │
│  │  - Exclui conflitos automáticos                     │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                         ↑              ↑
                         │              │
            ┌─────────────┘              └──────────────┐
            │                                            │
    Via Site (Frontend)                          Via WhatsApp
    - Calendar UI                                 - Bot/Manual
    - Real-time disponibilidade                   - Verifica API
    - Reserva automática                          - Confirma manual
```

---

## 🔧 **Implementação**

### **Endpoints Necessários**

#### **1. Verificar Cliente Recorrente**

```http
GET /pms/leads/find
Query Params: ?email={email}&whatsapp={whatsapp}
Response: { "exists": true, "leadId": 123, "isConverted": true }
```

#### **2. Obter Horários Disponíveis (Compartilhado)**

```http
GET /pms/appointments/available-slots
Query Params: ?startDate={date}&endDate={date}
Response: [{ "dateTime": "...", "available": true }, ...]
```

✅ **JÁ EXISTE** - Linha 40 em `AppointmentService.cs`

#### **3. Verificar Disponibilidade de Horário Específico**

```http
GET /pms/appointments/check-availability
Query Params: ?dateTime={datetime}
Response: { "available": true }
```

✅ **JÁ EXISTE** - Linha 245 em `AppointmentService.cs`

#### **4. Reservar via WhatsApp (Nova Funcionalidade)**

```http
POST /pms/appointments/reserve-whatsapp
Body: { "leadId": 123, "dateTime": "...", "origin": "whatsapp" }
Response: { "appointmentId": 456, "status": "Reserved" }
```

#### **5. Reagendar Consulta**

```http
PUT /pms/appointments/{id}/reschedule
Body: { "newDateTime": "..." }
Response: { "success": true, "newDateTime": "..." }
```

---

## 🎯 **Fluxo de Agendamento Unificado**

### **Cenário 1: Cliente Novo via Site**

```
1. Cliente calcula IMC → Lead criado
2. Acessa agendamento
3. Sistema mostra horários disponíveis (API unificada)
4. Cliente seleciona horário
5. Sistema reserva (Reserved status)
6. Pagamento → Confirmation
7. Link sala virtual gerado
```

### **Cenário 2: Cliente Recorrente via WhatsApp**

```
1. Cliente envia: "Quero agendar para terça 19h"
2. Sistema verifica lead existente (email/WhatsApp)
3. Sistema verifica disponibilidade via API: /pms/appointments/check-availability?dateTime=2025-01-07T19:00
4. ✅ Disponível → Confirma via WhatsApp
5. Sistema cria agendamento com origin='whatsapp'
6. Link sala virtual enviado por WhatsApp
```

### **Cenário 3: Cliente via Site + WhatsApp Simultaneamente**

```
1. Cliente A agenda via Site → 17:00 reservado
2. Cliente B pergunta via WhatsApp: "Tenho horário 17h?"
3. Sistema verifica via API /pms/appointments/check-availability
4. ❌ Indisponível → Sugere alternativas
5. Sistema retorna próximos horários disponíveis
```

---

## 🔄 **Reagendamento**

### **Via Site:**

```http
PUT /pms/appointments/{id}/reschedule
Body: { "newDateTime": "2025-01-07T20:00" }
```

### **Via WhatsApp:**

```
Cliente: "Posso mudar para 20h?"
Bot: Verificando disponibilidade...
Bot: ✅ Confirmado! Sua consulta foi reagendada para 20h
Bot: Link atualizado: [nova sala virtual]
```

---

## 🛡️ **Proteção contra Conflitos**

### **Verificação em Tempo Real**

```csharp
// Sempre antes de criar agendamento:
var available = await _appointmentService.CheckAvailabilityAsync(dateTime);
if (!available) {
    throw new InvalidOperationException("Slot não disponível");
}
```

### **Locks Temporários (Opcional - Futuro)**

```csharp
// Para evitar race condition
var lockKey = $"slot_{dateTime}";
await _cache.LockAsync(lockKey, TimeSpan.FromSeconds(30));
// ... reserva ...
```

---

## 📱 **Integração WhatsApp (Futuro)**

### **Opção 1: WhatsApp Business API**

- Bot automático
- Integração com API
- Custo: ~R$ 0,01/mensagem

### **Opção 2: Chatwoot + Twilio**

- Interface web
- Múltiplos canais
- Mais caro mas mais features

### **Opção 3: Manual (MVP Recomendado)**

- Letícia verifica disponibilidade via site
- Confirma via WhatsApp
- Sistema cria agendamento depois

---

## 🎨 **Interface Admin Dashboard (Futuro)**

```
┌──────────────────────────────────────────────────────┐
│  📅 AGENDA LETÍCIA CONDE NUTRICIONISTA              │
├──────────────────────────────────────────────────────┤
│  📅 Hoje - 15 Jan 2025                              │
│                                                       │
│  🕐 17:00 - João Silva [Site]    [✅ Confirmado]       │
│  🕐 18:00 - Maria Santos [WhatsApp] [⚠️ Reservado]   │
│  🕐 19:00 - (Disponível)                           │
│  🕐 20:00 - Pedro Costa [Site]    [✅ Confirmado]   │
│  🕐 21:00 - (Disponível)                           │
│                                                       │
│  📊 Esta semana: 12 consultas | 8 confirmadas       │
│  💰 Taxa de conversão: 67%                          │
└──────────────────────────────────────────────────────┘
```

---

## 🚀 **Implementação - Próximos Passos**

### **Fase 1: Endpoints Básicos (Esta Semana)**

1. ✅ Criar endpoint para verificar lead recorrente
2. ✅ Endpoint de reserva via WhatsApp
3. ✅ Endpoint de reagendamento

### **Fase 2: Interface Admin (Próxima Semana)**

1. Dashboard de visualização de agenda
2. Listagem de agendamentos por status
3. Filtros por data/origem

### **Fase 3: WhatsApp Bot (Mês 2)**

1. Integrar WhatsApp Business API
2. Bot de agendamento automático
3. Notificações de confirmação

---

## 📝 **Regras de Negócio**

### **Disponibilidade:**

- ✅ Seja via WhatsApp ou Site, **sempre verifica disponibilidade**
- ✅ Appointments têm lock por datetime único
- ✅ Status: Reserved (15min) → Confirmed

### **Reagendamento:**

- ✅ Cliente pode reagendar até 24h antes
- ✅ Cancelar → Libera slot automaticamente
- ✅ Histórico mantido para auditoria

### **Origem do Agendamento:**

- ✅ Campo `origin` em Appointment: 'site' ou 'whatsapp'
- ✅ Métricas: Taxa de conversão por origem
- ✅ Analytics: Qual canal converte mais?

---

## ✅ **Checklist de Implementação**

- [x] Documentar arquitetura
- [ ] Endpoint: Verificar lead recorrente
- [ ] Endpoint: Reservar via WhatsApp
- [ ] Endpoint: Reagendamento
- [ ] Testes de disponibilidade
- [ ] Dashboard admin
- [ ] Integração WhatsApp

---

**Autor**: Desenvolvido para Letícia Conde Nutricionista
**Data**: Janeiro 2025
**Versão**: 1.0
