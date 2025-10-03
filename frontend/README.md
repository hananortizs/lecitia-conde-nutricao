# Frontend - Letícia Conde Nutrição

## 🎯 **Arquitetura de BMI Calculator**

### **Estratégia Híbrida: Frontend + Backend**

#### **Frontend (JavaScript)**

- ✅ **Cálculo instantâneo** para melhor UX
- ✅ **Validação em tempo real**
- ✅ **Feedback imediato** ao usuário
- ✅ **Funciona offline**

#### **Backend (C#)**

- ✅ **Validação de consistência** dos dados
- ✅ **Regras de negócio centralizadas**
- ✅ **Auditoria e logs**
- ✅ **Segurança contra manipulação**

## 📁 **Estrutura de Arquivos**

```
frontend/
├── src/
│   ├── utils/
│   │   └── bmiCalculator.js      # Utilitário de cálculo BMI
│   ├── hooks/
│   │   └── useBmiCalculator.js   # Hook React para BMI
│   └── components/
│       └── BmiCalculator.jsx     # Componente de interface
```

## 🔧 **Como Usar**

### **1. Utilitário BMI**

```javascript
import { calculateBmiResult, validateBmiInputs } from "./utils/bmiCalculator";

// Calcular BMI
const result = calculateBmiResult(70, 1.75);
// { bmi: 22.86, classification: 'Normal weight', description: '...' }

// Validar entradas
const validation = validateBmiInputs(70, 1.75);
// { isValid: true, errors: [] }
```

### **2. Hook React**

```javascript
import { useBmiCalculator } from "./hooks/useBmiCalculator";

function BmiForm() {
  const {
    weight,
    height,
    bmiResult,
    errors,
    isCalculated,
    calculateBmi,
    updateWeight,
    updateHeight,
    reset,
  } = useBmiCalculator();

  return (
    <div>
      <input
        value={weight}
        onChange={(e) => updateWeight(e.target.value)}
        placeholder="Peso (kg)"
      />
      <input
        value={height}
        onChange={(e) => updateHeight(e.target.value)}
        placeholder="Altura (m)"
      />
      <button onClick={calculateBmi}>Calcular BMI</button>

      {isCalculated && bmiResult && (
        <div>
          <p>BMI: {bmiResult.bmi}</p>
          <p>Classificação: {bmiResult.classification}</p>
          <p>{bmiResult.description}</p>
        </div>
      )}
    </div>
  );
}
```

## 🚀 **Vantagens da Abordagem**

1. **Performance**: Cálculo instantâneo no frontend
2. **UX**: Feedback imediato sem latência de rede
3. **Segurança**: Validação no backend previne manipulação
4. **Consistência**: Mesma lógica em todos os clientes
5. **Flexibilidade**: Fácil manutenção e atualizações

## 🔄 **Fluxo de Dados**

1. **Frontend**: Usuário insere peso/altura
2. **Frontend**: Calcula BMI instantaneamente
3. **Frontend**: Exibe resultado imediatamente
4. **Frontend**: Envia dados para backend
5. **Backend**: Valida consistência do cálculo
6. **Backend**: Armazena lead no banco de dados
