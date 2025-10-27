# 📊 Dados do Google Login - Letícia Conde Nutricionista

## 🔍 **Dados Capturados do Google**

### **✅ Dados Disponíveis (JWT Token Decodificado)**

Quando o usuário faz login com Google, recebemos um **JWT Token** que, ao ser decodificado, contém:

#### **1. Informações Básicas (Sempre Disponíveis)**

```json
{
  "name": "João Silva", // ✅ Nome completo
  "email": "joao@gmail.com", // ✅ Email
  "picture": "https://...", // ✅ Foto de perfil
  "sub": "123456789", // ✅ Google ID único
  "given_name": "João", // ✅ Primeiro nome
  "family_name": "Silva" // ✅ Sobrenome
}
```

#### **2. Informações Opcionais (Dependem das Permissões)**

```json
{
  "locale": "pt-BR", // ⚠️ Idioma/região
  "email_verified": true, // ⚠️ Email verificado
  "hd": "empresa.com" // ⚠️ Domínio Google Workspace
}
```

---

## 📝 **Dados que Podemos Preencher Automaticamente**

### **✅ Campos do Formulário de Primeira Consulta**

#### **1. Informações Pessoais Básicas (BasicInfoStep)**

```typescript
interface BasicInfoData {
  name: string; // ✅ name (Google)
  email: string; // ✅ email (Google)
  phone?: string; // ❌ NÃO disponível no Google
  birthDate?: string; // ❌ NÃO disponível no Google
  gender?: string; // ❌ NÃO disponível no Google
}
```

**Status**: 2 de 5 campos podem ser preenchidos automaticamente

#### **2. Informações Adicionais Disponíveis**

```typescript
interface AdditionalGoogleData {
  firstName: string; // ✅ given_name (Google)
  lastName: string; // ✅ family_name (Google)
  pictureUrl: string; // ✅ picture (Google)
  googleId: string; // ✅ sub (Google)
  locale: string; // ⚠️ locale (Google) - opcional
}
```

---

## 🎯 **O Que Preencher Automaticamente**

### **📋 Formulário de Pré-Consulta**

#### **Campos Auto-preenchidos:**

```typescript
✅ Nome completo     → user.name
✅ Email            → user.email
✅ Foto de perfil   → user.picture (para exibir no dashboard)
✅ Primeiro nome    → user.given_name (para personalização)
✅ Sobrenome        → user.family_name (para personalização)
✅ Google ID        → user.sub (para identificar usuário)
```

#### **Campos SEMPRE preenchidos manualmente:**

```typescript
❌ WhatsApp         → Obrigatório (número de contato)
❌ Data nascimento  → Necessário para cálculo nutricional
❌ Gênero           → Necessário para avaliação nutricional
❌ Objetivos        → Informação específica de saúde
❌ Experiência      → Histórico pessoal
❌ Preferências     → Alimentação e restrições
```

---

## 💻 **Implementação Atual vs. Recomendada**

### **🔄 Estado Atual**

```typescript
// AuthContext.tsx
interface User {
  name: string;
  email: string;
  picture?: string;
  googleId?: string;
}
```

**Preenche**: Nome e Email  
**Não Preenche**: WhatsApp, Data nascimento, Gênero

---

### **✨ Recomendação: Expandir Interface**

```typescript
// AuthContext.tsx - PROPOSTA
interface User {
  // Dados básicos
  name: string;
  email: string;
  picture?: string;
  googleId?: string;

  // Dados adicionais do Google
  firstName?: string; // dado_name
  lastName?: string; // family_name
  locale?: string; // Idioma/região
  emailVerified?: boolean; // Email verificado

  // Dados adicionais do usuário (preenchidos manualmente)
  whatsapp?: string;
  birthDate?: string;
  gender?: string;
}
```

---

## 🎨 **UX - Como Funciona Hoje**

### **Fluxo Atual:**

```
1. Cliente acessa calculadora IMC
2. Preenche: Nome, Email, WhatsApp
3. (Opcional) Login Google
4. Se fizer login Google:
   - Nome e Email preenchidos ✅
   - WhatsApp ainda precisa preencher ⚠️
```

### **Problema Identificado:**

- Mesmo com Google Login, cliente ainda precisa preencher WhatsApp
- Não há integração entre Google Login e formulário de pré-consulta

---

## 🚀 **Proposta de Melhoria**

### **Opção 1: Integração Completa** ⭐ RECOMENDADO

```typescript
// Quando usuário faz login Google
const handleGoogleSuccess = (userData) => {
  // Preencher automaticamente todos os campos disponíveis
  setFormData({
    name: userData.name,
    email: userData.email,
    // WhatsApp e outros campos permanecem vazios para preencher
  });

  // Fazer login
  login(userData);
};
```

### **Opção 2: Fallback Inteligente**

```typescript
// Se cliente fez login Google, sugerir WhatsApp
if (isAuthenticated) {
  // Mostrar campo WhatsApp com placeholder:
  <input
    placeholder="Seu WhatsApp (obrigatório)"
    helper="Usaremos para confirmar sua consulta"
  />;
}
```

---

## 📊 **Limitações do Google Login**

### **⚠️ Dados NÃO Disponíveis:**

1. **Telefone/WhatsApp** - Google não fornece
2. **Data de Nascimento** - Disponível apenas via Google People API (complexo)
3. **Gênero** - Disponível apenas via Google People API
4. **Endereço** - Disponível apenas via Google People API

### **✅ Dados DISPONÍVEIS:**

1. **Nome completo** - ✅ Sempre
2. **Email** - ✅ Sempre
3. **Foto** - ✅ Sempre
4. **Google ID** - ✅ Sempre

---

## 🎯 **Recomendação Final**

### **Preencher Automaticamente:**

- ✅ Nome completo
- ✅ Email
- ✅ Foto (para exibição)
- ✅ Google ID (para identificação)

### **NÃO Preencher (Sempre manual):**

- ❌ WhatsApp (obrigatório, não disponível no Google)
- ❌ Data nascimento (necessário para avaliação nutricional)
- ❌ Gênero (necessário para avaliação nutricional)
- ❌ Objetivos (específico de saúde)
- ❌ Experiência prévia (histórico pessoal)

---

## 💡 **Próximos Passos**

### **Melhoria 1: Expandir AuthContext** ⏭️

- Adicionar firstName, lastName
- Adicionar locale, emailVerified
- Melhorar estrutura de dados

### **Melhoria 2: Integrar com Formulário** ⏭️

- Detectar se cliente está logado
- Preencher nome e email automaticamente
- Manter WhatsApp para preenchimento manual

### **Melhoria 3: Persistência Inteligente** ⏭️

- Salvar dados complementares (WhatsApp) no localStorage
- Associar WhatsApp ao Google ID
- Consulta futura: WhatsApp já salvo

---

## 📱 **Exemplo de UX Melhorada**

### **Cenário: Cliente Novo com Google Login**

```
1. Cliente clica "Agendar via Site"
2. Sistema detecta: Cliente logado com Google
3. Campos aparecem preenchidos:
   ✅ Nome: "João Silva" (do Google)
   ✅ Email: "joao@gmail.com" (do Google)
   ⚪ WhatsApp: [vazio] (requer preenchimento)
   ⚪ Data nascimento: [vazio]
   ⚪ Gênero: [vazio]
4. Cliente preenche apenas WhatsApp, nascimento e gênero
5. Próximos passos seguem normalmente
```

### **Cenário: Cliente Recorrente**

```
1. Cliente já cadastrado
2. Sistema detecta: Google ID já existe
3. Busca dados complementares do localStorage
4. Mostra:
   ✅ Nome: "João Silva"
   ✅ Email: "joao@gmail.com"
   ✅ WhatsApp: "+55 11 99999-9999" (salvo anteriormente)
5. Cliente apenas confirma e segue para objetivos
```

---

## ✅ **Checklist de Implementação**

- [x] Documentar dados disponíveis
- [ ] Expandir interface User
- [ ] Integrar preenchimento automático no formulário
- [ ] Implementar persistência de WhatsApp
- [ ] Criar lógica de reconhecimento de cliente recorrente
- [ ] Adicionar validação inteligente

---

**Autor**: Desenvolvido para Letícia Conde Nutricionista  
**Data**: Janeiro 2025  
**Versão**: 1.0
