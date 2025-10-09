import styled, { css } from "styled-components";
import type { Theme } from "../../types";

interface InputProps {
  $error?: boolean;
  disabled?: boolean;
  $size?: "sm" | "md" | "lg";
  $fullWidth?: boolean;
}

const getSizeStyles = (size: string, theme: Theme) => {
  switch (size) {
    case "sm":
      return css`
        padding: ${theme.spacing.sm} ${theme.spacing.md};
        font-size: 0.875rem;
        min-height: 32px;
      `;
    case "lg":
      return css`
        padding: ${theme.spacing.md} ${theme.spacing.lg};
        font-size: 1.125rem;
        min-height: 48px;
      `;
    default: // md
      return css`
        padding: ${theme.spacing.sm} ${theme.spacing.md};
        font-size: 1rem;
        min-height: 40px;
      `;
  }
};

export const StyledInput = styled.input<InputProps>`
  width: 100%;
  border: 2px solid
    ${(props) =>
      props.$error ? props.theme.colors.error : props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  transition: all 0.2s ease;
  cursor: text;

  ${(props) => getSizeStyles(props.$size || "md", props.theme)}

  ${(props) =>
    props.$fullWidth &&
    css`
      width: 100%;
    `}

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
      background-color: ${props.theme.colors.border};
    `}

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.primary}20;
  }

  &:hover:not(:disabled) {
    border-color: ${(props) =>
      props.$error ? props.theme.colors.error : props.theme.colors.primary};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.textSecondary};
  }
`;

export const StyledTextarea = styled.textarea<InputProps>`
  width: 100%;
  border: 2px solid
    ${(props) =>
      props.$error ? props.theme.colors.error : props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  transition: all 0.2s ease;
  cursor: text;
  resize: vertical;
  min-height: 80px;

  ${(props) => getSizeStyles(props.$size || "md", props.theme)}

  ${(props) =>
    props.$fullWidth &&
    css`
      width: 100%;
    `}

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
      background-color: ${props.theme.colors.border};
    `}

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.primary}20;
  }

  &:hover:not(:disabled) {
    border-color: ${(props) =>
      props.$error ? props.theme.colors.error : props.theme.colors.primary};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.textSecondary};
  }
`;

export const StyledSelect = styled.select<InputProps>`
  width: 100%;
  border: 2px solid
    ${(props) =>
      props.$error ? props.theme.colors.error : props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  transition: all 0.2s ease;
  cursor: pointer;

  ${(props) => getSizeStyles(props.$size || "md", props.theme)}

  ${(props) =>
    props.$fullWidth &&
    css`
      width: 100%;
    `}

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
      background-color: ${props.theme.colors.border};
    `}

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.primary}20;
  }

  &:hover:not(:disabled) {
    border-color: ${(props) =>
      props.$error ? props.theme.colors.error : props.theme.colors.primary};
  }
`;

// Input group for labels and error messages
export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.sm};
  width: 100%;
`;

export const Label = styled.label`
  font-weight: 500;
  color: ${(props) => props.theme.colors.text};
  font-size: 0.875rem;
`;

export const ErrorMessage = styled.span`
  color: ${(props) => props.theme.colors.error};
  font-size: 0.75rem;
  font-weight: 500;
`;

export const HelperText = styled.span`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 0.75rem;
`;

// Input with icon
export const InputWithIcon = styled.div`
  position: relative;
  width: 100%;

  input {
    padding-right: 2.5rem;
  }

  .icon {
    position: absolute;
    right: ${(props) => props.theme.spacing.md};
    top: 50%;
    transform: translateY(-50%);
    color: ${(props) => props.theme.colors.textSecondary};
    pointer-events: none;
  }
`;
