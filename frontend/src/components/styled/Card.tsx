import styled, { css } from "styled-components";
import type { Theme } from "../../types";

interface CardProps {
  variant?: "default" | "elevated" | "outlined" | "flat";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

const getVariantStyles = (variant: string, theme: Theme) => {
  switch (variant) {
    case "elevated":
      return css`
        box-shadow: ${theme.shadows.md};
        border: none;
      `;
    case "outlined":
      return css`
        box-shadow: none;
        border: 0.0625rem solid ${theme.colors.border};
      `;
    case "flat":
      return css`
        box-shadow: none;
        border: none;
        background-color: transparent;
      `;
    default:
      return css`
        box-shadow: ${theme.shadows.sm};
        border: 0.0625rem solid ${theme.colors.border};
      `;
  }
};

const getPaddingStyles = (padding: string, theme: Theme) => {
  switch (padding) {
    case "none":
      return css`
        padding: 0;
      `;
    case "sm":
      return css`
        padding: ${theme.spacing.md};
      `;
    case "lg":
      return css`
        padding: ${theme.spacing.xl};
      `;
    default: // md
      return css`
        padding: ${theme.spacing.lg};
      `;
  }
};

export const StyledCard = styled.div<CardProps>`
  background-color: ${(props) => props.theme.colors.background};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  ${(props) => getVariantStyles(props.variant || "default", props.theme)}
  ${(props) => getPaddingStyles(props.padding || "md", props.theme)}

  ${(props) =>
    props.hover &&
    css`
      cursor: pointer;

      &:hover {
        transform: translateY(-0.125rem); /* -2px */
        box-shadow: ${props.theme.shadows.lg};
      }
    `}
`;

export const CardHeader = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.lg};
  padding-bottom: ${(props) => props.theme.spacing.md};
  border-bottom: 0.0625rem solid ${(props) => props.theme.colors.border};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 0;
  }
`;

export const CardBody = styled.div`
  flex: 1;
`;

export const CardFooter = styled.div`
  margin-top: ${(props) => props.theme.spacing.lg};
  padding-top: ${(props) => props.theme.spacing.md};
  border-top: 0.0625rem solid ${(props) => props.theme.colors.border};
  display: flex;
  justify-content: flex-end;
  gap: ${(props) => props.theme.spacing.sm};
`;

// Card grid for multiple cards
export const CardGrid = styled.div<{ $columns?: number; $gap?: string }>`
  display: grid;
  grid-template-columns: 1fr; /* Mobile first - 1 coluna */
  gap: ${(props) => props.$gap || props.theme.fluid.spacing.md};

  ${({ theme }) => theme.mq.up("sm")} {
    grid-template-columns: repeat(2, 1fr); /* Mobile grande - 2 colunas */
    gap: ${(props) => props.$gap || props.theme.fluid.spacing.lg};
  }

  ${({ theme }) => theme.mq.up("lg")} {
    grid-template-columns: repeat(
      ${(props) => props.$columns || 3},
      1fr
    ); /* Desktop - múltiplas colunas */
    gap: ${(props) => props.$gap || props.theme.fluid.spacing.xl};
  }

  ${({ theme }) => theme.mq.up("xl")} {
    gap: ${(props) => props.$gap || props.theme.fluid.spacing["2xl"]};
  }
`;

// Card list for vertical card layouts
export const CardList = styled.div<{ gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap || props.theme.spacing.md};
`;

// Stats card for displaying metrics
export const StatsCard = styled(StyledCard)`
  text-align: center;

  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: ${(props) => props.theme.colors.primary};
    margin-bottom: ${(props) => props.theme.spacing.sm};
  }

  .stat-label {
    color: ${(props) => props.theme.colors.textSecondary};
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

// Feature card for highlighting features
export const FeatureCard = styled(StyledCard)`
  text-align: center;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid ${(props) => props.theme.colors.border};
  overflow: hidden;
  cursor: pointer;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.background} 0%,
    ${(props) => props.theme.colors.background}f8 100%
  );

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
      ${(props) => props.theme.colors.primary}10,
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border-color: ${(props) => props.theme.colors.primary};

    &::before {
      left: 100%;
    }
  }

  .feature-icon {
    width: 4rem; /* 64px */
    height: 4rem; /* 64px */
    margin: 0 auto ${(props) => props.theme.fluid.spacing.lg};
    background: linear-gradient(
      135deg,
      ${(props) => props.theme.colors.primary}20,
      ${(props) => props.theme.colors.secondary}20
    );
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.colors.primary};
    transition: all 0.3s ease;
  }

  &:hover .feature-icon {
    transform: scale(1.1);
    background: linear-gradient(
      135deg,
      ${(props) => props.theme.colors.primary},
      ${(props) => props.theme.colors.secondary}
    );
    color: white;
  }

  .feature-title {
    font-size: ${(props) => props.theme.fluid.typography.h4};
    font-weight: 700;
    margin-bottom: ${(props) => props.theme.fluid.spacing.md};
    color: ${(props) => props.theme.colors.text};
    transition: color 0.3s ease;
  }

  &:hover .feature-title {
    color: ${(props) => props.theme.colors.primary};
  }

  .feature-description {
    font-size: ${(props) => props.theme.fluid.typography.body};
    color: ${(props) => props.theme.colors.textSecondary};
    line-height: 1.7;
    margin-bottom: ${(props) => props.theme.fluid.spacing.lg};
  }

  .feature-badge {
    display: inline-flex;
    align-items: center;
    gap: ${(props) => props.theme.fluid.spacing.xs};
    padding: ${(props) => props.theme.fluid.spacing.xs}
      ${(props) => props.theme.fluid.spacing.sm};
    background: linear-gradient(
      135deg,
      ${(props) => props.theme.colors.primary}20,
      ${(props) => props.theme.colors.accent}20
    );
    color: ${(props) => props.theme.colors.primary};
    border-radius: 20px;
    font-size: ${(props) => props.theme.fluid.typography.small};
    font-weight: 600;
    border: 1px solid ${(props) => props.theme.colors.primary}30;
    transition: all 0.3s ease;
  }

  &:hover .feature-badge {
    background: linear-gradient(
      135deg,
      ${(props) => props.theme.colors.primary},
      ${(props) => props.theme.colors.accent}
    );
    color: white;
    transform: scale(1.05);
  }
`;
