# 📚 Documentação do Projeto - Letícia Conde Nutrição

Bem-vindo à documentação completa do projeto **Letícia Conde Nutrição**. Este diretório contém toda a documentação organizada por categoria para facilitar a navegação e manutenção.

## 📋 Índice

### [01 - Project](./01-project/)
Documentação geral do projeto, visão geral e informações iniciais.

- [README Principal](./01-project/README.md) - Visão geral do projeto
- [Estrutura do Projeto](./01-project/estrutura-projeto.md) - Organização de pastas e arquivos

### [02 - Architecture](./02-architecture/)
Documentação técnica sobre arquitetura, padrões e decisões de design.

- [Arquitetura Técnica Backend](./02-architecture/arquitetura-tecnica-backend.md) - Clean Architecture, camadas, padrões
- [Arquitetura de Agendamento Unificado](./02-architecture/agendamento-unificado.md) - Sistema unificado Site + WhatsApp
- [Decisões Arquiteturais](./02-architecture/decisoes-arquiteturais.md) - ADRs (Architecture Decision Records)

### [03 - Business Rules](./03-business-rules/)
Regras de negócio, validações e comportamentos do sistema.

- [Regras de Negócio](./03-business-rules/regras-negocio.md) - Horários, Sabbat, agendamento, leads
- [Validações e Restrições](./03-business-rules/validacoes-restricoes.md) - Validações de entrada e regras

### [04 - Backend](./04-backend/)
Documentação específica do backend (ASP.NET Core).

- [README Backend](./04-backend/README.md) - Guia de instalação e execução
- [API Endpoints](./04-backend/api-endpoints.md) - Documentação completa dos endpoints
- [Estrutura do Projeto](./04-backend/estrutura-projeto.md) - Organização das camadas

### [05 - Frontend](./05-frontend/)
Documentação específica do frontend (React + TypeScript).

- [README Frontend](./05-frontend/README.md) - Guia de instalação e execução
- [Componentes](./05-frontend/componentes.md) - Documentação dos componentes
- [Estrutura do Projeto](./05-frontend/estrutura-projeto.md) - Organização de pastas

### [06 - Integration](./06-integration/)
Documentação sobre integrações e comunicação entre sistemas.

- [Integração Frontend ↔ Backend](./06-integration/integracao-frontend-backend.md) - Configuração e troubleshooting
- [WhatsApp Integration](./06-integration/whatsapp-integration.md) - Integração com WhatsApp (futuro)
- [APIs Externas](./06-integration/apis-externas.md) - APIs de terceiros (pôr do sol, pagamento)

### [07 - Development](./07-development/)
Guias e padrões para desenvolvimento.

- [Guia de Contribuição](./07-development/guia-contribuicao.md) - Como contribuir
- [Padrões de Código](./07-development/padroes-codigo.md) - Naming conventions, estrutura
- [Setup do Ambiente](./07-development/setup-ambiente.md) - Configuração inicial

### [08 - Project Management](./08-project-management/)
Documentação de gestão, análises e planejamento.

- [Análise do Projeto - Próximos Passos](./08-project-management/analise-proximos-passos.md) - Estado atual e roadmap
- [Backlog e User Stories](./08-project-management/backlog-user-stories.md) - Backlog priorizado (gerenciado por Lelê - PO)

### [09 - Quality Analysis](./09-quality-analysis/)
Análises de qualidade do código, estrutura e padrões.

- [Resumo Executivo](./09-quality-analysis/resumo-executivo.md) - Resumo da análise de qualidade
- [Relatório Completo](./09-quality-analysis/relatorio-qualidade-codigo.md) - Análise detalhada de qualidade, legibilidade e performance

## 🚀 Início Rápido

### Para Desenvolvedores

1. Leia o [README Principal](./01-project/README.md)
2. Configure o ambiente: [Setup do Ambiente](./07-development/setup-ambiente.md)
3. Consulte [Padrões de Código](./07-development/padroes-codigo.md)
4. Veja [Arquitetura Técnica](./02-architecture/arquitetura-tecnica-backend.md)

### Para Product Owners

1. Leia [Regras de Negócio](./03-business-rules/regras-negocio.md)
2. Consulte [Análise do Projeto](./08-project-management/analise-proximos-passos.md)
3. Veja [Backlog e User Stories](./08-project-management/backlog-user-stories.md)

### Para Arquitetos

1. Leia [Arquitetura Técnica](./02-architecture/arquitetura-tecnica-backend.md)
2. Consulte [Decisões Arquiteturais](./02-architecture/decisoes-arquiteturais.md)
3. Veja [Agendamento Unificado](./02-architecture/agendamento-unificado.md)

## 📝 Convenções

- **Nomes de arquivos**: kebab-case (ex: `arquitetura-tecnica-backend.md`)
- **Estrutura**: Organizada por categoria numérica (01-08)
- **Atualização**: Documentação deve ser atualizada junto com o código
- **Referências**: Use links relativos para navegação entre documentos

## 🔄 Manutenção

Esta documentação é mantida pela equipe de desenvolvimento. Ao fazer mudanças significativas:

1. Atualize a documentação correspondente
2. Verifique se os links ainda funcionam
3. Atualize o índice se necessário
4. Documente decisões arquiteturais importantes

---

**Última Atualização**: Janeiro 2025  
**Versão**: 1.0  
**Mantido por**: Equipe de Desenvolvimento

