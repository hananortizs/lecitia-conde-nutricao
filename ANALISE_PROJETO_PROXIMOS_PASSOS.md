# 📊 Análise do Projeto - Próximos Passos

**Data**: Janeiro 2025  
**Projeto**: Letícia Conde Nutricionista - Sistema de Agendamento e Captação de Leads

---

## ✅ **O QUE JÁ ESTÁ IMPLEMENTADO**

### **Frontend (React + TypeScript + Vite)**

#### **✅ Funcionalidades Core**

- [x] Sistema de temas (claro/escuro)
- [x] Layout responsivo completo
- [x] Navegação entre páginas (Home, Sobre, Contato, Agendamento)
- [x] Header e Footer completos

#### **✅ Calculadora de IMC**

- [x] Formulário com validações
- [x] Cálculo de IMC local
- [x] Classificação OMS
- [x] Integração com Google Login
- [x] Pré-preenchimento de dados via Google
- [x] Persistência de sessão (localStorage)
- [x] Logout funcional
- [x] WhatsApp como campo obrigatório após login

#### **✅ Sistema de Agendamento**

- [x] Tela inicial de decisão (Site vs WhatsApp)
- [x] Anamnese multi-step (4 etapas):
  - [x] Informações Básicas
  - [x] Objetivos e Motivação
  - [x] Experiência e Hábitos
  - [x] Agendamento (calendário + horários)
- [x] Guia de progresso visual (círculos conectados)
- [x] Navegação entre etapas (setas + botões)
- [x] Validação de formulários
- [x] Calendário interativo
- [x] Seleção de horários
- [x] UX/UI responsiva mobile e desktop

#### **✅ Autenticação**

- [x] Google Login (OAuth 2.0)
- [x] Persistência de sessão
- [x] Context API para gerenciamento de estado
- [x] Pré-preenchimento automático de formulários

#### **✅ Componentes Reutilizáveis**

- [x] Styled Components (Button, Input, Card, etc.)
- [x] PhoneInput com máscara
- [x] DatePicker básico
- [x] Componentes de Layout

---

### **Backend (ASP.NET Core 8.0 + PostgreSQL)**

#### **✅ Estrutura Base**

- [x] Arquitetura em camadas (Core, Application, Infrastructure, API)
- [x] Entity Framework Core configurado
- [x] Migrations do banco de dados
- [x] Swagger/OpenAPI documentação

#### **✅ Entidades**

- [x] Lead (captação de leads)
- [x] Appointment (agendamentos)
- [x] ScheduleConfiguration (configurações de horário)

#### **✅ Endpoints de Leads**

- [x] POST `/pms/leads/capture-lead` - Capturar lead
- [x] GET `/pms/leads/{id}` - Obter lead por ID
- [x] GET `/pms/leads` - Listar todos os leads
- [x] PUT `/pms/leads/{id}/mark-converted` - Marcar como convertido

#### **✅ Endpoints de Agendamento**

- [x] GET `/pms/appointments/available-slots` - Slots disponíveis
- [x] GET `/pms/appointments/check-availability` - Verificar disponibilidade
- [x] POST `/pms/appointments/reserve` - Reservar horário

#### **✅ Lógica de Negócio**

- [x] Regras de horário (Seg-Qui: 17h-22h, Dom: aberto)
- [x] Bloqueio de Sabbat (Sexta-Sábado)
- [x] Validação de conflitos de agendamento
- [x] Cálculo de slots disponíveis

---

## 🔴 **O QUE ESTÁ FALTANDO OU INCOMPLETO**

### **🔴 CRÍTICO - Funcionalidades Essenciais**

#### **1. Integração Frontend ↔ Backend (INCOMPLETA)**

- [ ] **Verificação de cliente recorrente** (TODO no código)
  - Frontend: `AppointmentSteps.tsx` linha 471, 564
  - Backend: Endpoint `/pms/leads/find` não implementado
- [ ] **Submissão de anamnese completa ao backend**
  - `App.tsx` apenas faz `console.log`, não salva
  - Falta endpoint para salvar `PreConsultationData`
- [ ] **Busca de horários disponíveis em tempo real**
  - `AppointmentStep.tsx` não busca slots do backend
  - Usa horários hardcoded no frontend
- [ ] **Criação de agendamento após anamnese**
  - Fluxo atual não cria appointment no backend
  - Falta integração com `appointmentService.reserveTimeSlot`

#### **2. Sistema de Pagamento (NÃO IMPLEMENTADO exactamente como descrito)**

- [ ] Gateway de pagamento (Pix/Stripe/Mercado Pago)
- [ ] Webhook de confirmação de pagamento
- [ ] Geração de link de pagamento
- [ ] Timeout de 15 minutos para pagamento

#### **3. Sala Virtual (NÃO IMPLEMENTADO)**

- [ ] Geração automática de link Google Meet
- [ ] Formato: `https://meet.google.com/leticia-conde-{dataHora}`
- [ ] Envio de link após confirmação

---

### **🟡 IMPORTANTE - Melhorias e Funcionalidades Secundárias**

#### **4. Funcionalidades de Cliente Recorrente**

- [ ] Endpoint `/pms/leads/find` (email/whatsapp)
- [ ] Lógica para identificar cliente recorrente
- [ ] Fluxo diferenciado para clientes recorrentes
- [ ] Permissão de reagendamento

#### **5. Reagendamento de Consultas (NÃO IMPLEMENTADO)**

- [ ] Endpoint `PUT /pms/appointments/{id}/reschedule`
- [ ] Interface para reagendamento
- [ ] Validação de prazo (24h antes)
- [ ] Liberação automática de slot anterior

#### **6. Dashboard Admin (NÃO IMPLEMENTADO)**

- [ ] Visualização de agenda
- [ ] Listagem de agendamentos
- [ ] Filtros por data/origem/status
- [ ] Métricas de conversão

#### **7. WhatsApp Bot (NÃO IMPLEMENTADO - Documentado apenas)**

- [ ] Microserviço Python + FastAPI
- [ ] Integração com WhatsApp Business API
- [ ] Fluxos de conversação
- [ ] Automação de agendamento

#### **8. Melhorias de UX/UI**

- [ ] Feedback visual durante carregamento de dados
- [ ] Mensagens de erro mais amigáveis
- [ ] Confirmação antes de ações importantes
- [ ] Página de sucesso após agendamento
- [ ] Página de "Aguardando Pagamento"

#### **9. Testes**

- [ ] Testes unitários (Frontend)
- [ ] Testes de integração (Backend)
- [ ] Testes E2E (Cypress/Playwright)
- [ ] Testes de regressão

---

### **🟢 OPIONAL - Nice to Have**

#### **10. Features Avançadas**

- [ ] Sistema de notificações (email/SMS)
- [ ] Lembretes automáticos de consulta
- [ ] Histórico de consultas do paciente
- [ ] Exportação de dados (CSV/Excel)
- [ ] Analytics e relatórios
- [ ] Multi-idioma (i18n)

---

## 🎯 **PRÓXIMOS PASSOS RECOMENDADOS**

### **🎯 FASE 1: Finalizar Integração Frontend ↔ Backend (PRIORIDADE ALTA)**

**Objetivo**: Fazer o fluxo completo funcionar end-to-end

#### **Tarefa 1.1: Implementar Endpoint de Busca de Cliente Recorrente**

- [ ] Criar endpoint `GET /pms/leads/find?email={email}&whatsapp={whatsapp}`
- [ ] Retornar `{ exists: true, leadId: number, isConverted: boolean }`
- [ ] Implementar no `LeadsController.cs`
- [ ] Adicionar método no `LeadService.cs`
- **Estimativa**: 2-3 horas

#### **Tarefa 1.2: Implementar Endpoint de Salvar Anamnese**

- [ ] Criar endpoint `POST /pms/pre-consultation`
- [ ] Criar DTO `PreConsultationDto` no backend
- [ ] Criar entidade `PreConsultation` (se necessário)
- [ ] Salvar dados da anamnese no banco
- **Estimativa**: 3-4 horas

#### **Tarefa 1.3: Integrar Busca de Horários Disponíveis**

- [ ] Modificar `AppointmentStep.tsx` para buscar slots do backend
- [ ] Usar `appointmentService.getAvailableSlots()`
- [ ] Corrigir base URL da API (atualmente `/api/` mas deveria ser `/pms/`)
- [ ] Implementar carregamento de slots por data selecionada
- **Estimativa**: 2-3 horas

#### **Tarefa 1.4: Finalizar Fluxo de Agendamento**

- [ ] Criar appointment após completar anamnese
- [ ] Integrar `appointmentService.reserveTimeSlot()` em `App.tsx`
- [ ] Corrigir URLs da API (inconsistência entre `/api/` e `/pms/`)
- [ ] Implementar tratamento de erros
- **Estimativa**: 2-3 horas

#### **Tarefa 1.5: Implementar Verificação de Cliente Recorrente no Frontend**

- [ ] Remover TODOs em `AppointmentSteps.tsx`
- [ ] Implementar busca de cliente ao carregar componente
- [ ] Mostrar opção WhatsApp se for recorrente
- [ ] Ajustar fluxo conforme tipo de cliente
- **Estimativa**: 2-3 horas

**Total Fase 1**: ~11-16 horas

---

### **🎯 FASE 2: Sistema de Pagamento (PRIORIDADE ALTA)**

**Objetivo**: Permitir pagamento e confirmação automática

#### **Tarefa 2.1: Escolher Gateway de Pagamento**

- [ ] Avaliar opções (Pix/Mercado Pago/Stripe)
- [ ] Implementar SDK do gateway escolhido
- [ ] Configurar webhook de pagamento
- **Estimativa**: 4-6 horas

#### **Tarefa 2.2: Implementar Fluxo de Pagamento**

- [ ] Criar página de pagamento
- [ ] Integrar gateway no frontend
- [ ] Criar webhook endpoint no backend
- [ ] Implementar confirmação automática de agendamento
- **Estimativa**: 6-8 horas

#### **Tarefa 2.3: Timeout de Pagamento**

- [ ] Implementar timer de 15 minutos
- [ ] Cancelar agendamento se não pagar
- [ ] Liberar slot automaticamente
- **Estimativa**: 2-3 horas

**Total Fase 2**: ~12-17 horas

---

### **🎯 FASE 3: Funcionalidades de Cliente Recorrente (PRIORIDADE MÉDIA)**

#### **Tarefa 3.1: Reagendamento**

- [ ] Endpoint `PUT /pms/appointments/{id}/reschedule`
- [ ] Interface de reagendamento
- [ ] Validação de prazo (24h antes)
- **Estimativa**: 4-6 horas

#### **Tarefa 3.2: Endpoint de Reserva via WhatsApp**

- [ ] `POST /pms/appointments/reserve-whatsapp`
- [ ] Campo `origin: 'whatsapp'` no appointment
- **Estimativa**: 2-3 horas

**Total Fase 3**: ~6-9 horas

---

### **🎯 FASE 4: Melhorias de UX e Polimento (PRIORIDADE MÉDIA)**

#### **Tarefa 4.1: Feedback Visual**

- [ ] Loading states em todas as requisições
- [ ] Skeletons durante carregamento
- [ ] Toasts para sucesso/erro
- **Estimativa**: 4-6 horas

#### **Tarefa 4.2: Páginas de Status**

- [ ] Página "Aguardando Pagamento"
- [ ] Página "Agendamento Confirmado"
- [ ] Página "Erro no Pagamento"
- **Estimativa**: 3-4 horas

#### **Tarefa 4.3: Sala Virtual**

- [ ] Geração de link Google Meet
- [ ] Formato padronizado
- [ ] Envio de link após confirmação
- **Estimativa**: 2-3 horas

**Total Fase 4**: ~9-13 horas

---

### **🎯 FASE 5: Dashboard Admin (PRIORIDADE BAIXA)**

#### **Tarefa 5.1: Interface Básica**

- [ ] Criar rota `/admin`
- [ ] Visualização de agenda
- [ ] Listagem de agendamentos
- **Estimativa**: 8-12 horas

#### **Tarefa 5.2: Funcionalidades Avançadas**

- [ ] Filtros e busca
- [ ] Métricas e analytics
- [ ] Exportação de dados
- **Estimativa**: 6-10 horas

**Total Fase 5**: ~14-22 horas

---

### **🎯 FASE 6: WhatsApp Bot (PRIORIDADE BAIXA - Futuro)**

**Objetivo**: Automação completa via WhatsApp

- [ ] Configurar WhatsApp Business API
- [ ] Criar microserviço Python
- [ ] Implementar fluxos de conversação
- [ ] Integrar com backend .NET
- **Estimativa**: 40-60 horas

---

## 📋 **CHECKLIST DE CORREÇÕES NECESSÁRIAS**

### **🔴 Urgente - Bloqueadores**

- [ ] **Corrigir URLs da API** - Inconsistência entre `/api/` e `/pms/`

  - Frontend usa `/api/appointments/` mas backend está em `/pms/appointments/`
  - Arquivo: `frontend/src/services/api.ts` linhas 104, 111, 119, etc.

- [ ] **Implementar salvamento de anamnese**

  - Atualmente apenas `console.log` em `App.tsx`
  - Não persiste dados no backend

- [ ] **Integrar busca de horários disponíveis**

  - `AppointmentStep.tsx` não busca do backend
  - Horários hardcoded

- [ ] **Implementar verificação de cliente recorrente**
  - TODOs não resolvidos
  - Falta endpoint no backend

### **🟡 Importante - Funcionalidades Críticas**

- [ ] Finalizar fluxo de agendamento end-to-end
- [ ] Implementar sistema de pagamento
- [ ] Implementar geração de sala virtual
- [ ] Adicionar timeout de pagamento
- [ ] Criar páginas de feedback (sucesso/erro)

### **🟢 Melhorias - Polimento**

- [ ] Adicionar loading states
- [ ] Melhorar tratamento de erros
- [ ] Adicionar confirmações antes de ações importantes
- [ ] Implementar notificações
- [ ] Criar testes automatizados

---

## 🚀 **RECOMENDAÇÃO IMEDIATA**

### **Prioridade #1: Finalizar Fase 1 (Integração Frontend ↔ Backend)**

**Por quê?**

- É o fundamento do sistema
- Sem isso, nada funciona end-to-end
- Bloqueia outras funcionalidades

**Ações Imediatas:**

1. Corrigir URLs da API (30 min)
2. Implementar endpoint de busca de cliente (2-3h)
3. Implementar salvamento de anamnese (3-4h)
4. Integrar busca de horários (2-3h)
5. Finalizar fluxo de agendamento (2-3h)

**Tempo Total**: 10-14 horas de desenvolvimento

---

## 📊 **MÉTRICAS DE SUCESSO**

### **MVP (Minimum Viable Product)**

- [ ] Fluxo completo end-to-end funcionando
- [ ] Cliente pode calcular IMC
- [ ] Cliente pode agendar consulta
- [ ] Agendamento salvo no backend
- [ ] Pagamento funcional
- [ ] Confirmação automática

### **V1.0 (Versão Completa)**

- [ ] Todas funcionalidades MVP ✅
- [ ] Reagendamento funcional
- [ ] Cliente recorrente identificado
- [ ] Dashboard admin básico
- [ ] Notificações funcionando

### **V2.0 (Com WhatsApp Bot)**

- [ ] Todas funcionalidades V1.0 ✅
- [ ] WhatsApp bot funcional
- [ ] Agendamento via WhatsApp
- [ ] Notificações via WhatsApp

---

## 🔗 **REFERÊNCIAS**

- **Documentação Backend**: `backend/README.md`
- **Regras de Negócio**: `backend/REGRAS_NEGOCIO.md`
- **Agendamento Unificado**: `backend/AGENDAMENTO_UNIFICADO.md`
- **WhatsApp Integration**: `backend/WHATSAPP_INTEGRATION.md`

---

**Última Atualização**: Janeiro 2025  
**Próxima Revisão**: Após conclusão da Fase 1
