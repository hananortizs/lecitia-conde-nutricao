import styled, { css } from "styled-components";
import type { Theme } from "../../types";

interface ButtonProps {
  $variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "outline"
    | "ghost"
    | "gradient"
    | "glass";
  $size?: "xs" | "sm" | "md" | "lg" | "xl";
  $fullWidth?: boolean;
  $rounded?: boolean;
  $shadow?: boolean;
  disabled?: boolean;
  $loading?: boolean;
}

const getVariantStyles = (variant: string, theme: Theme) => {
  switch (variant) {
    case "primary":
      return css`
        background: linear-gradient(
          135deg,
          ${theme.colors.primary},
          ${theme.colors.primary}dd
        );
        color: white;
        border: none;
        box-shadow: 0 4px 15px ${theme.colors.primary}30;

        &:hover:not(:disabled) {
          background: linear-gradient(
            135deg,
            ${theme.colors.primary}dd,
            ${theme.colors.primary}
          );
          transform: translateY(-2px);
          box-shadow: 0 8px 25px ${theme.colors.primary}40;
        }
      `;
    case "secondary":
      return css`
        background: linear-gradient(
          135deg,
          ${theme.colors.secondary},
          ${theme.colors.secondary}dd
        );
        color: white;
        border: none;
        box-shadow: 0 4px 15px ${theme.colors.secondary}30;

        &:hover:not(:disabled) {
          background: linear-gradient(
            135deg,
            ${theme.colors.secondary}dd,
            ${theme.colors.secondary}
          );
          transform: translateY(-2px);
          box-shadow: 0 8px 25px ${theme.colors.secondary}40;
        }
      `;
    case "accent":
      return css`
        background: linear-gradient(
          135deg,
          ${theme.colors.accent},
          ${theme.colors.accent}dd
        );
        color: white;
        border: none;
        box-shadow: 0 4px 15px ${theme.colors.accent}30;

        &:hover:not(:disabled) {
          background: linear-gradient(
            135deg,
            ${theme.colors.accent}dd,
            ${theme.colors.accent}
          );
          transform: translateY(-2px);
          box-shadow: 0 8px 25px ${theme.colors.accent}40;
        }
      `;
    case "outline":
      return css`
        background: transparent;
        color: ${theme.colors.primary};
        border: 2px solid ${theme.colors.primary};
        position: relative;
        overflow: hidden;

        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            ${theme.colors.primary}20,
            transparent
          );
          transition: left 0.5s;
        }

        &:hover:not(:disabled) {
          background: ${theme.colors.primary};
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px ${theme.colors.primary}30;

          &::before {
            left: 100%;
          }
        }
      `;
    case "ghost":
      return css`
        background: transparent;
        color: ${theme.colors.text};
        border: none;

        &:hover:not(:disabled) {
          background: ${theme.colors.border}20;
          transform: translateY(-1px);
        }
      `;
    case "gradient":
      return css`
        background: linear-gradient(
          135deg,
          ${theme.colors.primary},
          ${theme.colors.secondary},
          ${theme.colors.accent}
        );
        background-size: 200% 200%;
        color: white;
        border: none;
        animation: gradientShift 3s ease infinite;

        &:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px ${theme.colors.primary}40;
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `;
    case "glass":
      return css`
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        color: ${theme.colors.text};
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

        &:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }
      `;
    default:
      return css`
        background: linear-gradient(
          135deg,
          ${theme.colors.primary},
          ${theme.colors.primary}dd
        );
        color: white;
        border: none;
        box-shadow: 0 4px 15px ${theme.colors.primary}30;
      `;
  }
};

const getSizeStyles = (size: string, theme: Theme) => {
  // Fallback para propriedades fluid que podem não existir
  const fluidSpacing = theme.fluid?.spacing || theme.spacing;
  const fluidTypography = theme.fluid?.typography || {
    small: "0.75rem",
    body: "1rem",
    large: "1.125rem",
    h4: "1.25rem",
  };
  const fluidBorderRadius = theme.fluid?.borderRadius || theme.borderRadius;

  switch (size) {
    case "xs":
      return css`
        padding: ${fluidSpacing.xs} ${fluidSpacing.sm};
        font-size: ${fluidTypography.small};
        min-height: 2rem;
        border-radius: ${fluidBorderRadius.sm};
      `;
    case "sm":
      return css`
        padding: ${fluidSpacing.sm} ${fluidSpacing.md};
        font-size: ${fluidTypography.body};
        min-height: 2.5rem;
        border-radius: ${fluidBorderRadius.md};
      `;
    case "md":
      return css`
        padding: ${fluidSpacing.md} ${fluidSpacing.lg};
        font-size: ${fluidTypography.body};
        min-height: 3rem;
        border-radius: ${fluidBorderRadius.md};
      `;
    case "lg":
      return css`
        padding: ${fluidSpacing.lg} ${fluidSpacing.xl};
        font-size: ${fluidTypography.large};
        min-height: 3.5rem;
        border-radius: ${fluidBorderRadius.lg};
      `;
    case "xl":
      return css`
        padding: ${fluidSpacing.xl} ${fluidSpacing["2xl"] || fluidSpacing.xl};
        font-size: ${fluidTypography.h4};
        min-height: 4rem;
        border-radius: ${fluidBorderRadius.lg};
      `;
    default:
      return css`
        padding: ${fluidSpacing.md} ${fluidSpacing.lg};
        font-size: ${fluidTypography.body};
        min-height: 3rem;
        border-radius: ${fluidBorderRadius.md};
      `;
  }
};

export const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.fluid?.spacing?.xs || props.theme.spacing.xs};
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  font-family: inherit;
  white-space: nowrap;
  user-select: none;
  border: none;

  ${(props) => getVariantStyles(props.$variant || "primary", props.theme)}
  ${(props) => getSizeStyles(props.$size || "md", props.theme)}

  ${(props) =>
    props.$fullWidth &&
    css`
      width: 100%;
    `}

  ${(props) =>
    props.$rounded &&
    css`
      border-radius: 50px;
    `}

  ${(props) =>
    props.$shadow &&
    css`
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    `}

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
      pointer-events: none;
      transform: none !important;
      box-shadow: none !important;
    `}

  ${(props) =>
    props.$loading &&
    css`
      cursor: wait;
      pointer-events: none;
    `}

  &:focus {
    outline: 2px solid ${(props) => props.theme.colors.primary};
    outline-offset: 2px;
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  /* Responsive adjustments */
  ${({ theme }) => theme.mq?.down(480)} {
    min-height: 2.5rem;
    padding: ${(props) =>
        props.theme.fluid?.spacing?.sm || props.theme.spacing.sm}
      ${(props) => props.theme.fluid?.spacing?.md || props.theme.spacing.md};
    font-size: ${(props) => props.theme.fluid?.typography?.body || "1rem"};
  }

  ${({ theme }) => theme.mq?.up("lg")} {
    min-height: 3.5rem;
    padding: ${(props) =>
        props.theme.fluid?.spacing?.lg || props.theme.spacing.lg}
      ${(props) => props.theme.fluid?.spacing?.xl || props.theme.spacing.xl};
  }

  /* Loading spinner */
  &::after {
    content: "";
    position: absolute;
    width: 1rem; /* 16px */
    height: 1rem; /* 16px */
    margin: auto;
    border: 0.125rem solid transparent;
    border-top-color: currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  ${(props) =>
    props.$loading &&
    css`
      &::after {
        opacity: 1;
      }
    `}

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// Button group for multiple buttons
export const ButtonGroup = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};
  align-items: center;

  &.vertical {
    flex-direction: column;
    align-items: stretch;
  }

  &.full-width {
    width: 100%;
  }
`;
