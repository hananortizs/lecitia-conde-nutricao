import { css } from "styled-components";

// Tipos para breakpoints
type BreakpointKey = "sm" | "md" | "lg" | "xl" | "xxl" | "desktop" | "wide";

// Função para media queries com min-width
export const up =
  (key: BreakpointKey) =>
  ({ theme }: any) =>
    css`
      @media (min-width: ${theme.bp[key]}) {
        ${css``}
      }
    `;

// Função para media queries com max-width
export const down = (px: number) => css`
  @media (max-width: ${px}px) {
    ${css``}
  }
`;

// Função para media queries entre dois breakpoints
export const between =
  (min: BreakpointKey, max: BreakpointKey) =>
  ({ theme }: any) =>
    css`
      @media (min-width: ${theme.bp[min]}) and (max-width: ${theme.bp[max]}) {
        ${css``}
      }
    `;

// Função para media queries apenas para mobile
export const mobile = css`
  @media (max-width: 767px) {
    ${css``}
  }
`;

// Função para media queries apenas para tablet
export const tablet = css`
  @media (min-width: 768px) and (max-width: 1023px) {
    ${css``}
  }
`;

// Função para media queries apenas para desktop
export const desktop = css`
  @media (min-width: 1024px) {
    ${css``}
  }
`;

// Função para media queries de alta resolução
export const retina = css`
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    ${css``}
  }
`;

// Função para media queries de orientação
export const landscape = css`
  @media (orientation: landscape) {
    ${css``}
  }
`;

export const portrait = css`
  @media (orientation: portrait) {
    ${css``}
  }
`;

// Função para media queries de hover
export const hover = css`
  @media (hover: hover) {
    ${css``}
  }
`;

// Função para media queries de touch
export const touch = css`
  @media (hover: none) {
    ${css``}
  }
`;

// Função para media queries de movimento reduzido
export const reducedMotion = css`
  @media (prefers-reduced-motion: reduce) {
    ${css``}
  }
`;

// Função para media queries de modo escuro
export const darkMode = css`
  @media (prefers-color-scheme: dark) {
    ${css``}
  }
`;

// Função para media queries de modo claro
export const lightMode = css`
  @media (prefers-color-scheme: light) {
    ${css``}
  }
`;
