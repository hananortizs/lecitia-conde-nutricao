import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { StyledButton } from "./styled/Button";
import {
  StyledInput,
  StyledTextarea,
  InputGroup,
  Label,
  ErrorMessage,
} from "./styled/Input";
import PhoneInput from "./styled/PhoneInput";
import { StyledCard } from "./styled/Card";
import { Container } from "./styled/Container";
import {
  Heart,
  Activity,
  Utensils,
  Clock,
  AlertCircle,
  Calendar,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

interface PreConsultationData {
  // Informações básicas
  name: string;
  email: string;
  whatsApp: string;
  birthDate: string;
  gender: string;
  genderOther?: string;
  mainGoals: string[];

  // Objetivos e motivação
  mainGoal: string;
  motivation: string;
  previousExperience: string;

  // Estilo de vida atual
  currentDiet: string;
  mealFrequency: string;
  cookingTime: string;
  foodRestrictions: string;
  supplements: string;

  // Atividade física
  exerciseFrequency: string;
  exerciseType: string;
  exerciseDuration: string;

  // Histórico médico
  medicalConditions: string;
  medications: string;
  allergies: string;

  // Comportamento alimentar
  eatingPattern: string;
  emotionalEating: string;
  sleepQuality: string;
  stressLevel: string;

  // Expectativas
  expectations: string;
  timeline: string;
  budget: string;
}

const FormSection = styled.section`
  padding: ${(props) => props.theme.fluid.spacing.xl} 0;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.background} 0%,
    ${(props) => props.theme.colors.background}f8 100%
  );
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f0f0f0' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.3;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const FormContainer = styled(Container)`
  max-width: 800px;
`;

const FormTitle = styled.h2`
  text-align: center;
  font-size: ${(props) => props.theme.fluid.typography.h2};
  font-weight: 800;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.text} 0%,
    ${(props) => props.theme.colors.primary} 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: ${(props) => props.theme.fluid.spacing.lg};
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  position: relative;
  animation: fadeInUp 0.8s ease-out;

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 3px;
    background: linear-gradient(
      90deg,
      ${(props) => props.theme.colors.primary},
      ${(props) => props.theme.colors.accent}
    );
    border-radius: 2px;
  }
`;

const FormSubtitle = styled.p`
  text-align: center;
  font-size: ${(props) => props.theme.fluid.typography.large};
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: ${(props) => props.theme.fluid.spacing.xl};
  max-width: 45rem;
  margin-left: auto;
  margin-right: auto;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  animation: fadeInUp 0.8s ease-out 0.2s both;
`;

const FormCard = styled(StyledCard)`
  max-width: 100%;
  margin: 0 auto;
  box-shadow: ${(props) => props.theme.shadows.lg};
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: ${(props) => props.theme.fluid.spacing.xl};

  .goals-section {
    padding: ${(props) => props.theme.fluid.spacing.md} 0;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${(props) => props.theme.fluid.spacing.lg};

  ${({ theme }) => theme.mq.up("md")} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${(props) => props.theme.fluid.spacing.xl};
  }
`;

const SectionTitle = styled.h3`
  font-size: ${(props) => props.theme.fluid.typography.h4};
  font-weight: 700;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: ${(props) => props.theme.fluid.spacing.md};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.fluid.spacing.sm};
`;

const FullWidthField = styled.div`
  grid-column: 1 / -1;
`;

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SelectField = styled.select`
  width: 100%;
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  padding-right: 3rem;
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.background} 0%,
    ${(props) => props.theme.colors.background}f8 100%
  );
  color: ${(props) => props.theme.colors.text};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  appearance: none;
  position: relative;
  z-index: 2;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.primary}20;
    background: linear-gradient(
      135deg,
      ${(props) => props.theme.colors.primary}05,
      ${(props) => props.theme.colors.background}f8 100%
    );
  }

  &:hover:not(:disabled) {
    border-color: ${(props) => props.theme.colors.primary};
    background: linear-gradient(
      135deg,
      ${(props) => props.theme.colors.primary}08,
      ${(props) => props.theme.colors.background}f8 100%
    );
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${(props) => props.theme.colors.primary}15;
  }

  option {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    padding: ${(props) => props.theme.spacing.sm};
    font-weight: 500;
  }
`;

const SelectIcon = styled.div`
  position: absolute;
  right: ${(props) => props.theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 1;
  color: ${(props) => props.theme.colors.textSecondary};
  transition: all 0.3s ease;

  select:focus + & {
    color: ${(props) => props.theme.colors.primary};
    transform: translateY(-50%) rotate(180deg);
  }

  select:hover + & {
    color: ${(props) => props.theme.colors.primary};
  }
`;

// Objetivos com mini balões
const GoalsContainer = styled.div`
  margin-top: ${(props) => props.theme.fluid.spacing.sm};
  position: relative;
  padding: ${(props) => props.theme.fluid.spacing.sm} 0;
`;

const GoalsGrid = styled.div<{ $isExpanded?: boolean }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: ${(props) => props.theme.fluid.spacing.sm};
  margin-bottom: ${(props) => props.theme.fluid.spacing.md};
  position: relative;
  overflow: hidden;
  max-height: ${(props) => (props.$isExpanded ? "none" : "200px")};
  transition: max-height 0.3s ease;
  width: 100%;
  box-sizing: border-box;
  padding: ${(props) => props.theme.fluid.spacing.sm} 0;

  ${({ theme }) => theme.mq.up("sm")} {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: ${(props) => props.theme.fluid.spacing.md};
  }

  ${({ theme }) => theme.mq.up("md")} {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: ${(props) => props.theme.fluid.spacing.lg};
  }
`;

const BlurOverlay = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: linear-gradient(
    to bottom,
    transparent,
    ${(props) => props.theme.colors.background}90,
    ${(props) => props.theme.colors.background}
  );
  pointer-events: none;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;
  z-index: 1;
  margin-bottom: ${(props) => props.theme.fluid.spacing.sm};
`;

const GoalChip = styled.button<{ $isSelected?: boolean; $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.fluid.spacing.xs}
    ${(props) => props.theme.fluid.spacing.sm};
  border: 2px solid
    ${(props) =>
      props.$isSelected
        ? props.theme.colors.primary
        : props.theme.colors.border};
  border-radius: 20px;
  background: ${(props) =>
    props.$isSelected
      ? `linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.primary}dd)`
      : props.theme.colors.background};
  color: ${(props) => (props.$isSelected ? "white" : props.theme.colors.text)};
  font-size: ${(props) => props.theme.fluid.typography.small};
  font-weight: 500;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
  min-height: 40px;
  max-width: 100%;
  word-wrap: break-word;
  text-align: center;
  line-height: 1.2;

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
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${(props) => props.theme.colors.primary}30;
    border-color: ${(props) => props.theme.colors.primary};

    &::before {
      left: 100%;
    }
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const ExpandButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.fluid.spacing.xs};
  padding: ${(props) => props.theme.fluid.spacing.sm}
    ${(props) => props.theme.fluid.spacing.md};
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: 25px;
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fluid.typography.small};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: ${(props) => props.theme.fluid.spacing.sm};

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.primary};
    transform: translateY(-1px);
  }
`;

const SelectedGoalsInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.fluid.spacing.sm};
  margin-top: ${(props) => props.theme.fluid.spacing.md};
  padding: ${(props) => props.theme.fluid.spacing.sm}
    ${(props) => props.theme.fluid.spacing.md};
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary}10,
    ${(props) => props.theme.colors.primary}20
  );
  border-radius: ${(props) => props.theme.borderRadius.md};
  border: 1px solid ${(props) => props.theme.colors.primary}30;
`;

const SelectedCount = styled.span`
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};
`;

const OtherInputContainer = styled.div<{ $isVisible: boolean }>`
  margin-top: ${(props) => props.theme.fluid.spacing.md};
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  max-height: ${(props) => (props.$isVisible ? "100px" : "0")};
  overflow: hidden;
  transition: all 0.3s ease;
`;

const OtherInput = styled(StyledInput)`
  margin-top: ${(props) => props.theme.fluid.spacing.sm};
`;

// Componente de input de data com react-datepicker
const DateInputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const CustomDateInput = styled(StyledInput)`
  padding-right: 3rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
  }

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.primary}20;
    outline: none;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.textSecondary};
  }
`;

const CalendarIcon = styled(Calendar)`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: ${(props) => props.theme.colors.textSecondary};
  pointer-events: auto;
  cursor: pointer;
  z-index: 1;
  transition: all 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    transform: translateY(-50%) scale(1.1);
  }

  ${DateInputContainer}:focus-within & {
    color: ${(props) => props.theme.colors.primary};
    transform: translateY(-50%) scale(1.05);
  }
`;

// Estilos customizados para o react-datepicker
const DatePickerWrapper = styled.div`
  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container {
    width: 100%;
  }

  .react-datepicker {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.lg};
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    width: 320px;
    padding: 0;
    margin-top: 0.5rem;
  }

  .react-datepicker__header {
    background: linear-gradient(
      135deg,
      ${(props) => props.theme.colors.primary},
      ${(props) => props.theme.colors.secondary}
    );
    border-bottom: none;
    border-radius: ${(props) => props.theme.borderRadius.lg}
      ${(props) => props.theme.borderRadius.lg} 0 0;
    padding: 1.5rem 1rem;
    position: relative;
  }

  .react-datepicker__current-month {
    color: white;
    font-weight: 600;
    font-size: ${(props) => props.theme.fluid.typography.body};
    text-transform: capitalize;
  }

  .react-datepicker__day-name {
    color: white;
    font-weight: 500;
    font-size: ${(props) => props.theme.fluid.typography.small};
  }

  .react-datepicker__day {
    color: ${(props) => props.theme.colors.text};
    border-radius: ${(props) => props.theme.borderRadius.md};
    transition: all 0.3s ease;
    font-weight: 500;
    position: relative;

    &:hover {
      background-color: ${(props) => props.theme.colors.primary}20;
      color: ${(props) => props.theme.colors.primary};
      transform: scale(1.1);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  }

  .react-datepicker__day--selected {
    background: linear-gradient(
      135deg,
      ${(props) => props.theme.colors.primary},
      ${(props) => props.theme.colors.secondary}
    );
    color: white;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: scale(1.05);

    &:hover {
      background: linear-gradient(
        135deg,
        ${(props) => props.theme.colors.primary}dd,
        ${(props) => props.theme.colors.secondary}dd
      );
      transform: scale(1.1);
    }
  }

  .react-datepicker__day--today {
    background-color: ${(props) => props.theme.colors.primary}20;
    color: ${(props) => props.theme.colors.primary};
    font-weight: 600;
    border: 2px solid ${(props) => props.theme.colors.primary}40;

    &:hover {
      background-color: ${(props) => props.theme.colors.primary}30;
      transform: scale(1.1);
    }
  }

  .react-datepicker__navigation {
    top: 1.5rem;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    transition: all 0.3s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
      transform: scale(1.1);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  }

  .react-datepicker__navigation--previous {
    left: 1rem;
  }

  .react-datepicker__navigation--next {
    right: 1rem;
  }

  .react-datepicker__month-container {
    background-color: ${(props) => props.theme.colors.background};
  }

  .react-datepicker__year-dropdown,
  .react-datepicker__month-dropdown {
    background-color: ${(props) => props.theme.colors.background};
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.md};
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15), 0 3px 10px rgba(0, 0, 0, 0.1);
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
    padding: 0.5rem 0;
    margin-top: 0.5rem;
    min-width: 120px;
  }

  .react-datepicker__year-option,
  .react-datepicker__month-option {
    color: ${(props) => props.theme.colors.text};
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: ${(props) => props.theme.colors.primary}20;
      color: ${(props) => props.theme.colors.primary};
    }
  }

  .react-datepicker__year-read-view,
  .react-datepicker__month-read-view {
    cursor: pointer;
    padding: 0.5rem 0.75rem;
    border-radius: ${(props) => props.theme.borderRadius.sm};
    transition: all 0.3s ease;
    background-color: rgba(255, 255, 255, 0.15);
    color: white;
    font-weight: 500;
    border: 1px solid rgba(255, 255, 255, 0.3);
    margin: 0 0.125rem;
    font-size: 0.9rem;
    min-width: 60px;
    text-align: center;

    &:hover {
      background-color: rgba(255, 255, 255, 0.25);
      transform: translateY(-1px);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      border-color: rgba(255, 255, 255, 0.5);
    }
  }

  .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-read-view--down-arrow {
    border-top-color: white;
    margin-top: 0.25rem;
    border-width: 3px 3px 0 3px;
    opacity: 0.9;
    transition: all 0.2s ease;
    margin-left: 0.25rem;

    &:hover {
      opacity: 1;
      transform: scale(1.1);
    }
  }

  /* Estilos para calendário inline */
  .react-datepicker__day-names {
    display: flex;
    justify-content: space-around;
    padding: 0.5rem 0;
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
    margin-bottom: 0.5rem;
  }

  .react-datepicker__week {
    display: flex;
    justify-content: space-around;
    padding: 0.25rem 0;
  }

  .react-datepicker__day {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    margin: 0.125rem;
    border-radius: ${(props) => props.theme.borderRadius.sm};
    transition: all 0.2s ease;
  }
`;

const HelperText = styled.p`
  font-size: ${(props) => props.theme.fluid.typography.small};
  color: ${(props) => props.theme.colors.textSecondary};
  margin-top: ${(props) => props.theme.fluid.spacing.sm};
  line-height: 1.5;
`;

// Componente de calendário customizado para navegação sequencial
const SequentialCalendar = styled.div`
  background: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
  width: 320px;
  margin-top: 0.5rem;
  overflow: hidden;
`;

const CalendarHeader = styled.div`
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary},
    ${(props) => props.theme.colors.secondary}
  );
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

const CalendarTitle = styled.h3`
  color: white;
  font-size: ${(props) => props.theme.fluid.typography.h4};
  font-weight: 600;
  margin: 0;
  flex: 1;
  text-align: center;
`;

const NavigationArrows = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  order: 3; /* Move para o lado direito */
`;

const CalendarTitleContainer = styled.div`
  flex: 1;
  text-align: center;
  order: 2; /* Mantém no centro */
`;

const ResetButtonContainer = styled.div`
  order: 1; /* Move para o lado esquerdo */
`;

const ArrowButton = styled.button<{ $disabled?: boolean }>`
  background: ${(props) =>
    props.$disabled ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.1)"};
  border: 1px solid
    ${(props) =>
      props.$disabled
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(255, 255, 255, 0.2)"};
  color: ${(props) => (props.$disabled ? "rgba(255, 255, 255, 0.3)" : "white")};
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;
  opacity: ${(props) => (props.$disabled ? 0.4 : 1)};

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  &:disabled {
    cursor: not-allowed;
  }

  /* Efeito de ofuscação quando desabilitado */
  ${(props) =>
    props.$disabled &&
    `
    filter: grayscale(100%);
    pointer-events: none;
  `}
`;

const CalendarContent = styled.div`
  padding: 1rem;
`;

const YearScroll = styled.div`
  max-height: 200px;
  overflow-y: auto;
  padding: 0.5rem 0;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background: ${(props) => props.theme.colors.background};
`;

const YearItem = styled.button<{ $isSelected?: boolean; $isCurrent?: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: center;
  background: ${(props) =>
    props.$isSelected
      ? `linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.secondary})`
      : props.$isCurrent
      ? `${props.theme.colors.primary}20`
      : "transparent"};
  color: ${(props) =>
    props.$isSelected
      ? "white"
      : props.$isCurrent
      ? props.theme.colors.primary
      : props.theme.colors.text};
  border: ${(props) =>
    props.$isCurrent && !props.$isSelected
      ? `2px solid ${props.theme.colors.primary}40`
      : "1px solid transparent"};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: ${(props) =>
    props.$isSelected || props.$isCurrent ? "600" : "500"};
  font-size: ${(props) => props.theme.fluid.typography.body};
  margin-bottom: 0.25rem;

  &:hover {
    background: ${(props) =>
      props.$isSelected
        ? `linear-gradient(135deg, ${props.theme.colors.primary}dd, ${props.theme.colors.secondary}dd)`
        : `${props.theme.colors.primary}20`};
    transform: scale(1.02);
  }
`;

const MonthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
`;

const DayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
`;

const CalendarItem = styled.button<{
  $isSelected?: boolean;
  $isToday?: boolean;
}>`
  background: ${(props) =>
    props.$isSelected
      ? `linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.secondary})`
      : props.$isToday
      ? `${props.theme.colors.primary}20`
      : "transparent"};
  color: ${(props) =>
    props.$isSelected
      ? "white"
      : props.$isToday
      ? props.theme.colors.primary
      : props.theme.colors.text};
  border: ${(props) =>
    props.$isToday && !props.$isSelected
      ? `2px solid ${props.theme.colors.primary}40`
      : "1px solid transparent"};
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: ${(props) =>
    props.$isSelected || props.$isToday ? "600" : "500"};
  font-size: ${(props) => props.theme.fluid.typography.small};

  &:hover {
    background: ${(props) =>
      props.$isSelected
        ? `linear-gradient(135deg, ${props.theme.colors.primary}dd, ${props.theme.colors.secondary}dd)`
        : `${props.theme.colors.primary}20`};
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const DayName = styled.div`
  text-align: center;
  font-size: ${(props) => props.theme.fluid.typography.small};
  color: ${(props) => props.theme.colors.textSecondary};
  font-weight: 500;
  padding: 0.5rem 0;
`;

const NavigationButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: ${(props) => props.theme.fluid.spacing.md};
  justify-content: center;
  margin-top: ${(props) => props.theme.fluid.spacing.xl};
  flex-wrap: wrap;
`;

interface PreConsultationFormProps {
  onSubmit: (data: PreConsultationData) => void;
  onCancel: () => void;
}

const PreConsultationForm: React.FC<PreConsultationFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  // Funções auxiliares para data atual
  const getCurrentYear = () => new Date().getFullYear();
  const getCurrentMonth = () => new Date().getMonth();
  const getCurrentDay = () => new Date().getDate();

  // Estado para controlar a navegação sequencial do calendário
  const [calendarStep, setCalendarStep] = useState<"year" | "month" | "day">(
    "year"
  );
  const [selectedYear, setSelectedYear] = useState<number | null>(
    getCurrentYear()
  );
  const [selectedMonth, setSelectedMonth] = useState<number | null>(0); // Janeiro por padrão
  const [selectedDay, setSelectedDay] = useState<number | null>(1); // Dia 1 por padrão
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Garantir que a página sempre comece no topo
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Detectar cliques fora do calendário para fechá-lo
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const calendarElement = document.querySelector(
        "[data-calendar-container]"
      );
      const inputElement = document.querySelector("[data-date-input]");

      if (
        isCalendarOpen &&
        calendarElement &&
        !calendarElement.contains(target) &&
        !inputElement?.contains(target)
      ) {
        closeCalendar();
      }
    };

    if (isCalendarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
    clearErrors,
  } = useForm<PreConsultationData>({
    defaultValues: {
      mainGoals: [],
    },
    mode: "onSubmit", // Só valida no submit
    reValidateMode: "onSubmit", // Só revalida no submit
    shouldFocusError: false, // Não foca no erro automaticamente
    shouldUnregister: false, // Mantém os valores dos campos
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoalsExpanded, setIsGoalsExpanded] = useState(false);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // Opções de objetivos
  const allGoals = [
    { value: "perda-peso", label: "Perda de peso" },
    { value: "ganho-massa", label: "Ganho de massa muscular" },
    { value: "melhora-saude", label: "Melhora da saúde geral" },
    { value: "energia", label: "Aumento da energia" },
    { value: "manutencao", label: "Manutenção do peso" },
    { value: "outro", label: "Outro" },
    { value: "controle-diabetes", label: "Controle do diabetes" },
    { value: "controle-pressao", label: "Controle da pressão arterial" },
    { value: "melhora-digestao", label: "Melhora da digestão" },
    { value: "ganho-peso", label: "Ganho de peso" },
  ];

  const defaultGoals = allGoals.slice(0, 6);
  const additionalGoals = allGoals.slice(6);

  const handleGoalToggle = (goalValue: string) => {
    const isSelected = selectedGoals.includes(goalValue);

    if (isSelected) {
      // Remove o objetivo
      const newGoals = selectedGoals.filter((goal) => goal !== goalValue);
      setSelectedGoals(newGoals);
    } else if (selectedGoals.length < 3) {
      // Adiciona o objetivo
      const newGoals = [...selectedGoals, goalValue];
      setSelectedGoals(newGoals);
    }
  };

  // Funções para o calendário sequencial
  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setCalendarStep("month");
  };

  const handleMonthSelect = (month: number) => {
    setSelectedMonth(month);
    setCalendarStep("day");
  };

  const handleDaySelect = (day: number) => {
    if (selectedYear && selectedMonth !== null) {
      // Atualizar o dia selecionado
      setSelectedDay(day);
      // Criar a data de forma mais explícita para evitar problemas de fuso horário
      const year = selectedYear;
      const month = selectedMonth + 1; // Converter para mês 1-12
      const dayStr = day.toString().padStart(2, "0");
      const monthStr = month.toString().padStart(2, "0");
      const formattedDate = `${year}-${monthStr}-${dayStr}`;
      setValue("birthDate", formattedDate);
      closeCalendar(); // Fechar o calendário após seleção
    }
  };

  const resetCalendar = () => {
    setCalendarStep("year");
    setSelectedYear(getCurrentYear()); // Manter o ano atual selecionado
    setSelectedMonth(0); // Janeiro por padrão
    setSelectedDay(1); // Dia 1 por padrão
  };

  // Funções para controlar abertura/fechamento do calendário
  const toggleCalendar = () => {
    if (isCalendarOpen) {
      // Se está aberto, fechar e definir data padrão
      closeCalendar();
      setDefaultDate();
    } else {
      // Se está fechado, abrir com configurações padrão
      openCalendar();
    }
  };

  const closeCalendar = () => {
    setIsCalendarOpen(false);
  };

  const setDefaultDate = () => {
    // Definir data padrão: ano atual, janeiro, dia 1
    const year = getCurrentYear();
    const month = 1; // Janeiro
    const day = 1;
    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    setValue("birthDate", formattedDate);
  };

  const openCalendar = () => {
    setIsCalendarOpen(true);
    // Configurar valores padrão
    setCalendarStep("year");
    setSelectedYear(getCurrentYear());
    setSelectedMonth(0); // Janeiro por padrão
    setSelectedDay(1); // Dia 1 por padrão
  };

  // Funções de navegação com setas
  const navigateUp = () => {
    if (calendarStep === "month") {
      setCalendarStep("year");
      // Manter o ano selecionado, mas resetar o mês
      setSelectedMonth(null);
    } else if (calendarStep === "day") {
      setCalendarStep("month");
      // Manter o mês selecionado
    }
  };

  const navigateDown = () => {
    if (calendarStep === "year" && selectedYear !== null) {
      setCalendarStep("month");
      // Se janeiro já está selecionado, ir direto para dias
      if (selectedMonth === 0) {
        setCalendarStep("day");
      }
    } else if (calendarStep === "month" && selectedMonth !== null) {
      setCalendarStep("day");
      // Se dia 1 já está selecionado, definir a data automaticamente
      if (selectedDay === 1) {
        setDefaultDate();
      }
    }
  };

  const canNavigateUp = () => {
    return calendarStep !== "year";
  };

  const canNavigateDown = () => {
    if (calendarStep === "year") {
      return selectedYear !== null;
    } else if (calendarStep === "month") {
      return selectedMonth !== null;
    } else if (calendarStep === "day") {
      return selectedDay !== null;
    }
    return false;
  };

  const generateYears = () => {
    const currentYear = getCurrentYear();
    const years = [];
    for (let year = currentYear; year >= currentYear - 120; year--) {
      years.push(year);
    }
    return years;
  };

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const generateDays = () => {
    if (selectedYear === null || selectedMonth === null) return [];

    // Corrigir: selectedMonth já é o índice correto (0-11)
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
    const days = [];

    // Dias do mês anterior
    const prevMonth = new Date(selectedYear, selectedMonth, 0);
    const daysInPrevMonth = prevMonth.getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: daysInPrevMonth - i, isCurrentMonth: false });
    }

    // Dias do mês atual
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ day, isCurrentMonth: true });
    }

    // Dias do próximo mês para completar a grade
    const remainingDays = 42 - days.length; // 6 semanas x 7 dias
    for (let day = 1; day <= remainingDays; day++) {
      days.push({ day, isCurrentMonth: false });
    }

    return days;
  };

  const onFormSubmit = async (data: PreConsultationData) => {
    // Validação dos objetivos usando estado local
    if (selectedGoals.length === 0) {
      alert("Por favor, selecione pelo menos um objetivo.");
      return;
    }

    // Adiciona os objetivos selecionados aos dados
    const dataWithGoals = {
      ...data,
      mainGoals: selectedGoals,
    };

    // Validação manual dos campos obrigatórios sem trigger
    const requiredFields = [
      "name",
      "email",
      "whatsApp",
      "birthDate",
      "gender",
      "motivation",
      "previousExperience",
      "currentDiet",
      "mealFrequency",
      "cookingTime",
      "activityLevel",
      "medicalConditions",
      "medications",
      "eatingBehavior",
      "expectations",
      "budget",
    ];

    const missingFields = requiredFields.filter((field) => {
      const value = data[field as keyof PreConsultationData];
      return !value || (typeof value === "string" && value.trim() === "");
    });

    if (missingFields.length > 0) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(dataWithGoals);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormSection>
      <FormContainer>
        <FormTitle>Pré-Consulta Nutricional</FormTitle>
        <FormSubtitle>
          Ajude-nos a conhecer você melhor para personalizar sua consulta
        </FormSubtitle>

        <FormCard>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            {/* Informações Básicas */}
            <SectionTitle>
              <Heart size={20} />
              Informações Básicas
            </SectionTitle>
            <FormGrid>
              <InputGroup>
                <Label htmlFor="name">Nome Completo *</Label>
                <StyledInput id="name" {...register("name")} />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="email">E-mail *</Label>
                <StyledInput id="email" type="email" {...register("email")} />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="whatsApp">WhatsApp *</Label>
                <PhoneInput
                  id="whatsApp"
                  placeholder="11 99999-9999"
                  value={watch("whatsApp") || ""}
                  onChange={(value) => {
                    // Atualiza o valor no formulário
                    const event = {
                      target: { name: "whatsApp", value: value },
                    } as any;
                    register("whatsApp").onChange(event);
                  }}
                  onBlur={() =>
                    register("whatsApp").onBlur({
                      target: { name: "whatsApp" },
                    } as any)
                  }
                />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="birthDate">Data de Nascimento *</Label>
                <DateInputContainer>
                  <CustomDateInput
                    id="birthDate"
                    placeholder="Selecione sua data de nascimento"
                    value={
                      watch("birthDate")
                        ? watch("birthDate").split("-").reverse().join("/")
                        : ""
                    }
                    readOnly
                    onClick={openCalendar}
                    data-date-input
                  />
                  <CalendarIcon onClick={toggleCalendar} />
                </DateInputContainer>

                {isCalendarOpen && (
                  <SequentialCalendar data-calendar-container>
                    <CalendarHeader>
                      <ResetButtonContainer>
                        <NavigationButton
                          onClick={resetCalendar}
                          title="Resetar calendário"
                        >
                          <Calendar size={16} />
                        </NavigationButton>
                      </ResetButtonContainer>

                      <CalendarTitleContainer>
                        <CalendarTitle>
                          {calendarStep === "year" && "Selecione o Ano"}
                          {calendarStep === "month" &&
                            `Selecione o Mês - ${selectedYear}`}
                          {calendarStep === "day" &&
                            `${months[selectedMonth || 0]} ${selectedYear}`}
                        </CalendarTitle>
                      </CalendarTitleContainer>

                      <NavigationArrows>
                        <ArrowButton
                          onClick={navigateUp}
                          $disabled={!canNavigateUp()}
                          title="Voltar para etapa anterior"
                        >
                          <ChevronUp size={16} />
                        </ArrowButton>
                        <ArrowButton
                          onClick={navigateDown}
                          $disabled={!canNavigateDown()}
                          title="Avançar para próxima etapa"
                        >
                          <ChevronDown size={16} />
                        </ArrowButton>
                      </NavigationArrows>
                    </CalendarHeader>

                    <CalendarContent>
                      {calendarStep === "year" && (
                        <YearScroll>
                          {generateYears().map((year) => (
                            <YearItem
                              key={year}
                              onClick={() => handleYearSelect(year)}
                              $isCurrent={year === getCurrentYear()}
                              $isSelected={year === selectedYear}
                            >
                              {year}
                            </YearItem>
                          ))}
                        </YearScroll>
                      )}

                      {calendarStep === "month" && (
                        <MonthGrid>
                          {months.map((month, index) => (
                            <CalendarItem
                              key={index}
                              onClick={() => handleMonthSelect(index)}
                              $isToday={
                                index === getCurrentMonth() &&
                                selectedYear === getCurrentYear()
                              }
                              $isSelected={index === selectedMonth}
                            >
                              {month}
                            </CalendarItem>
                          ))}
                        </MonthGrid>
                      )}

                      {calendarStep === "day" && (
                        <>
                          <DayGrid>
                            {dayNames.map((dayName) => (
                              <DayName key={dayName}>{dayName}</DayName>
                            ))}
                          </DayGrid>
                          <DayGrid>
                            {generateDays().map(
                              ({ day, isCurrentMonth }, index) => (
                                <CalendarItem
                                  key={index}
                                  onClick={() =>
                                    isCurrentMonth && handleDaySelect(day)
                                  }
                                  $isToday={
                                    isCurrentMonth &&
                                    day === getCurrentDay() &&
                                    selectedYear === getCurrentYear() &&
                                    selectedMonth === getCurrentMonth()
                                  }
                                  $isSelected={
                                    isCurrentMonth && day === selectedDay
                                  }
                                  style={{
                                    opacity: isCurrentMonth ? 1 : 0.3,
                                    cursor: isCurrentMonth
                                      ? "pointer"
                                      : "default",
                                  }}
                                >
                                  {day}
                                </CalendarItem>
                              )
                            )}
                          </DayGrid>
                        </>
                      )}
                    </CalendarContent>
                  </SequentialCalendar>
                )}
              </InputGroup>

              <InputGroup>
                <Label htmlFor="gender">Como você se identifica? *</Label>
                <HelperText>
                  Esta informação nos ajuda a personalizar melhor seu
                  atendimento nutricional.
                </HelperText>
                <SelectContainer>
                  <SelectField id="gender" {...register("gender")}>
                    <option value="">Selecione uma opção</option>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="nao-binario">Não-binário</option>
                    <option value="agenero">Agênero</option>
                    <option value="outro">Outro</option>
                    <option value="prefiro-nao-informar">
                      Prefiro não informar
                    </option>
                  </SelectField>
                  <SelectIcon>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="6,9 12,15 18,9"></polyline>
                    </svg>
                  </SelectIcon>
                </SelectContainer>
                <OtherInputContainer $isVisible={watch("gender") === "outro"}>
                  <Label htmlFor="genderOther">Por favor, especifique:</Label>
                  <OtherInput
                    id="genderOther"
                    placeholder="Como você se identifica?"
                    {...register("genderOther")}
                  />
                </OtherInputContainer>
              </InputGroup>
            </FormGrid>

            {/* Objetivos e Motivação */}
            <SectionTitle>
              <Activity size={20} />
              Objetivos e Motivação
            </SectionTitle>
            <FormGrid className="goals-section">
              <FullWidthField>
                <Label>Quais são seus principais objetivos? *</Label>
                <HelperText>
                  Selecione até 3 objetivos principais que mais te motivam
                  (máximo 3)
                </HelperText>
                <GoalsContainer>
                  <GoalsGrid $isExpanded={isGoalsExpanded}>
                    {/* Objetivos padrão (sempre visíveis) */}
                    {defaultGoals.map((goal) => (
                      <GoalChip
                        key={goal.value}
                        $isSelected={selectedGoals.includes(goal.value)}
                        $disabled={
                          !selectedGoals.includes(goal.value) &&
                          selectedGoals.length >= 3
                        }
                        onClick={() => handleGoalToggle(goal.value)}
                      >
                        {goal.label}
                      </GoalChip>
                    ))}

                    {/* Objetivos adicionais (visíveis quando expandido) */}
                    {isGoalsExpanded &&
                      additionalGoals.map((goal) => (
                        <GoalChip
                          key={goal.value}
                          $isSelected={selectedGoals.includes(goal.value)}
                          $disabled={
                            !selectedGoals.includes(goal.value) &&
                            selectedGoals.length >= 3
                          }
                          onClick={() => handleGoalToggle(goal.value)}
                        >
                          {goal.label}
                        </GoalChip>
                      ))}
                  </GoalsGrid>

                  {/* Blur overlay quando não expandido */}
                  <BlurOverlay $isVisible={!isGoalsExpanded} />

                  <ExpandButton
                    type="button"
                    onClick={() => setIsGoalsExpanded(!isGoalsExpanded)}
                  >
                    {isGoalsExpanded ? "Ver menos opções" : "Ver mais opções"}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{
                        transform: isGoalsExpanded
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      <polyline points="6,9 12,15 18,9"></polyline>
                    </svg>
                  </ExpandButton>

                  {selectedGoals.length > 0 && (
                    <SelectedGoalsInfo>
                      <SelectedCount>{selectedGoals.length}/3</SelectedCount>
                      <span>objetivos selecionados</span>
                    </SelectedGoalsInfo>
                  )}
                </GoalsContainer>
              </FullWidthField>

              <FullWidthField>
                <Label htmlFor="motivation">
                  O que te motiva a buscar uma consulta nutricional? *
                </Label>
                <StyledTextarea
                  id="motivation"
                  rows={4}
                  placeholder="Conte-nos sua motivação..."
                  {...register("motivation")}
                />
              </FullWidthField>

              <FullWidthField>
                <Label htmlFor="previousExperience">
                  Já fez acompanhamento nutricional antes?
                </Label>
                <StyledTextarea
                  id="previousExperience"
                  rows={3}
                  placeholder="Descreva sua experiência anterior..."
                  {...register("previousExperience")}
                />
              </FullWidthField>
            </FormGrid>

            {/* Estilo de Vida */}
            <SectionTitle>
              <Utensils size={20} />
              Estilo de Vida Atual
            </SectionTitle>
            <FormGrid>
              <InputGroup>
                <Label htmlFor="currentDiet">
                  Como você descreveria sua alimentação atual? *
                </Label>
                <SelectContainer>
                  <SelectField
                    id="currentDiet"
                    {...register("currentDiet", {
                      required: "Informação sobre dieta é obrigatória",
                    })}
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="muito-saudavel">Muito saudável</option>
                    <option value="moderadamente-saudavel">
                      Moderadamente saudável
                    </option>
                    <option value="irregular">Irregular</option>
                    <option value="pouco-saudavel">Pouco saudável</option>
                    <option value="nao-sei">Não sei avaliar</option>
                  </SelectField>
                  <SelectIcon>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="6,9 12,15 18,9"></polyline>
                    </svg>
                  </SelectIcon>
                </SelectContainer>
              </InputGroup>

              <InputGroup>
                <Label htmlFor="mealFrequency">
                  Quantas refeições você faz por dia? *
                </Label>
                <SelectContainer>
                  <SelectField
                    id="mealFrequency"
                    {...register("mealFrequency", {
                      required: "Frequência de refeições é obrigatória",
                    })}
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="1-2">1-2 refeições</option>
                    <option value="3">3 refeições</option>
                    <option value="4-5">4-5 refeições</option>
                    <option value="6+">6 ou mais refeições</option>
                  </SelectField>
                  <SelectIcon>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="6,9 12,15 18,9"></polyline>
                    </svg>
                  </SelectIcon>
                </SelectContainer>
              </InputGroup>

              <InputGroup>
                <Label htmlFor="cookingTime">
                  Quanto tempo você tem para cozinhar por dia? *
                </Label>
                <SelectContainer>
                  <SelectField id="cookingTime" {...register("cookingTime")}>
                    <option value="">Selecione uma opção</option>
                    <option value="0-15min">0-15 minutos</option>
                    <option value="15-30min">15-30 minutos</option>
                    <option value="30-60min">30-60 minutos</option>
                    <option value="60min+">Mais de 60 minutos</option>
                  </SelectField>
                  <SelectIcon>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="6,9 12,15 18,9"></polyline>
                    </svg>
                  </SelectIcon>
                </SelectContainer>
              </InputGroup>

              <InputGroup>
                <Label htmlFor="foodRestrictions">
                  Tem alguma restrição alimentar?
                </Label>
                <StyledTextarea
                  id="foodRestrictions"
                  rows={3}
                  placeholder="Ex: alergias, intolerâncias, vegetarianismo..."
                  {...register("foodRestrictions")}
                />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="supplements">
                  Toma algum suplemento alimentar?
                </Label>
                <StyledTextarea
                  id="supplements"
                  rows={3}
                  placeholder="Liste os suplementos que você toma..."
                  {...register("supplements")}
                />
              </InputGroup>
            </FormGrid>

            {/* Atividade Física */}
            <SectionTitle>
              <Activity size={20} />
              Atividade Física
            </SectionTitle>
            <FormGrid>
              <InputGroup>
                <Label htmlFor="exerciseFrequency">
                  Com que frequência você se exercita? *
                </Label>
                <SelectField
                  id="exerciseFrequency"
                  {...register("exerciseFrequency", {
                    required: "Frequência de exercícios é obrigatória",
                  })}
                >
                  <option value="">Selecione uma opção</option>
                  <option value="nunca">Nunca</option>
                  <option value="1x-semana">1 vez por semana</option>
                  <option value="2-3x-semana">2-3 vezes por semana</option>
                  <option value="4-5x-semana">4-5 vezes por semana</option>
                  <option value="diariamente">Diariamente</option>
                </SelectField>
                {errors.exerciseFrequency && (
                  <ErrorMessage>
                    {errors.exerciseFrequency.message}
                  </ErrorMessage>
                )}
              </InputGroup>

              <InputGroup>
                <Label htmlFor="exerciseType">
                  Que tipo de exercício você pratica?
                </Label>
                <StyledTextarea
                  id="exerciseType"
                  rows={3}
                  placeholder="Ex: musculação, corrida, yoga, pilates..."
                  {...register("exerciseType")}
                />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="exerciseDuration">
                  Quanto tempo por sessão?
                </Label>
                <SelectField
                  id="exerciseDuration"
                  {...register("exerciseDuration")}
                >
                  <option value="">Selecione uma opção</option>
                  <option value="0-30min">0-30 minutos</option>
                  <option value="30-60min">30-60 minutos</option>
                  <option value="60-90min">60-90 minutos</option>
                  <option value="90min+">Mais de 90 minutos</option>
                </SelectField>
              </InputGroup>
            </FormGrid>

            {/* Histórico Médico */}
            <SectionTitle>
              <AlertCircle size={20} />
              Histórico Médico
            </SectionTitle>
            <FormGrid>
              <FullWidthField>
                <Label htmlFor="medicalConditions">
                  Tem alguma condição médica?
                </Label>
                <StyledTextarea
                  id="medicalConditions"
                  rows={3}
                  placeholder="Ex: diabetes, hipertensão, problemas de tireoide..."
                  {...register("medicalConditions")}
                />
              </FullWidthField>

              <FullWidthField>
                <Label htmlFor="medications">
                  Toma algum medicamento regularmente?
                </Label>
                <StyledTextarea
                  id="medications"
                  rows={3}
                  placeholder="Liste os medicamentos que você toma..."
                  {...register("medications")}
                />
              </FullWidthField>

              <FullWidthField>
                <Label htmlFor="allergies">Tem alguma alergia?</Label>
                <StyledTextarea
                  id="allergies"
                  rows={2}
                  placeholder="Descreva suas alergias..."
                  {...register("allergies")}
                />
              </FullWidthField>
            </FormGrid>

            {/* Comportamento Alimentar */}
            <SectionTitle>
              <Heart size={20} />
              Comportamento Alimentar
            </SectionTitle>
            <FormGrid>
              <InputGroup>
                <Label htmlFor="eatingPattern">
                  Como você descreveria seu padrão alimentar? *
                </Label>
                <SelectField id="eatingPattern" {...register("eatingPattern")}>
                  <option value="">Selecione uma opção</option>
                  <option value="muito-regular">Muito regular</option>
                  <option value="moderadamente-regular">
                    Moderadamente regular
                  </option>
                  <option value="irregular">Irregular</option>
                  <option value="muito-irregular">Muito irregular</option>
                </SelectField>
              </InputGroup>

              <InputGroup>
                <Label htmlFor="emotionalEating">
                  Você come por motivos emocionais? *
                </Label>
                <SelectField
                  id="emotionalEating"
                  {...register("emotionalEating", {
                    required:
                      "Informação sobre alimentação emocional é obrigatória",
                  })}
                >
                  <option value="">Selecione uma opção</option>
                  <option value="nunca">Nunca</option>
                  <option value="raramente">Raramente</option>
                  <option value="as-vezes">Às vezes</option>
                  <option value="frequentemente">Frequentemente</option>
                  <option value="sempre">Sempre</option>
                </SelectField>
              </InputGroup>

              <InputGroup>
                <Label htmlFor="sleepQuality">
                  Como você avalia a qualidade do seu sono? *
                </Label>
                <SelectField
                  id="sleepQuality"
                  {...register("sleepQuality", {
                    required: "Qualidade do sono é obrigatória",
                  })}
                >
                  <option value="">Selecione uma opção</option>
                  <option value="excelente">Excelente</option>
                  <option value="boa">Boa</option>
                  <option value="regular">Regular</option>
                  <option value="ruim">Ruim</option>
                  <option value="muito-ruim">Muito ruim</option>
                </SelectField>
              </InputGroup>

              <InputGroup>
                <Label htmlFor="stressLevel">
                  Como você avalia seu nível de estresse? *
                </Label>
                <SelectField id="stressLevel" {...register("stressLevel")}>
                  <option value="">Selecione uma opção</option>
                  <option value="muito-baixo">Muito baixo</option>
                  <option value="baixo">Baixo</option>
                  <option value="moderado">Moderado</option>
                  <option value="alto">Alto</option>
                  <option value="muito-alto">Muito alto</option>
                </SelectField>
              </InputGroup>
            </FormGrid>

            {/* Expectativas */}
            <SectionTitle>
              <Clock size={20} />
              Expectativas
            </SectionTitle>
            <FormGrid>
              <FullWidthField>
                <Label htmlFor="expectations">
                  Quais são suas expectativas com o acompanhamento nutricional?
                  *
                </Label>
                <StyledTextarea
                  id="expectations"
                  rows={4}
                  placeholder="Descreva suas expectativas..."
                  {...register("expectations")}
                />
              </FullWidthField>

              <InputGroup>
                <Label htmlFor="timeline">
                  Em quanto tempo você gostaria de ver resultados?
                </Label>
                <SelectField id="timeline" {...register("timeline")}>
                  <option value="">Selecione uma opção</option>
                  <option value="1-mes">1 mês</option>
                  <option value="3-meses">3 meses</option>
                  <option value="6-meses">6 meses</option>
                  <option value="1-ano">1 ano</option>
                  <option value="nao-tenho-pressa">Não tenho pressa</option>
                </SelectField>
              </InputGroup>

              <InputGroup>
                <Label htmlFor="budget">
                  Qual seu orçamento mensal para alimentação?
                </Label>
                <SelectField id="budget" {...register("budget")}>
                  <option value="">Selecione uma opção</option>
                  <option value="ate-200">Até R$ 200</option>
                  <option value="200-400">R$ 200 - R$ 400</option>
                  <option value="400-600">R$ 400 - R$ 600</option>
                  <option value="600-1000">R$ 600 - R$ 1.000</option>
                  <option value="1000+">Acima de R$ 1.000</option>
                </SelectField>
              </InputGroup>
            </FormGrid>

            <FormActions>
              <StyledButton
                type="button"
                $variant="outline"
                $size="lg"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancelar
              </StyledButton>
              <StyledButton
                type="submit"
                $variant="primary"
                $size="lg"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Continuar para Agendamento"}
              </StyledButton>
            </FormActions>
          </form>
        </FormCard>
      </FormContainer>
    </FormSection>
  );
};

export default PreConsultationForm;
