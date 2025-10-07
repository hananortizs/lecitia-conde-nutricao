import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ChevronDown, ChevronUp } from "lucide-react";
import { StyledButton } from "../styled/Button";
import { StyledTextarea, InputGroup, Label } from "../styled/Input";
import type { PreConsultationData } from "../../types";

const StepContainer = styled.div`
  width: 100%;
`;

const GoalsContainer = styled.div<{ $isExpanded: boolean }>`
  background: ${(props) => props.theme.colors.background};
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.fluid.borderRadius.lg};
  padding: ${(props) => props.theme.fluid.spacing.lg};
  margin-bottom: ${(props) => props.theme.fluid.spacing.xl};
  position: relative;
  overflow: hidden;
  box-shadow: ${(props) => props.theme.shadows.sm};
  transition: all 0.3s ease;
  max-height: ${(props) => (props.$isExpanded ? "100rem" : "30rem")};

  &:hover {
    border-color: ${(props) => props.theme.colors.primary}40;
    box-shadow: ${(props) => props.theme.shadows.md};
  }
`;

const GoalsTitle = styled.h3`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fluid.typography.h3};
  font-weight: 700;
  margin-bottom: ${(props) => props.theme.fluid.spacing.xs};
  text-align: center;
  line-height: 1.2;
`;

const GoalsSubtitle = styled.p`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: ${(props) => props.theme.fluid.typography.small};
  font-weight: 400;
  margin-bottom: ${(props) => props.theme.fluid.spacing.lg};
  text-align: center;
  line-height: 1.5;
`;

const GoalsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${(props) => props.theme.fluid.spacing.md};

  @media ${(props) => props.theme.mq.down(768)} {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: ${(props) => props.theme.fluid.spacing.sm};
  }

  @media ${(props) => props.theme.mq.down(480)} {
    grid-template-columns: 1fr;
    gap: ${(props) => props.theme.fluid.spacing.xs};
  }
`;

const PreviewGoalsGrid = styled(GoalsGrid)`
  margin-top: ${(props) => props.theme.fluid.spacing.sm};
  filter: blur(2px);
  opacity: 0.6;
  pointer-events: none;
`;

const GoalChip = styled.button<{
  $isSelected: boolean;
  $isVisible: boolean;
  $isDisabled?: boolean;
}>`
  padding: ${(props) => props.theme.fluid.spacing.sm}
    ${(props) => props.theme.fluid.spacing.md};
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.fluid.borderRadius.xl};
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: ${(props) => props.theme.fluid.typography.small};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 3rem;
  min-width: 120px;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transform: ${(props) =>
    props.$isVisible ? "translateY(0)" : "translateY(20px)"};
  pointer-events: ${(props) => (props.$isVisible ? "auto" : "none")};
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
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    border-color: ${(props) =>
      props.$isSelected
        ? props.theme.colors.primary
        : props.theme.colors.primary};
    background: ${(props) =>
      props.$isSelected
        ? `linear-gradient(135deg, ${props.theme.colors.primary}30, ${props.theme.colors.primary}40)`
        : `${props.theme.colors.primary}15`};
    transform: translateY(-2px);
    box-shadow: ${(props) =>
      props.$isSelected
        ? `0 6px 16px ${props.theme.colors.primary}40`
        : props.theme.shadows.md};

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${(props) => props.theme.shadows.sm};
  }

  /* Estado selecionado - sempre visível e destacado */
  ${(props) =>
    props.$isSelected &&
    `
    background: linear-gradient(135deg, ${props.theme.colors.primary}20, ${props.theme.colors.primary}30);
    color: ${props.theme.colors.primary};
    border-color: ${props.theme.colors.primary};
    font-weight: 600;
    box-shadow: 0 4px 12px ${props.theme.colors.primary}30;
    transform: translateY(-1px);
    
    &::before {
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    }
    
    &::after {
      content: "✓";
      position: absolute;
      top: 4px;
      right: 4px;
      width: 18px;
      height: 18px;
      background: ${props.theme.colors.primary};
      color: white;
      border-radius: 50%;
      font-size: 11px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
  `}

  /* Estado desabilitado - quando limite de 3 é atingido */
  ${(props) =>
    props.$isDisabled &&
    !props.$isSelected &&
    `
    background: ${props.theme.colors.background};
    color: ${props.theme.colors.textSecondary};
    border-color: ${props.theme.colors.border};
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
    
    &:hover {
      background: ${props.theme.colors.background};
      color: ${props.theme.colors.textSecondary};
      border-color: ${props.theme.colors.border};
      transform: none;
      box-shadow: none;
      
      &::before {
        left: -100%;
      }
    }
  `}
`;

const ExpandButton = styled.button<{ $isExpanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.fluid.spacing.sm};
  padding: ${(props) => props.theme.fluid.spacing.sm}
    ${(props) => props.theme.fluid.spacing.lg};
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.fluid.borderRadius.xl};
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: ${(props) => props.theme.fluid.typography.small};
  margin: ${(props) => props.theme.fluid.spacing.sm} auto
    ${(props) => props.theme.fluid.spacing.md};
  min-width: 180px;
  min-height: 3rem;
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
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    background: ${(props) => props.theme.colors.primary};
    color: white;
    transform: translateY(-2px);
    box-shadow: ${(props) => props.theme.shadows.lg};

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${(props) => props.theme.shadows.md};
  }
`;

const MotivationContainer = styled.div`
  margin-top: ${(props) => props.theme.fluid.spacing.xl};
`;

const MotivationTitle = styled.h3`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fluid.typography.h3};
  font-weight: 700;
  margin-bottom: ${(props) => props.theme.fluid.spacing.md};
  text-align: center;
  line-height: 1.2;
`;

const SelectedGoalsInfo = styled.div<{ $isVisible: boolean }>`
  background: ${(props) => props.theme.colors.primary}10;
  border: 1px solid ${(props) => props.theme.colors.primary}30;
  border-radius: ${(props) => props.theme.fluid.borderRadius.md};
  padding: ${(props) => props.theme.fluid.spacing.md};
  margin-bottom: ${(props) => props.theme.fluid.spacing.lg};
  text-align: center;
  box-shadow: ${(props) => props.theme.shadows.sm};
  transition: all 0.3s ease;
  min-height: ${(props) => props.theme.fluid.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transform: ${(props) =>
    props.$isVisible ? "translateY(0)" : "translateY(-10px)"};
  pointer-events: ${(props) => (props.$isVisible ? "auto" : "none")};
  /* Sempre reservar o espaço, mesmo quando invisível */
  height: ${(props) => props.theme.fluid.spacing.xl};
  margin-top: ${(props) => props.theme.fluid.spacing.md};

  &:hover {
    box-shadow: ${(props) => props.theme.shadows.md};
    transform: ${(props) =>
      props.$isVisible ? "translateY(-1px)" : "translateY(-10px)"};
  }
`;

const SelectedGoalsText = styled.p`
  color: ${(props) => props.theme.colors.text};
  font-weight: 500;
  font-size: ${(props) => props.theme.fluid.typography.small};
  margin: 0;
  line-height: 1.5;
`;

const goals = [
  "Perder peso",
  "Ganhar massa muscular",
  "Melhorar alimentação",
  "Controlar diabetes",
  "Reduzir colesterol",
  "Melhorar digestão",
  "Aumentar energia",
  "Controlar pressão arterial",
  "Melhorar sono",
  "Reduzir inflamação",
  "Melhorar imunidade",
  "Controlar ansiedade",
  "Melhorar performance esportiva",
  "Gestão de peso pós-gravidez",
  "Alimentação infantil",
  "Alimentação na terceira idade",
  "Alimentação vegana/vegetariana",
  "Intolerâncias alimentares",
  "Outro",
];

const defaultGoalsCount = 6;

interface GoalsStepProps {
  data: PreConsultationData;
  onChange: (data: Partial<PreConsultationData>) => void;
  onComplete: (data: PreConsultationData) => void;
  onCancel: () => void;
}

const GoalsStep: React.FC<GoalsStepProps> = ({
  data,
  onChange,
  onComplete,
  onCancel,
}) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(
    data.mainGoals || []
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const [motivation, setMotivation] = useState(data.motivation || "");

  const visibleGoals = isExpanded ? goals : goals.slice(0, defaultGoalsCount);
  const showBlur = !isExpanded && goals.length > defaultGoalsCount;

  const handleGoalToggle = (goal: string) => {
    setSelectedGoals((prev) => {
      if (prev.includes(goal)) {
        // Deselecionar objetivo (sempre permitido)
        return prev.filter((g) => g !== goal);
      } else if (prev.length < 3) {
        // Selecionar objetivo (se ainda não atingiu o limite)
        return [...prev, goal];
      } else {
        // Limite atingido - não permitir seleção
        return prev;
      }
    });
  };

  const handleExpandToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMotivationChange = (value: string) => {
    setMotivation(value);
    onChange({ motivation: value });
  };

  useEffect(() => {
    onChange({ mainGoals: selectedGoals });
  }, [selectedGoals, onChange]);

  return (
    <StepContainer>
      <GoalsContainer $isExpanded={isExpanded}>
        <GoalsTitle>Quais são seus principais objetivos? *</GoalsTitle>
        <GoalsSubtitle>Selecione até 3 objetivos principais</GoalsSubtitle>

        <SelectedGoalsInfo $isVisible={selectedGoals.length > 0}>
          <SelectedGoalsText>
            {selectedGoals.length === 0
              ? "Nenhum objetivo selecionado"
              : selectedGoals.length === 1
              ? "1 objetivo selecionado"
              : `${selectedGoals.length} objetivos selecionados`}
            {selectedGoals.length > 0 && selectedGoals.length < 3 && (
              <span
                style={{
                  display: "block",
                  fontSize: "0.85em",
                  opacity: 0.8,
                  marginTop: "4px",
                }}
              >
                (máximo de 3)
              </span>
            )}
            {selectedGoals.length === 3 && (
              <span
                style={{
                  display: "block",
                  fontSize: "0.85em",
                  opacity: 0.9,
                  marginTop: "4px",
                  color: "#10b981",
                  fontWeight: "600",
                }}
              >
                ✓ Limite atingido
              </span>
            )}
          </SelectedGoalsText>
        </SelectedGoalsInfo>

        <GoalsGrid>
          {goals.map((goal, index) => (
            <GoalChip
              key={goal}
              $isSelected={selectedGoals.includes(goal)}
              $isVisible={visibleGoals.includes(goal)}
              $isDisabled={
                selectedGoals.length >= 3 && !selectedGoals.includes(goal)
              }
              onClick={() => handleGoalToggle(goal)}
            >
              {goal}
            </GoalChip>
          ))}
        </GoalsGrid>

        {!isExpanded && goals.length > defaultGoalsCount && (
          <PreviewGoalsGrid>
            {goals
              .slice(defaultGoalsCount, defaultGoalsCount + 3)
              .map((goal) => (
                <GoalChip
                  key={`preview-${goal}`}
                  $isSelected={false}
                  $isVisible={true}
                  onClick={() => {}} // Não faz nada, apenas para evitar erro
                >
                  {goal}
                </GoalChip>
              ))}
          </PreviewGoalsGrid>
        )}
      </GoalsContainer>

      {goals.length > defaultGoalsCount && (
        <ExpandButton $isExpanded={isExpanded} onClick={handleExpandToggle}>
          {isExpanded ? (
            <>
              <ChevronUp size={16} />
              Ver menos opções
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              Ver mais opções
            </>
          )}
        </ExpandButton>
      )}

      <MotivationContainer>
        <MotivationTitle>
          O que te motiva a buscar uma consulta nutricional? *
        </MotivationTitle>
        <InputGroup>
          <StyledTextarea
            placeholder="Conte-nos sobre sua motivação, expectativas e o que você espera alcançar com a consulta..."
            value={motivation}
            onChange={(e) => handleMotivationChange(e.target.value)}
            rows={4}
          />
        </InputGroup>
      </MotivationContainer>
    </StepContainer>
  );
};

export default GoalsStep;
