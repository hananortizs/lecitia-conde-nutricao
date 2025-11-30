# 🤝 Guia de Contribuição

Este guia descreve como contribuir para o projeto Letícia Conde Nutrição.

## 📋 Pré-requisitos

- Conhecimento básico de C# e ASP.NET Core (backend)
- Conhecimento básico de React e TypeScript (frontend)
- Git instalado
- Ambiente de desenvolvimento configurado (ver [Setup do Ambiente](./setup-ambiente.md))

## 🔀 Fluxo de Trabalho

### 1. Fork e Clone

```bash
# Fork o repositório no GitHub
# Clone seu fork
git clone https://github.com/seu-usuario/leticia-conde-nutricao.git
cd leticia-conde-nutricao
```

### 2. Criar Branch

```bash
# Criar branch para sua feature
git checkout -b feature/nome-da-feature

# Ou para correção de bug
git checkout -b fix/nome-do-bug
```

### 3. Desenvolver

- Siga os [Padrões de Código](./padroes-codigo.md)
- Escreva código limpo e legível
- Adicione comentários quando necessário
- Teste suas mudanças

### 4. Commit

```bash
# Adicionar mudanças
git add .

# Commit com mensagem descritiva
git commit -m "feat: adiciona funcionalidade X"
```

**Convenção de Commits**:
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação
- `refactor:` - Refatoração
- `test:` - Testes
- `chore:` - Tarefas de manutenção

### 5. Push e Pull Request

```bash
# Push para seu fork
git push origin feature/nome-da-feature
```

Depois, abra um Pull Request no repositório principal.

## 📝 Padrões de Código

Consulte [Padrões de Código](./padroes-codigo.md) para detalhes completos.

### Backend (C#)

- **Naming**: PascalCase para classes, métodos, propriedades
- **Indentação**: 4 espaços
- **Async/Await**: Sempre para operações I/O
- **Validação**: Data Annotations nos DTOs
- **Error Handling**: Middleware centralizado

### Frontend (TypeScript/React)

- **Naming**: PascalCase para componentes, camelCase para funções
- **Indentação**: 2 espaços
- **TypeScript**: Sempre tipado
- **Styled Components**: Transient props com prefixo `$`
- **Hooks**: Custom hooks para lógica reutilizável

## ✅ Checklist Antes de Enviar PR

- [ ] Código segue padrões do projeto
- [ ] Sem `console.log` em produção
- [ ] Documentação atualizada (se necessário)
- [ ] Testes passando (quando aplicável)
- [ ] Sem erros de lint
- [ ] Commits com mensagens descritivas
- [ ] Branch atualizada com `main`

## 🧪 Testes

### Backend

```bash
# Executar testes (quando implementados)
dotnet test
```

### Frontend

```bash
# Executar testes (quando implementados)
npm test
```

## 📚 Documentação

- Atualize documentação quando necessário
- Documente decisões arquiteturais importantes
- Adicione comentários em código complexo

## 🐛 Reportar Bugs

Ao reportar bugs, inclua:

- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots (se aplicável)
- Ambiente (OS, versões, etc.)

## 💡 Sugerir Features

Ao sugerir features:

- Descreva o problema que resolve
- Explique o valor de negócio
- Proponha solução (se tiver)
- Considere impacto e complexidade

## 📞 Contato

Para dúvidas ou discussões:

- Abra uma issue no GitHub
- Consulte a [Documentação](./../README.md)
- Entre em contato com a equipe

---

**Última Atualização**: Janeiro 2025

