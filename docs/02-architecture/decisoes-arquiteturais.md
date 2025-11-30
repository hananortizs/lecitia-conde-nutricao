# 🏗️ Decisões Arquiteturais (ADRs)

Este documento registra as decisões arquiteturais importantes tomadas durante o desenvolvimento do projeto.

## ADR-001: Base Path `/lcn`

**Status**: ✅ Aceito  
**Data**: Janeiro 2025  
**Contexto**: Necessidade de padronizar rotas da API

### Decisão

Usar prefixo global `/lcn` para todas as rotas da API, aplicado automaticamente via convenção.

### Justificativa

- Facilita versionamento futuro (`/lcn-v2/`)
- Evita conflitos com outras APIs no mesmo servidor
- Padronização clara e consistente
- Facilita identificação da API em logs

### Implementação

- Configurado em `Program.cs` via `UseGeneralRoutePrefix("lcn")`
- Convenção aplicada automaticamente a todos os controllers
- Frontend configurado para usar `/lcn/` como base path

### Consequências

- ✅ URLs mais claras e identificáveis
- ✅ Facilita deploy em ambientes diferentes
- ⚠️ Requer atualização do frontend se mudar

---

## ADR-002: Kebab-Case Automático em Rotas

**Status**: ✅ Aceito  
**Data**: Janeiro 2025  
**Contexto**: Melhorar SEO e legibilidade de URLs

### Decisão

Converter automaticamente nomes de controllers para kebab-case nas rotas.

### Justificativa

- URLs mais legíveis (`/lcn/leads/capture-lead` vs `/lcn/Leads/CaptureLead`)
- Melhor SEO
- Convenção consistente em toda a API
- Alinhado com boas práticas REST

### Implementação

- `KebabCaseControllerModelConvention` aplicada globalmente
- Controllers usam `[Route("[controller]")]` para aproveitar convenção
- Actions também em kebab-case

### Consequências

- ✅ URLs mais amigáveis
- ✅ Melhor SEO
- ✅ Consistência visual

---

## ADR-003: Clean Architecture

**Status**: ✅ Aceito  
**Data**: Janeiro 2025  
**Contexto**: Necessidade de código testável e manutenível

### Decisão

Aplicar Clean Architecture com 4 camadas: Core, Application, Infrastructure, API.

### Justificativa

- Separação clara de responsabilidades
- Testabilidade (lógica de negócio isolada)
- Manutenibilidade
- Independência de frameworks
- Facilita evolução do sistema

### Estrutura

```
LeticiaConde.Core/          # Entidades, Interfaces
LeticiaConde.Application/   # Services, DTOs, Casos de Uso
LeticiaConde.Infrastructure/ # Data Access, APIs Externas
LeticiaConde.Api/           # Controllers, Middleware
```

### Consequências

- ✅ Código mais organizado
- ✅ Fácil de testar
- ✅ Fácil de manter
- ⚠️ Mais camadas = mais complexidade inicial

---

## ADR-004: PostgreSQL como Banco de Dados

**Status**: ✅ Aceito  
**Data**: Janeiro 2025  
**Contexto**: Escolha de SGBD para o projeto

### Decisão

Usar PostgreSQL como banco de dados relacional.

### Justificativa

- Robusto e confiável
- Suporte completo a relacionamentos complexos
- Open source
- Boa performance
- Suporte a JSON quando necessário
- Amplamente usado e suportado

### Implementação

- Entity Framework Core com Npgsql
- Migrations para versionamento de schema
- Timezone UTC no banco, conversão para exibição

### Consequências

- ✅ Banco robusto e confiável
- ✅ Suporte a relacionamentos complexos
- ⚠️ Requer instalação e configuração

---

## ADR-005: React + TypeScript no Frontend

**Status**: ✅ Aceito  
**Data**: Janeiro 2025  
**Contexto**: Escolha de stack frontend

### Decisão

Usar React 19 com TypeScript para o frontend.

### Justificativa

- Type safety com TypeScript
- Componentização com React
- Grande ecossistema
- Boa performance
- Fácil manutenção
- Alinhado com mercado

### Implementação

- React 19 com TypeScript
- Vite como build tool
- Styled Components para estilização
- React Hook Form para formulários

### Consequências

- ✅ Type safety
- ✅ Componentização
- ✅ Boa DX (Developer Experience)
- ⚠️ Curva de aprendizado para iniciantes

---

## ADR-006: Sistema Unificado de Agendamento

**Status**: ✅ Aceito  
**Data**: Janeiro 2025  
**Contexto**: Necessidade de evitar conflitos entre Site e WhatsApp

### Decisão

Usar mesma API e banco de dados para agendamentos via Site e WhatsApp.

### Justificativa

- Evita conflitos de horário
- Fonte única de verdade
- Facilita manutenção
- Permite reagendamento unificado
- Métricas consolidadas

### Implementação

- Campo `Origin` em `Appointment` (`site` ou `whatsapp`)
- Endpoints compartilhados
- Verificação de disponibilidade unificada

### Consequências

- ✅ Sem conflitos de horário
- ✅ Sistema mais simples
- ✅ Fácil de manter
- ✅ Métricas consolidadas

---

## ADR-007: Styled Components (CSS-in-JS)

**Status**: ✅ Aceito  
**Data**: Janeiro 2025  
**Contexto**: Escolha de solução de estilização

### Decisão

Usar Styled Components para estilização do frontend.

### Justificativa

- CSS-in-JS com escopo automático
- Integração com props do React
- Temas dinâmicos (claro/escuro)
- TypeScript support
- Componentização de estilos

### Implementação

- Styled Components configurado
- Sistema de temas implementado
- Transient props para evitar warnings

### Consequências

- ✅ Estilos componentizados
- ✅ Temas dinâmicos
- ✅ Type safety
- ⚠️ Bundle size maior que CSS tradicional

---

## 📝 Template para Novas ADRs

```markdown
## ADR-XXX: [Título da Decisão]

**Status**: [Proposto/Aceito/Rejeitado/Depreciado]  
**Data**: [Data]  
**Contexto**: [Contexto da decisão]

### Decisão

[Descrição da decisão]

### Justificativa

[Por que esta decisão foi tomada]

### Implementação

[Como foi implementado]

### Consequências

[Impactos positivos e negativos]
```

---

**Última Atualização**: Janeiro 2025  
**Mantido por**: Solution Architect

