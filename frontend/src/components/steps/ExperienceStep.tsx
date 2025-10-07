import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ChevronDown } from "lucide-react";
import { StyledButton } from "../styled/Button";
import {
  StyledInput,
  StyledTextarea,
  InputGroup,
  Label,
} from "../styled/Input";
import type { PreConsultationData } from "../../types";

const StepContainer = styled.div`
  width: 100%;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FullWidthField = styled.div`
  grid-column: 1 / -1;
`;

const SelectContainer = styled.div`
  position: relative;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  padding-right: 3rem;
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  appearance: none;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.primary}20;
  }

  &:hover:not(:disabled) {
    border-color: ${(props) => props.theme.colors.primary};
  }

  option {
    background: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    padding: 0.5rem;
  }
`;

const ChevronIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => props.theme.colors.textSecondary};
  pointer-events: none;
`;

const YesNoContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const YesNoOption = styled.button<{ $isSelected: boolean }>`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid
    ${(props) =>
      props.$isSelected
        ? props.theme.colors.primary
        : props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background: ${(props) =>
    props.$isSelected
      ? `${props.theme.colors.primary}15`
      : props.theme.colors.background};
  color: ${(props) =>
    props.$isSelected ? props.theme.colors.primary : props.theme.colors.text};
  font-size: 1rem;
  font-weight: ${(props) => (props.$isSelected ? 600 : 500)};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    background: ${(props) =>
      props.$isSelected
        ? `${props.theme.colors.primary}20`
        : `${props.theme.colors.primary}10`};
  }

  &:active {
    transform: translateY(1px);
  }
`;

const ConditionalField = styled.div<{ $isVisible: boolean }>`
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  max-height: ${(props) => (props.$isVisible ? "200px" : "0")};
  overflow: hidden;
  transition: all 0.3s ease;
  margin-top: ${(props) => (props.$isVisible ? "1rem" : "0")};
`;

const SectionTitle = styled.h3`
  color: ${(props) => props.theme.colors.text};
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 3rem;
    height: 0.25rem;
    background: linear-gradient(
      135deg,
      ${(props) => props.theme.colors.primary},
      ${(props) => props.theme.colors.secondary}
    );
    border-radius: 0.125rem;
  }
`;

const experienceOptions = [
  {
    value: "primeira-vez",
    label: "Primeira vez fazendo acompanhamento nutricional",
  },
  { value: "ja-fiz-antes", label: "Já fiz acompanhamento nutricional antes" },
  {
    value: "fiz-recentemente",
    label: "Fiz acompanhamento recentemente (últimos 6 meses)",
  },
  { value: "faz-tempo", label: "Fiz acompanhamento há mais de 1 ano" },
];

const dietOptions = [
  { value: "nao-sei", label: "Não sei definir" },
  { value: "tradicional", label: "Tradicional (arroz, feijão, carne, etc.)" },
  { value: "vegetariana", label: "Vegetariana" },
  { value: "vegana", label: "Vegana" },
  { value: "low-carb", label: "Low Carb" },
  { value: "cetogenica", label: "Cetogênica" },
  { value: "mediterranea", label: "Mediterrânea" },
  { value: "paleo", label: "Paleo" },
  { value: "flexivel", label: "Flexível" },
  { value: "outra", label: "Outra" },
];

const mealFrequencyOptions = [
  { value: "2-refeicoes", label: "2 refeições por dia" },
  { value: "3-refeicoes", label: "3 refeições por dia" },
  { value: "4-refeicoes", label: "4 refeições por dia" },
  { value: "5-refeicoes", label: "5 refeições por dia" },
  { value: "6-refeicoes", label: "6 refeições por dia" },
  { value: "irregular", label: "Irregular (não tenho horários fixos)" },
];

const cookingTimeOptions = [
  { value: "nao-cozinho", label: "Não cozinho" },
  { value: "pouco-tempo", label: "Pouco tempo (até 30 min)" },
  { value: "tempo-medio", label: "Tempo médio (30-60 min)" },
  { value: "muito-tempo", label: "Muito tempo (mais de 1 hora)" },
  { value: "varia", label: "Varia conforme o dia" },
];

interface ExperienceStepProps {
  data: PreConsultationData;
  onChange: (data: Partial<PreConsultationData>) => void;
  onComplete: (data: PreConsultationData) => void;
  onCancel: () => void;
}

const ExperienceStep: React.FC<ExperienceStepProps> = ({
  data,
  onChange,
  onComplete,
  onCancel,
}) => {
  const [previousExperience, setPreviousExperience] = useState(
    data.previousExperience || ""
  );
  const [currentDiet, setCurrentDiet] = useState(data.currentDiet || "");
  const [mealFrequency, setMealFrequency] = useState(data.mealFrequency || "");
  const [cookingTime, setCookingTime] = useState(data.cookingTime || "");
  const [foodRestrictions, setFoodRestrictions] = useState(
    data.foodRestrictions || ""
  );
  const [supplements, setSupplements] = useState(data.supplements || "");

  // Estados para as opções Sim/Não
  const [hasFoodRestrictions, setHasFoodRestrictions] = useState<
    boolean | null
  >(data.foodRestrictions ? true : null);
  const [hasSupplements, setHasSupplements] = useState<boolean | null>(
    data.supplements ? true : null
  );

  const handleFieldChange = (
    field: keyof PreConsultationData,
    value: string
  ) => {
    onChange({ [field]: value });
  };

  const handleYesNoChange = (
    field: "hasFoodRestrictions" | "hasSupplements",
    value: boolean
  ) => {
    if (field === "hasFoodRestrictions") {
      setHasFoodRestrictions(value);
      if (!value) {
        setFoodRestrictions("");
        onChange({ foodRestrictions: "" });
      }
    } else {
      setHasSupplements(value);
      if (!value) {
        setSupplements("");
        onChange({ supplements: "" });
      }
    }
  };

  return (
    <StepContainer>
      <SectionTitle>Experiência Anterior</SectionTitle>

      <FormGrid>
        <FullWidthField>
          <InputGroup>
            <Label htmlFor="previousExperience">
              Você já fez acompanhamento nutricional antes? *
            </Label>
            <SelectContainer>
              <StyledSelect
                id="previousExperience"
                value={previousExperience}
                onChange={(e) => {
                  setPreviousExperience(e.target.value);
                  handleFieldChange("previousExperience", e.target.value);
                }}
              >
                <option value="">Selecione uma opção</option>
                {experienceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </StyledSelect>
              <ChevronIcon>
                <ChevronDown size={20} />
              </ChevronIcon>
            </SelectContainer>
          </InputGroup>
        </FullWidthField>
      </FormGrid>

      <SectionTitle>Hábitos Alimentares Atuais</SectionTitle>

      <FormGrid>
        <InputGroup>
          <Label htmlFor="currentDiet">
            Como você descreveria sua dieta atual? *
          </Label>
          <SelectContainer>
            <StyledSelect
              id="currentDiet"
              value={currentDiet}
              onChange={(e) => {
                setCurrentDiet(e.target.value);
                handleFieldChange("currentDiet", e.target.value);
              }}
            >
              <option value="">Selecione uma opção</option>
              {dietOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </StyledSelect>
            <ChevronIcon>
              <ChevronDown size={20} />
            </ChevronIcon>
          </SelectContainer>
        </InputGroup>

        <InputGroup>
          <Label htmlFor="mealFrequency">
            Quantas refeições você faz por dia? *
          </Label>
          <SelectContainer>
            <StyledSelect
              id="mealFrequency"
              value={mealFrequency}
              onChange={(e) => {
                setMealFrequency(e.target.value);
                handleFieldChange("mealFrequency", e.target.value);
              }}
            >
              <option value="">Selecione uma opção</option>
              {mealFrequencyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </StyledSelect>
            <ChevronIcon>
              <ChevronDown size={20} />
            </ChevronIcon>
          </SelectContainer>
        </InputGroup>

        <InputGroup>
          <Label htmlFor="cookingTime">
            Quanto tempo você tem para cozinhar? *
          </Label>
          <SelectContainer>
            <StyledSelect
              id="cookingTime"
              value={cookingTime}
              onChange={(e) => {
                setCookingTime(e.target.value);
                handleFieldChange("cookingTime", e.target.value);
              }}
            >
              <option value="">Selecione uma opção</option>
              {cookingTimeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </StyledSelect>
            <ChevronIcon>
              <ChevronDown size={20} />
            </ChevronIcon>
          </SelectContainer>
        </InputGroup>

        <FullWidthField>
          <InputGroup>
            <Label>Possui restrições alimentares ou alergias? *</Label>
            <YesNoContainer>
              <YesNoOption
                $isSelected={hasFoodRestrictions === true}
                onClick={() => handleYesNoChange("hasFoodRestrictions", true)}
              >
                ✓ Sim
              </YesNoOption>
              <YesNoOption
                $isSelected={hasFoodRestrictions === false}
                onClick={() => handleYesNoChange("hasFoodRestrictions", false)}
              >
                ✗ Não
              </YesNoOption>
            </YesNoContainer>

            <ConditionalField $isVisible={hasFoodRestrictions === true}>
              <StyledTextarea
                id="foodRestrictions"
                placeholder="Descreva qualquer restrição alimentar, alergia ou intolerância que você tenha..."
                value={foodRestrictions}
                onChange={(e) => {
                  setFoodRestrictions(e.target.value);
                  handleFieldChange("foodRestrictions", e.target.value);
                }}
                rows={3}
              />
            </ConditionalField>
          </InputGroup>
        </FullWidthField>

        <FullWidthField>
          <InputGroup>
            <Label>Utiliza suplementos atualmente? *</Label>
            <YesNoContainer>
              <YesNoOption
                $isSelected={hasSupplements === true}
                onClick={() => handleYesNoChange("hasSupplements", true)}
              >
                ✓ Sim
              </YesNoOption>
              <YesNoOption
                $isSelected={hasSupplements === false}
                onClick={() => handleYesNoChange("hasSupplements", false)}
              >
                ✗ Não
              </YesNoOption>
            </YesNoContainer>

            <ConditionalField $isVisible={hasSupplements === true}>
              <StyledTextarea
                id="supplements"
                placeholder="Liste os suplementos que você toma, incluindo vitaminas, proteínas, etc..."
                value={supplements}
                onChange={(e) => {
                  setSupplements(e.target.value);
                  handleFieldChange("supplements", e.target.value);
                }}
                rows={3}
              />
            </ConditionalField>
          </InputGroup>
        </FullWidthField>
      </FormGrid>
    </StepContainer>
  );
};

export default ExperienceStep;
