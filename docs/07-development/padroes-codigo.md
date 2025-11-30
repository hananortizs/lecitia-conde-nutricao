# 📝 Padrões de Código

Este documento define os padrões de código para o projeto Letícia Conde Nutrição.

## 🎯 Princípios Gerais

- **Legibilidade**: Código deve ser fácil de ler e entender
- **Consistência**: Seguir padrões estabelecidos
- **Manutenibilidade**: Código deve ser fácil de manter
- **Type Safety**: Usar tipos sempre que possível

## 🔷 Backend (C# / ASP.NET Core)

### Naming Conventions

#### Classes e Interfaces
```csharp
// PascalCase
public class LeadService { }
public interface ILeadService { }
```

#### Métodos
```csharp
// PascalCase, async sempre termina com Async
public async Task<LeadDto> GetLeadByIdAsync(int id) { }
```

#### Propriedades
```csharp
// PascalCase
public string Name { get; set; }
public DateTime CreatedAt { get; set; }
```

#### Variáveis e Parâmetros
```csharp
// camelCase
var leadId = 1;
public async Task ProcessLead(int leadId) { }
```

#### Constantes
```csharp
// UPPER_SNAKE_CASE
private const int MAX_WEIGHT = 500;
private const string DEFAULT_TIMEZONE = "America/Sao_Paulo";
```

### Estrutura de Arquivos

```
LeticiaConde.Api/
├── Controllers/
│   └── LeadsController.cs
├── Middleware/
│   └── GlobalExceptionHandler.cs
└── Program.cs

LeticiaConde.Application/
├── Services/
│   └── LeadService.cs
├── DTOs/
│   └── LeadDto.cs
└── Interfaces/
    └── ILeadService.cs
```

### Rotas da API

```csharp
// Sempre usar [Route("[controller]")] para aproveitar kebab-case automático
[ApiController]
[Route("[controller]")]
public class LeadsController : ControllerBase
{
    [HttpPost("capture-lead")]  // Kebab-case
    public async Task<ActionResult> CaptureLead(...) { }
}
```

### Async/Await

```csharp
// Sempre usar async/await para operações I/O
public async Task<LeadDto> GetLeadByIdAsync(int id)
{
    var lead = await _context.Leads.FindAsync(id);
    return _mapper.Map<LeadDto>(lead);
}
```

### Validação

```csharp
// Usar Data Annotations nos DTOs
public class LeadDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    
    [Required]
    [StringLength(11)]
    public string WhatsApp { get; set; }
}
```

### Error Handling

```csharp
// Usar exceções específicas
throw new NotFoundException("Lead não encontrado");
throw new ValidationException("Email inválido");
throw new ConflictException("Horário já ocupado");
```

## ⚛️ Frontend (TypeScript / React)

### Naming Conventions

#### Componentes
```typescript
// PascalCase
export const BmiCalculator: React.FC = () => { };
export const AppointmentSteps: React.FC = () => { };
```

#### Funções e Variáveis
```typescript
// camelCase
const calculateBmi = (weight: number, height: number) => { };
const userName = "João";
const isLoading = true;
```

#### Constantes
```typescript
// UPPER_SNAKE_CASE
const API_BASE_URL = "http://localhost:5014";
const MAX_WEIGHT = 500;
```

#### Styled Components
```typescript
// PascalCase
const StyledButton = styled.button`
  // styles
`;

// Transient props com prefixo $
interface ButtonProps {
  $variant: 'primary' | 'secondary';
  $loading?: boolean;
}
```

### Estrutura de Arquivos

```
src/
├── components/
│   ├── BmiCalculator.tsx
│   └── AppointmentSteps.tsx
├── pages/
│   └── Home.tsx
├── services/
│   └── api.ts
├── types/
│   └── index.ts
└── utils/
    └── validators.ts
```

### TypeScript

```typescript
// Sempre tipar
interface Lead {
  id: number;
  name: string;
  email: string;
}

const lead: Lead = {
  id: 1,
  name: "João",
  email: "joao@email.com"
};

// Funções tipadas
const calculateBmi = (weight: number, height: number): number => {
  return weight / (height * height);
};
```

### React Hooks

```typescript
// Custom hooks para lógica reutilizável
const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  // ...
  return { user, login, logout };
};
```

### Styled Components

```typescript
// Transient props para evitar warnings
const Button = styled.button<{ $variant: string }>`
  background-color: ${props => 
    props.$variant === 'primary' ? '#4CAF50' : '#2196F3'};
`;
```

## 🗄️ Banco de Dados

### Naming Conventions

#### Tabelas
```sql
-- PascalCase
CREATE TABLE Leads (...);
CREATE TABLE Appointments (...);
```

#### Colunas
```sql
-- PascalCase
Id INT PRIMARY KEY,
Name VARCHAR(255),
Email VARCHAR(255),
CreatedAt TIMESTAMP
```

#### Foreign Keys
```sql
-- EntityNameId
LeadId INT REFERENCES Leads(Id),
AppointmentId INT REFERENCES Appointments(Id)
```

## 📋 Convenções Gerais

### Comentários

```csharp
// Backend: XML comments para métodos públicos
/// <summary>
/// Obtém um lead por ID
/// </summary>
/// <param name="id">ID do lead</param>
/// <returns>Lead encontrado</returns>
public async Task<LeadDto> GetLeadByIdAsync(int id) { }
```

```typescript
// Frontend: Comentários JSDoc para funções complexas
/**
 * Calcula o IMC baseado em peso e altura
 * @param weight - Peso em kg
 * @param height - Altura em metros
 * @returns IMC calculado
 */
const calculateBmi = (weight: number, height: number): number => { };
```

### Imports

```typescript
// Frontend: Organizar imports
// 1. React e bibliotecas externas
import React, { useState } from 'react';
import styled from 'styled-components';

// 2. Componentes internos
import { Button } from './components/styled/Button';

// 3. Utilitários e tipos
import { calculateBmi } from './utils/bmiCalculator';
import { Lead } from './types';
```

```csharp
// Backend: Organizar usings
// 1. System
using System;
using System.Threading.Tasks;

// 2. Microsoft
using Microsoft.AspNetCore.Mvc;

// 3. Projeto
using LeticiaConde.Application.DTOs;
using LeticiaConde.Application.Interfaces;
```

### Formatação

- **Indentação**: 4 espaços (C#), 2 espaços (TypeScript)
- **Linhas**: Máximo 120 caracteres
- **Quebra de linha**: Antes de operadores em expressões longas

---

**Última Atualização**: Janeiro 2025  
**Mantido por**: Solution Architect e Fullstack Engineer

