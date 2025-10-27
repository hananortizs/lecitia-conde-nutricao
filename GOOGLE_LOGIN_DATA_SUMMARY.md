# 📊 Resumo: Dados do Google Login

## ✅ **Dados Disponíveis e Utilizáveis**

### **Informações que Podemos Capturar e Usar:**

| Campo               | Google Fornece? | Uso no Formulário              | Status           |
| ------------------- | --------------- | ------------------------------ | ---------------- |
| **Nome Completo**   | ✅ Sim          | Preenche automaticamente       | ✅ Disponível    |
| **Email**           | ✅ Sim          | Preenche automaticamente       | ✅ Disponível    |
| **Foto**            | ✅ Sim          | Exibir no perfil               | ✅ Disponível    |
| **Primeiro Nome**   | ✅ Sim          | Personalização                 | ✅ Disponível    |
| **Sobrenome**       | ✅ Sim          | Separar nome                   | ✅ Disponível    |
| **Google ID**       | ✅ Sim          | Identificação única            | ✅ Disponível    |
| **WhatsApp**        | ❌ Não          | Requer preenchimento manual    | ⚠️ Sempre manual |
| **Data Nascimento** | ❌ Não          | Requer preenchimento manual    | ⚠️ Sempre manual |
| **Gênero**          | ❌ Não          | Requer preenchimento manual    | ⚠️ Sempre manual |
| **Objetivos**       | ❌ Não          | Informação específica de saúde | ⚠️ Sempre manual |
| **Experiência**     | ❌ Não          | Histórico pessoal              | ⚠️ Sempre manual |

---

## 🎯 **O Que Preencher Automaticamente**

### **Campos do Formulário:**

```typescript
// Se cliente fez login Google:
✅ name        → user.name (Google)
✅ email       → user.email (Google)
✅ picture     → user.picture (Google) - para avatar
✅ firstName   → user.given_name (Google)
✅ lastName    → user.family_name (Google)

// Campos que SEMPRE requerem preenchimento manual:
❌ whatsApp    → Cliente deve preencher
❌ birthDate   → Cliente deve preencher
❌ gender      → Cliente deve preencher
❌ mainGoals   → Cliente deve preencher
❌ motivation  → Cliente deve preencher
```

---

## 💡 **UX Recomendada**

### **Formulário Inteligente com Google Login:**

```
┌─────────────────────────────────────────┐
│  Formulário de Pré-Consulta             │
├─────────────────────────────────────────┤
│                                         │
│  Nome:     [João Silva ✅] (Google)     │  ← Preenchido auto
│  Email:    [joao@gmail.com ✅] (Google) │  ← Preenchido auto
│                                         │
│  WhatsApp: [_____________] ⚠️            │  ← PEDIDO AO USUÁRIO
│                                           │
│  Data nascimento: [__/__/____] ⚠️        │  ← PEDIDO AO USUÁRIO
│  Gênero:         [_________] ⚠️          │  ← PEDIDO AO USUÁRIO
│                                         │
└─────────────────────────────────────────┘
```

---

## 🚀 **Implementação Sugerida**

### **1. Expandir Interface User**

```typescript
interface User {
  name: string;
  email: string;
  picture?: string;
  googleId?: string;

  // Adicionar:
  firstName?: string;
  lastName?: string;
  whatsapp?: string; // Salvar após preencher manualmente
}
```

### **2. Preencher Automaticamente**

```typescript
// No formulário de pré-consulta
useEffect(() => {
  if (user) {
    setFormData((prev) => ({
      ...prev,
      name: user.name,
      email: user.email,
      // whatsapp não preenche (não disponível no Google)
    }));
  }
}, [user]);
```

### **3. Persistir WhatsApp**

```typescript
// Depois de preencher WhatsApp manualmente
const handleWhatsAppChange = (value: string) => {
  setFormData((prev) => ({ ...prev, whatsapp: value }));

  // Salvar no localStorage
  if (user) {
    const updatedUser = { ...user, whatsapp: value };
    login(updatedUser); // Atualiza AuthContext
  }
};
```

---

## 📊 **Limitações Reais**

### **⚠️ O Google NÃO Fornece:**

1. **Telefone** - Não há API pública para isso
2. **Data de Nascimento** - Apenas via Google People API (muito complexo)
3. **Gênero** - Apenas via Google People API
4. **Endereço** - Apenas via Google People API

### **✅ Solução:**

- Usar dados do Google para campos que ele fornece
- Pedir ao usuário preencher campos que Google não fornece
- Salvar no localStorage para próximas vezes

---

## ✅ **Conclusão**

### **Dados do Google Úteis:**

- ✅ Nome (preencher automaticamente)
- ✅ Email (preencher automaticamente)
- ✅ Foto (mostrar avatar)

### **Dados SEMPRE Manuais:**

- ⚠️ WhatsApp (Google não fornece)
- ⚠️ Data nascimento (Google não fornece)
- ⚠️ Gênero (Google não fornece)
- ⚠️ Objetivos (informação específica de saúde)

**Recomendação**: Preencher o que for possível automaticamente e pedir ao usuário preencher o resto.
