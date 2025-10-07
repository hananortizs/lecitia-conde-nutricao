# Frontend - Letícia Conde Nutricionista

Sistema de captação de leads e agendamento para a nutricionista Letícia Conde.

## Tecnologias

- **React 19** - Framework JavaScript
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Styled Components** - CSS-in-JS
- **React Hook Form** - Gerenciamento de formulários
- **Axios** - Cliente HTTP
- **Date-fns** - Manipulação de datas
- **Lucide React** - Ícones

## Funcionalidades

### ✅ Implementadas

- Sistema de temas (claro/escuro)
- Calculadora de IMC com validações
- Captura de leads
- Sistema de agendamento com calendário
- Integração com API do backend
- Layout responsivo
- Componentes reutilizáveis

### 🚧 Em Desenvolvimento

- Integração com sistema de pagamento
- Lógica de horários e Sabbat
- Páginas adicionais (Sobre, Contato)

## Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Backend rodando na porta 5000

### Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Executar em desenvolvimento
npm run dev
```

### Build para Produção

```bash
npm run build
npm run preview
```

## Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── styled/          # Componentes estilizados
│   ├── Layout/          # Layout e navegação
│   ├── BmiCalculator.tsx
│   └── AppointmentScheduler.tsx
├── pages/               # Páginas da aplicação
│   ├── Home.tsx
│   └── AppointmentPage.tsx
├── services/            # Serviços e APIs
│   └── api.ts
├── types/               # Definições TypeScript
│   └── index.ts
├── theme/               # Sistema de temas
│   └── index.ts
├── contexts/            # Contextos React
│   └── ThemeContext.tsx
└── App.tsx
```

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:5000
```

### Temas

O sistema suporta temas claro e escuro com paleta de cores definida:

**Tema Claro:**

- Fundo: #FAFAFA
- Texto: #333333
- Principal: #4CAF50
- Secundária: #2196F3
- Acento: #FF7043

**Tema Escuro:**

- Fundo: #121212
- Texto: #FAFAFA
- Principal: #66BB6A
- Acento: #FF8A65

## Regras de Negócio

### Horários de Funcionamento

- **Segunda a Quinta**: 17:00h às 22:00h
- **Domingo**: Horário aberto
- **Sexta e Sábado**: Bloqueado (Sabbat)

### Calculadora de IMC

- Validação de peso (1-500kg)
- Validação de altura (0.5-3.0m)
- Classificação OMS
- Captura automática de leads

### Agendamento

- Seleção de data e horário
- Validação de disponibilidade
- Respeito às regras de Sabbat
- Confirmação via pagamento

## API Integration

O frontend se comunica com o backend através de endpoints REST:

- `POST /pms/leads/capture-lead` - Captura de leads
- `GET /api/appointments/available-slots` - Horários disponíveis
- `POST /api/appointments/reserve` - Reserva de consulta

## Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview do build
- `npm run lint` - Linting do código

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request
