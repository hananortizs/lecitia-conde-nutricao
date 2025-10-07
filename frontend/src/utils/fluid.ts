// Tipografia fluida com clamp
export const fluidTypography = {
  // Títulos
  h1: "clamp(1.375rem, 2.5vw, 2.5rem)", // 22px - 40px
  h2: "clamp(1.125rem, 2.0vw, 2.0rem)", // 18px - 32px
  h3: "clamp(1rem, 1.5vw, 1.5rem)", // 16px - 24px
  h4: "clamp(0.875rem, 1.2vw, 1.25rem)", // 14px - 20px
  h5: "clamp(0.75rem, 1vw, 1.125rem)", // 12px - 18px
  h6: "clamp(0.6875rem, 0.9vw, 1rem)", // 11px - 16px

  // Texto
  body: "clamp(0.875rem, 1.1vw, 1rem)", // 14px - 16px
  small: "clamp(0.75rem, 0.9vw, 0.875rem)", // 12px - 14px
  large: "clamp(1rem, 1.2vw, 1.125rem)", // 16px - 18px

  // Especiais
  caption: "clamp(0.6875rem, 0.8vw, 0.75rem)", // 11px - 12px
  overline: "clamp(0.625rem, 0.7vw, 0.6875rem)", // 10px - 11px
} as const;

// Spacing fluido
export const fluidSpacing = {
  xs: "clamp(0.25rem, 0.5vw, 0.5rem)", // 4px - 8px
  sm: "clamp(0.5rem, 1vw, 1rem)", // 8px - 16px
  md: "clamp(0.75rem, 1.5vw, 1.5rem)", // 12px - 24px
  lg: "clamp(1rem, 2vw, 2rem)", // 16px - 32px
  xl: "clamp(1.5rem, 3vw, 3rem)", // 24px - 48px
  "2xl": "clamp(2rem, 4vw, 4rem)", // 32px - 64px
  "3xl": "clamp(3rem, 6vw, 6rem)", // 48px - 96px
} as const;

// Border radius fluido
export const fluidBorderRadius = {
  sm: "clamp(0.25rem, 0.5vw, 0.5rem)", // 4px - 8px
  md: "clamp(0.5rem, 1vw, 1rem)", // 8px - 16px
  lg: "clamp(0.75rem, 1.5vw, 1.5rem)", // 12px - 24px
  xl: "clamp(1rem, 2vw, 2rem)", // 16px - 32px
  full: "clamp(0.5rem, 1vw, 1rem)", // 8px - 16px (para botões)
} as const;

// Gap fluido para grids
export const fluidGap = {
  xs: "clamp(0.25rem, 0.5vw, 0.5rem)", // 4px - 8px
  sm: "clamp(0.5rem, 1vw, 1rem)", // 8px - 16px
  md: "clamp(0.75rem, 1.5vw, 1.5rem)", // 12px - 24px
  lg: "clamp(1rem, 2vw, 2rem)", // 16px - 32px
  xl: "clamp(1.5rem, 3vw, 3rem)", // 24px - 48px
} as const;

// Padding fluido
export const fluidPadding = {
  xs: "clamp(0.25rem, 0.5vw, 0.5rem)", // 4px - 8px
  sm: "clamp(0.5rem, 1vw, 1rem)", // 8px - 16px
  md: "clamp(0.75rem, 1.5vw, 1.5rem)", // 12px - 24px
  lg: "clamp(1rem, 2vw, 2rem)", // 16px - 32px
  xl: "clamp(1.5rem, 3vw, 3rem)", // 24px - 48px
  "2xl": "clamp(2rem, 4vw, 4rem)", // 32px - 64px
} as const;

// Margin fluido
export const fluidMargin = {
  xs: "clamp(0.25rem, 0.5vw, 0.5rem)", // 4px - 8px
  sm: "clamp(0.5rem, 1vw, 1rem)", // 8px - 16px
  md: "clamp(0.75rem, 1.5vw, 1.5rem)", // 12px - 24px
  lg: "clamp(1rem, 2vw, 2rem)", // 16px - 32px
  xl: "clamp(1.5rem, 3vw, 3rem)", // 24px - 48px
  "2xl": "clamp(2rem, 4vw, 4rem)", // 32px - 64px
} as const;

// Width fluido para containers
export const fluidWidth = {
  xs: "clamp(20rem, 90vw, 24rem)", // 320px - 384px
  sm: "clamp(24rem, 90vw, 32rem)", // 384px - 512px
  md: "clamp(32rem, 90vw, 48rem)", // 512px - 768px
  lg: "clamp(48rem, 90vw, 64rem)", // 768px - 1024px
  xl: "clamp(64rem, 90vw, 80rem)", // 1024px - 1280px
  "2xl": "clamp(80rem, 90vw, 96rem)", // 1280px - 1536px
  full: "100%",
  screen: "100vw",
} as const;

// Height fluido
export const fluidHeight = {
  xs: "clamp(2rem, 5vh, 3rem)", // 32px - 48px
  sm: "clamp(3rem, 8vh, 4rem)", // 48px - 64px
  md: "clamp(4rem, 10vh, 6rem)", // 64px - 96px
  lg: "clamp(6rem, 15vh, 8rem)", // 96px - 128px
  xl: "clamp(8rem, 20vh, 12rem)", // 128px - 192px
  screen: "100vh",
} as const;

// Função para criar clamp customizado
export const clamp = (min: string, preferred: string, max: string) =>
  `clamp(${min}, ${preferred}, ${max})`;

// Função para criar clamp baseado em viewport
export const clampVw = (min: number, max: number) =>
  `clamp(${min}px, ${((max - min) / 100) * 100}vw, ${max}px)`;

// Função para criar clamp baseado em rem
export const clampRem = (min: number, max: number) =>
  `clamp(${min}rem, ${((max - min) / 100) * 100}vw, ${max}rem)`;

// Função para criar clamp baseado em viewport height
export const clampVh = (min: number, max: number) =>
  `clamp(${min}px, ${((max - min) / 100) * 100}vh, ${max}px)`;

// Função para criar clamp baseado em viewport mínimo
export const clampVmin = (min: number, max: number) =>
  `clamp(${min}px, ${((max - min) / 100) * 100}vmin, ${max}px)`;

// Função para criar clamp baseado em viewport máximo
export const clampVmax = (min: number, max: number) =>
  `clamp(${min}px, ${((max - min) / 100) * 100}vmax, ${max}px)`;
