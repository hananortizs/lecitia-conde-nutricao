# 🤖 Integração WhatsApp Bot - Letícia Conde Nutricionista

## 📊 **Análise de Opções de Integração**

### **Opção 1: WhatsApp Business API (Meta - Oficial)** ⭐ RECOMENDADO

#### **Características:**

- ✅ API oficial da Meta
- ✅ Escalável e confiável
- ✅ Suporte completo a automações
- ⚠️ Custo: ~R$ 0,01/mensagem
- ⚠️ Requer verificação de negócio

#### **Tecnologias:**

```python
# Python com Flask + WhatsApp Cloud API
from flask import Flask, request
import requests

app = Flask(__name__)

@app.post('/webhook')
def webhook():
    data = request.json
    # Processar mensagem
    # Verificar agendamento
    # Responder automaticamente
```

#### **Arquitetura:**

```
WhatsApp Business → Cloud API → Webhook → Backend .NET → Database
                                                            ↓
                                                    Verifica disponibilidade
                                                            ↓
                                                    Cria agendamento
```

#### **Custo Estimado:**

- Primeiro 1000 mensagens/mês: **GRÁTIS** ✨
- Após: R$ 0,01 por mensagem
- **Estimativa MVP**: ~R$ 50-100/mês

---

### **Opção 2: Twilio + WhatsApp** 💼

#### **Características:**

- ✅ Solução enterprise robusta
- ✅ Excelente documentação
- ✅ Suporte global
- ⚠️ Mais caro: R$ 0,05-0,10/mensagem
- ⚠️ Complexidade maior

#### **Tecnologias:**

```csharp
// C# / .NET com Twilio SDK
using Twilio;
using Twilio.Rest.Api.V2010.Account;

var message = MessageResource.Create(
    body: "Sua consulta foi confirmada!",
    from: new Twilio.Types.PhoneNumber("whatsapp:+5511999999999"),
    to: new Twilio.Types.PhoneNumber("whatsapp:+5511888888888")
);
```

#### **Custo Estimado:**

- Base: ~R$ 200/mês
- Mensagens: R$ 0,05-0,10 cada
- **Estimativa MVP**: ~R$ 300-500/mês

---

### **Opção 3: Evolution API (Não Oficial)** ⚠️ NÃO RECOMENDADO

#### **Características:**

- ✅ Gratuito (open source)
- ✅ Fácil instalação
- ❌ Não oficial (risco de banimento)
- ❌ Pode violar ToS do WhatsApp

#### **Risco:**

- WhatsApp pode banir número permanentemente
- Não adequado para negócio profissional

---

### **Opção 4: Chatwoot + WhatsApp** 🎯 HYBRID

#### **Características:**

- ✅ Interface web completa
- ✅ Múltiplos canais
- ✅ Histórico de conversas
- ⚠️ Custo médio

#### **Arquitetura:**

```
WhatsApp → Chatwoot → Backend → Database
                   ↓
            Dashboard Web para Letícia responder
```

#### **Tecnologias:**

- Frontend: React/Next.js
- Backend: Node.js + Chatwoot
- WhatsApp: Evolution API (interno do Chatwoot)

---

## 🎯 **Recomendação: WhatsApp Business API + Python FastAPI**

### **Por Quê?**

1. **Of dialogue**: Evita banimento
2. **Escalável**: Suporta crescimento
3. **Custo razoável**: ~R$ 50-100/mês para MVP
4. **Profissional**: Imagem de negócio
5. **Confiável**: API oficial da Meta

---

## 🏗️ **Arquitetura Proposta**

```
┌─────────────────────────────────────────────────────────────┐
│                    WHATSAPP BUSINESS API                     │
│                  (Meta Cloud API)                            │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ Webhook HTTP
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                   PYTHON MICROSERVICE                       │
│                  (FastAPI + SQLAlchemy)                     │
│                                                             │
│  → Recebe mensagem                                          │
│  → Processa intenção (NLU)                                  │
│  → Chama API .NET para verificar disponibilidade          │
│  → Responde automaticamente                                 │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ REST API
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                  BACKEND .NET (C#)                         │
│         (Verifica disponibilidade + Agenda)                │
│                                                             │
│  GET /appointments/check-availability                      │
│  POST /appointments/reserve-whatsapp                      │
│  PUT /appointments/{id}/reschedule                         │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
            ┌────────────────┐
            │   PostgreSQL   │
            │  (Agenda UNA)   │
            └────────────────┘
```

---

## 🔧 **Stack Tecnológica Recomendada**

### **1. WhatsApp Bot (Python)**

```python
# requirements.txt
fastapi==0.109.0
requests==2.31.0
python-decouple==3.8
sqlalchemy==2.0.23
httpx==0.25.2

# Tecnologias:
- FastAPI (Framework Web)
- Requests (HTTP Client)
- SQLAlchemy (ORM)
- WhatsApp Cloud API (Meta)
```

### **2. Backend .NET (Já Existe)**

```csharp
// Tecnologias:
- ASP.NET Core 8.0 ✅
- Entity Framework Core ✅
- PostgreSQL ✅
- FluentValidation (opcional)

// Novos endpoints a adicionar
- FindRecurringClient()
- ReserveViaWhatsApp()
- Reschedule()
```

### **3. Integração entre Python e .NET**

```python
# Python chama .NET
response = httpx.get(
    "http://localhost:7000/pms/appointments/check-availability",
    params={"dateTime": "2025-01-07T19:00"}
)
available = response.json()["data"]
```

---

## 📝 **Fluxo de Conversação Proposta**

### **Cenário 1: Cliente Novo**

```
Cliente: "Olá! Quero agendar uma consulta"
Bot: "Olá! Bem-vindo! Para iniciar, me informe:\n• Seu nome\n• Email\n• WhatsApp (seu número)"
Cliente: "João Silva, joao@email.com, 11998877655"
Bot: "Perfeito! Agora, qual dia e horário você prefere?"
Cliente: "Terça 19h"
Bot: "Verificando disponibilidade..."
Bot: ✅ "Ótimo! Terça 19h está disponível.\nConfirmo seu agendamento?"
Cliente: "Sim!"
Bot: "✅ Confirmado! Sua consulta:\n📅 Terça, 07 Jan\n🕐 19:00h\n🔗 Link: [gerado]\n\nLembrete: Pagamento via Pix"
```

### **Cenário 2: Cliente Recorrente**

```
Cliente: "Oi Letícia, quero reagendar"
Bot: "Olá João! Qual horário você prefere?"
Cliente: "Quinta 20h"
Bot: "Verificando..."
Bot: ✅ "Confirmado para Quinta 20h!\nLink atualizado enviado"
```

### **Cenário 3: Slot Indisponível**

```
Cliente: "Terça 19h"
Bot: "Verificando disponibilidade..."
Bot: ❌ "Esse horário já está ocupado. Opções:\n• Terça 18h ✅\n• Terça 20h ✅\n• Quarta 19h ✅\n\nQual prefere?"
Cliente: "Terça 20h"
Bot: "✅ Confirmado para Terça 20h!"
```

---

## 💻 **Implementação - Código Exemplo**

### **1. Webhook Handler (Python)**

```python
from fastapi import FastAPI, Request
from typing import Dict
import httpx

app = FastAPI()

@app.post("/webhook")
async def webhook(request: Request):
    data = await request.json()

    # Extrair mensagem
    message = data.get("messages", [{}])[0]
    from_number = message.get("from")
    body = message.get("body", "")

    # Processar intenção
    intent = detect_intent(body)  # "agendar", "reagendar", etc.

    # Verificar disponibilidade via .NET
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "http://localhost:7000/pms/appointments/check-availability",
            params={"dateTime": requested_time}
        )
        available = response.json()["data"]

    # Responder
    await send_whatsapp_message(from_number, response_text)

    return {"status": "ok"}
```

### **2. Processamento de Linguagem Natural (Simples)**

```python
def detect_intent(message: str) -> str:
    message = message.lower()

    if any(word in message for word in ["agendar", "marcar", "consulta"]):
        return "schedule"
    elif any(word in message for word in ["reagendar", "mudar", "alterar"]):
        return "reschedule"
    elif any(word in message for word in ["cancelar", "desmarcar"]):
        return "cancel"
    else:
        return "unknown"
```

---

## 💰 **Comparação de Custos**

| Solução                   | Custo Inicial | Custo Mensal | Complexidade | Profissional |
| ------------------------- | ------------- | ------------ | ------------ | ------------ |
| **WhatsApp Business API** | R$ 0          | R$ 50-100    | Média        | ⭐⭐⭐⭐⭐   |
| **Twilio**                | R$ 0          | R$ 300-500   | Alta         | ⭐⭐⭐⭐⭐   |
| **Chatwoot**              | R$ 200        | R$ 200-300   | Média        | ⭐⭐⭐⭐     |
| **Evolution API**         | R$ 0          | R$ 0         | Baixa        | ⭐⭐         |

---

## 🚀 **Roadmap de Implementação**

### **Fase 1: Preparação (Semana 1)**

- [ ] Criar conta WhatsApp Business
- [ ] Configurar webhook no Meta for Developers
- [ ] Criar serviço Python básico

### **Fase 2: Integração (Semana 2)**

- [ ] Conectar Python ↔ .NET
- [ ] Implementar verificação de disponibilidade
- [ ] Implementar criação de agendamento

### **Fase 3: Automação (Semana 3)**

- [ ] Processamento de intenções (NLU básico)
- [ ] Fluxos de conversação
- [ ] Testes com usuários reais

### **Fase 4: Melhorias (Semana 4)**

- [ ] Reagendamento automático
- [ ] Cancelamento automático
- [ ] Notificações e lembretes

---

## 📊 **Estatísticas Esperadas**

### **Cenário Conservador (Mês 1)**

- Mensagens: ~500/mês
- Custo: R$ 5 (dentro do limite grátis)
- Conversões: ~20-30%

### **Cenário Realista (Mês 6)**

- Mensagens: ~2.000/mês
- Custo: R$ 70
- Conversões: ~40-50%
- ROI: **Positivo** (se volume alto)

---

## ✅ **Decisão Final**

### **Recomendação: WhatsApp Business API + Python FastAPI**

**Por quê?**

1. ✅ Oficial (sem risco de banimento)
2. ✅ Custo razoável para MVP
3. ✅ Escalável para crescimento
4. ✅ Profissional e confiável
5. ✅ Primeiros 1.000 mensagens grátis

**Tecnologias:**

- Backend Bot: Python + FastAPI
- Integração: REST API (.NET)
- Database: PostgreSQL (compartilhado)
- WhatsApp: Meta Cloud API

**Próximo Passo:** Implementar microserviço Python?

---

**Autor**: Desenvolvido para Letícia Conde Nutricionista  
**Data**: Janeiro 2025  
**Versão**: 1.0
