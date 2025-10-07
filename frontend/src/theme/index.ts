import type { Theme } from "../types";

// Breakpoints melhorados baseados em dispositivos reais
const breakpoints = {
  sm: "480px", // Mobile grande
  md: "640px", // Tablet pequeno
  lg: "768px", // iPad retrato
  xl: "834px", // iPad Air/Pro retrato
  xxl: "1024px", // iPad paisagem
  desktop: "1280px", // Desktop padrão
  wide: "1440px", // Desktop wide
} as const;

// Tipografia fluida com clamp
const fluidTypography = {
  h1: "clamp(1.375rem, 2.5vw, 2.5rem)", // 22px - 40px
  h2: "clamp(1.125rem, 2.0vw, 2.0rem)", // 18px - 32px
  h3: "clamp(1rem, 1.5vw, 1.5rem)", // 16px - 24px
  h4: "clamp(0.875rem, 1.2vw, 1.25rem)", // 14px - 20px
  h5: "clamp(0.75rem, 1vw, 1.125rem)", // 12px - 18px
  h6: "clamp(0.6875rem, 0.9vw, 1rem)", // 11px - 16px
  body: "clamp(0.875rem, 1.1vw, 1rem)", // 14px - 16px
  small: "clamp(0.75rem, 0.9vw, 0.875rem)", // 12px - 14px
  large: "clamp(1rem, 1.2vw, 1.125rem)", // 16px - 18px
} as const;

// Spacing fluido
const fluidSpacing = {
  xs: "clamp(0.25rem, 0.5vw, 0.5rem)", // 4px - 8px
  sm: "clamp(0.5rem, 1vw, 1rem)", // 8px - 16px
  md: "clamp(0.75rem, 1.5vw, 1.5rem)", // 12px - 24px
  lg: "clamp(1rem, 2vw, 2rem)", // 16px - 32px
  xl: "clamp(1.5rem, 3vw, 3rem)", // 24px - 48px
  "2xl": "clamp(2rem, 4vw, 4rem)", // 32px - 64px
} as const;

// Border radius fluido
const fluidBorderRadius = {
  sm: "clamp(0.25rem, 0.5vw, 0.5rem)", // 4px - 8px
  md: "clamp(0.5rem, 1vw, 1rem)", // 8px - 16px
  lg: "clamp(0.75rem, 1.5vw, 1.5rem)", // 12px - 24px
  xl: "clamp(1rem, 2vw, 2rem)", // 16px - 32px
} as const;

// Light Theme (Tema Claro)
export const lightTheme: Theme = {
  colors: {
    primary: "#4CAF50", // Principal (Saúde)
    secondary: "#2196F3", // Secundária (Confiança)
    accent: "#FF7043", // Acento/CTA (Energia)
    background: "#F8F9FA", // Fundo Principal - mais suave
    text: "#2C3E50", // Texto Principal - azul escuro em vez de preto
    textSecondary: "#6C757D", // Texto Secundário - cinza mais suave
    border: "#DEE2E6", // Bordas - cinza mais claro
    success: "#4CAF50", // Sucesso
    warning: "#FF9800", // Aviso
    error: "#F44336", // Erro
  },
  space: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    "2xl": 32,
  },
  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
  },
  borderRadius: {
    sm: "0.25rem", // 4px
    md: "0.5rem", // 8px
    lg: "0.75rem", // 12px
    xl: "1rem", // 16px
  },
  shadows: {
    sm: "0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.12), 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.24)", // 0 1px 3px, 0 1px 2px
    md: "0 0.1875rem 0.375rem rgba(0, 0, 0, 0.16), 0 0.1875rem 0.375rem rgba(0, 0, 0, 0.23)", // 0 3px 6px, 0 3px 6px
    lg: "0 0.625rem 1.25rem rgba(0, 0, 0, 0.19), 0 0.375rem 0.375rem rgba(0, 0, 0, 0.23)", // 0 10px 20px, 0 6px 6px
  },
  bp: breakpoints,
  mq: {
    up: (key: keyof typeof breakpoints) =>
      `@media (min-width: ${breakpoints[key]})`,
    down: (px: number) => `@media (max-width: ${px}px)`,
  },
  fluid: {
    typography: fluidTypography,
    spacing: fluidSpacing,
    borderRadius: fluidBorderRadius,
  },
};

// Dark Theme (Tema Escuro)
export const darkTheme: Theme = {
  colors: {
    primary: "#66BB6A", // Principal (Saúde) - versão mais clara
    secondary: "#2196F3", // Secundária (Confiança) - mantém
    accent: "#FF8A65", // Acento/CTA (Energia) - versão mais clara
    background: "#1A1A1A", // Fundo Principal - cinza escuro em vez de preto
    text: "#E0E0E0", // Texto Principal - cinza claro em vez de branco puro
    textSecondary: "#B0B0B0", // Texto Secundário
    border: "#404040", // Bordas - cinza médio
    success: "#66BB6A", // Sucesso
    warning: "#FFB74D", // Aviso
    error: "#EF5350", // Erro
  },
  space: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    "2xl": 32,
  },
  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
  },
  borderRadius: {
    sm: "0.25rem", // 4px
    md: "0.5rem", // 8px
    lg: "0.75rem", // 12px
    xl: "1rem", // 16px
  },
  shadows: {
    sm: "0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.3), 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.4)", // 0 1px 3px, 0 1px 2px
    md: "0 0.1875rem 0.375rem rgba(0, 0, 0, 0.4), 0 0.1875rem 0.375rem rgba(0, 0, 0, 0.5)", // 0 3px 6px, 0 3px 6px
    lg: "0 0.625rem 1.25rem rgba(0, 0, 0, 0.5), 0 0.375rem 0.375rem rgba(0, 0, 0, 0.6)", // 0 10px 20px, 0 6px 6px
  },
  bp: breakpoints,
  mq: {
    up: (key: keyof typeof breakpoints) =>
      `@media (min-width: ${breakpoints[key]})`,
    down: (px: number) => `@media (max-width: ${px}px)`,
  },
  fluid: {
    typography: fluidTypography,
    spacing: fluidSpacing,
    borderRadius: fluidBorderRadius,
  },
};

// Theme provider context
export const getTheme = (isDark: boolean): Theme => {
  return isDark ? darkTheme : lightTheme;
};

// Common styles that can be reused
export const commonStyles = {
  // Typography
  fontFamily: {
    primary:
      '"Inter", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    heading: '"Inter", "Segoe UI", "Roboto", sans-serif',
  },

  // Font sizes (mantido para compatibilidade)
  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    md: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
  },

  // Font weights
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },

  // Transitions
  transition: {
    fast: "0.15s ease-in-out",
    normal: "0.3s ease-in-out",
    slow: "0.5s ease-in-out",
  },

  // Z-index scale
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
};

// BMI Classification Colors
export const bmiColors = {
  underweight: "#2196F3", // Blue
  normal: "#4CAF50", // Green
  overweight: "#FF9800", // Orange
  obesityI: "#FF7043", // Deep Orange
  obesityII: "#F44336", // Red
  obesityIII: "#9C27B0", // Purple
};

// Status Colors
export const statusColors = {
  reserved: "#FF9800", // Orange
  confirmed: "#4CAF50", // Green
  cancelled: "#F44336", // Red
  completed: "#2196F3", // Blue
};
