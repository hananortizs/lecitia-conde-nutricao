# Regras de Frontend - Letícia Conde Nutricionista

## 1. Tecnologias Utilizadas

### Framework e Build

- **React 18**: Biblioteca principal
- **Vite**: Build tool e dev server
- **TypeScript**: Tipagem estática (opcional)

### Styling

- **CSS Modules**: Estilos por componente
- **CSS Custom Properties**: Variáveis de tema
- **Responsive Design**: Mobile-first

## 2. Estrutura do Projeto

```
nutri-frontend/
├── public/                 # Arquivos estáticos
├── src/
│   ├── assets/            # Imagens, ícones, fontes
│   ├── components/        # Componentes reutilizáveis
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── Header.module.css
│   │   ├── CalculadoraIMC/
│   │   │   ├── CalculadoraIMC.jsx
│   │   │   └── CalculadoraIMC.module.css
│   │   └── ThemeToggle/
│   │       ├── ThemeToggle.jsx
│   │       └── ThemeToggle.module.css
│   ├── pages/             # Páginas principais
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.module.css
│   │   └── Agendamento/
│   │       ├── Agendamento.jsx
│   │       └── Agendamento.module.css
│   ├── services/          # Comunicação com API
│   │   ├── api.js
│   │   └── leadsService.js
│   ├── styles/            # Estilos globais
│   │   ├── global.css
│   │   ├── theme.css
│   │   └── variables.css
│   ├── App.jsx            # Componente principal
│   └── main.jsx           # Ponto de entrada
├── index.html
├── package.json
├── vite.config.js
└── tsconfig.json
```

## 3. Paleta de Cores

### Tema Claro

```css
:root {
  --bg-primary: #fafafa;
  --text-primary: #333333;
  --color-primary: #4caf50; /* Verde Esmeralda */
  --color-secondary: #2196f3; /* Azul Ciano */
  --color-accent: #ff7043; /* Coral Vibrante */
}
```

### Tema Escuro

```css
[data-theme="dark"] {
  --bg-primary: #121212;
  --text-primary: #fafafa;
  --color-primary: #66bb6a;
  --color-secondary: #2196f3;
  --color-accent: #ff8a65;
}
```

## 4. Sistema de Temas

### Detecção Automática

- **Preferência do Sistema**: `prefers-color-scheme`
- **Armazenamento**: `localStorage` para preferência manual
- **Toggle**: Botão no header para alternância manual

### Implementação

```javascript
// Detectar preferência do sistema
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedTheme = localStorage.getItem("theme");
const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
```

## 5. Componentes Principais

### Calculadora de IMC

- **Campos**: Peso (kg), Altura (m)
- **Validação**: Em tempo real
- **Resultado**: IMC + Classificação + Descrição
- **Ação**: Botão "Agendar Consulta"

### Formulário de Lead

- **Campos**: Nome, Email, WhatsApp
- **Validação**: Client-side + Server-side
- **Integração**: API `/pms/leads/capturar-imc`

### Sistema de Agendamento

- **Calendário**: Visualização de slots disponíveis
- **Validação**: Horários permitidos
- **Reserva**: Processo em 2 etapas (reserva + pagamento)

## 6. Padrões de Nomenclatura

### Arquivos e Pastas

- **Componentes**: PascalCase (`CalculadoraIMC.jsx`)
- **Estilos**: camelCase (`calculadoraIMC.module.css`)
- **Páginas**: PascalCase (`Home.jsx`)
- **Serviços**: camelCase (`leadsService.js`)

### Variáveis e Funções

- **Variáveis**: camelCase (`dataInicio`, `isLoading`)
- **Funções**: camelCase (`calcularImc`, `validarEmail`)
- **Constantes**: UPPER_SNAKE_CASE (`API_BASE_URL`)

## 7. Responsividade

### Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Estratégia

- **Mobile First**: Design para mobile primeiro
- **Progressive Enhancement**: Melhorias para telas maiores
- **Touch Friendly**: Botões e elementos tocáveis

## 8. Validações

### Client-Side

- **Campos Obrigatórios**: Validação em tempo real
- **Formato de Email**: Regex pattern
- **WhatsApp**: Formato brasileiro
- **Peso/Altura**: Valores numéricos válidos

### Feedback Visual

- **Estados**: Loading, Success, Error
- **Mensagens**: Claras e específicas
- **Cores**: Verde (sucesso), Vermelho (erro), Azul (info)

## 9. Integração com API

### Base URL

```javascript
const API_BASE_URL = "https://localhost:7000/pms";
```

### Serviços

- **Leads**: `leadsService.js`
- **Agenda**: `agendaService.js`
- **Pagamento**: `pagamentoService.js`

### Tratamento de Erros

- **Network**: Timeout, conexão
- **HTTP**: 4xx, 5xx
- **Validação**: Campos obrigatórios
- **Feedback**: Toast notifications

## 10. Performance

### Otimizações

- **Lazy Loading**: Componentes pesados
- **Memo**: React.memo para componentes puros
- **Bundle Splitting**: Vite automático
- **Images**: Otimização e lazy loading

### Métricas

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 11. Acessibilidade

### Padrões WCAG 2.1 AA

- **Contraste**: Mínimo 4.5:1
- **Navegação**: Teclado
- **Screen Readers**: Labels e ARIA
- **Foco**: Visível e lógico

### Implementação

- **Semantic HTML**: Tags apropriadas
- **ARIA Labels**: Descrições para screen readers
- **Focus Management**: Navegação por teclado
- **Color Independence**: Não apenas cor para informação

## 12. SEO

### Meta Tags

- **Title**: Dinâmico por página
- **Description**: Descrição relevante
- **Open Graph**: Compartilhamento social
- **Viewport**: Responsive design

### Estrutura

- **URLs**: Semânticas e limpas
- **Headings**: Hierarquia H1-H6
- **Alt Text**: Imagens descritivas
- **Schema Markup**: Dados estruturados
