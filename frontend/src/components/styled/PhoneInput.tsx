import React, { useState, useEffect } from "react";
import styled from "styled-components";
import type { Theme } from "../../types";

interface PhoneInputProps {
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: (e?: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

const PhoneInputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DdiPrefix = styled.span`
  position: absolute;
  left: ${(props) => props.theme.spacing.sm};
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 1rem;
  font-weight: 500;
  pointer-events: none;
  z-index: 1;
`;

const StyledPhoneInput = styled.input<{ $error?: boolean; $hasDdi?: boolean }>`
  width: 100%;
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  padding-left: ${(props) =>
    props.$hasDdi ? "3.5rem" : props.theme.spacing.md};
  border: 2px solid
    ${(props) =>
      props.$error ? props.theme.colors.error : props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  font-size: 1rem;
  cursor: text;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.primary}20;
  }

  &:hover:not(:disabled) {
    border-color: ${(props) =>
      props.$error ? props.theme.colors.error : props.theme.colors.primary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: ${(props) => props.theme.colors.border};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.textSecondary};
  }
`;

const PhoneInput: React.FC<PhoneInputProps> = ({
  id,
  value = "",
  onChange,
  onBlur,
  error = false,
  placeholder = "11 99999-9999",
  disabled = false,
}) => {
  const [internalValue, setInternalValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Função para formatar o número de telefone
  const formatPhoneNumber = (input: string): string => {
    // Remove todos os caracteres não numéricos
    const numbers = input.replace(/\D/g, "");

    // Se não há números, retorna vazio
    if (numbers.length === 0) return "";

    // Se começar com 55 (DDI), remove para formatação
    let cleanNumbers = numbers;
    if (numbers.startsWith("55") && numbers.length > 2) {
      cleanNumbers = numbers.substring(2);
    }

    // Formata baseado no tamanho
    if (cleanNumbers.length <= 2) {
      return cleanNumbers;
    } else if (cleanNumbers.length <= 6) {
      return `(${cleanNumbers.substring(0, 2)}) ${cleanNumbers.substring(2)}`;
    } else if (cleanNumbers.length <= 10) {
      return `(${cleanNumbers.substring(0, 2)}) ${cleanNumbers.substring(
        2,
        6
      )}-${cleanNumbers.substring(6)}`;
    } else {
      // Para números com 11 dígitos (celular com 9)
      return `(${cleanNumbers.substring(0, 2)}) ${cleanNumbers.substring(
        2,
        7
      )}-${cleanNumbers.substring(7, 11)}`;
    }
  };

  // Função para extrair apenas os números do valor formatado
  const extractNumbers = (formatted: string): string => {
    return formatted.replace(/\D/g, "");
  };

  // Inicializa o valor interno apenas uma vez
  useEffect(() => {
    if (value && !internalValue && !isFocused) {
      const formatted = formatPhoneNumber(value);
      setInternalValue(formatted);
    }
  }, [value, internalValue, isFocused]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formatted = formatPhoneNumber(inputValue);
    setInternalValue(formatted);

    // Extrai apenas os números para o valor real
    const numbers = extractNumbers(formatted);

    // Adiciona o DDI 55 se não estiver presente
    const fullNumber = numbers.startsWith("55") ? numbers : `55${numbers}`;

    if (onChange) {
      onChange(fullNumber);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Permite apenas números, backspace, delete, tab, escape, enter, home, end, setas
    const allowedKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "Escape",
      "Enter",
      "Home",
      "End",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
    ];

    if (
      !allowedKeys.includes(e.key) &&
      !(e.key >= "0" && e.key <= "9") &&
      !e.ctrlKey &&
      !e.metaKey
    ) {
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const formatted = formatPhoneNumber(pastedText);
    setInternalValue(formatted);

    const numbers = extractNumbers(formatted);
    const fullNumber = numbers.startsWith("55") ? numbers : `55${numbers}`;

    if (onChange) {
      onChange(fullNumber);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <PhoneInputContainer>
      <DdiPrefix>+55</DdiPrefix>
      <StyledPhoneInput
        id={id}
        type="text"
        value={internalValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        $error={error}
        $hasDdi={true}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={15} // (11) 99999-9999 = 15 caracteres
      />
    </PhoneInputContainer>
  );
};

export default PhoneInput;
