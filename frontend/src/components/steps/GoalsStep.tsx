import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ChevronDown, ChevronUp } from "lucide-react";
import { StyledButton } from "../styled/Button";
import { StyledTextarea, InputGroup, Label } from "../styled/Input";
import type { PreConsultationData } from "../../types";

const StepContainer = styled.div`
  width: 100%;
`;

const GoalsContainer = styled.div`
  background: ${(props) => props.theme.colors.background};
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: 2rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
`;

const GoalsTitle = styled.h3`
  color: ${(props) => props.theme.colors.text};
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
`;

const GoalsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
`;

const GoalChip = styled.button<{ $isSelected: boolean; $isVisible: boolean }>`
  padding: 0.75rem 1rem;
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: 2rem;
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 2.5rem;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transform: ${(props) =>
    props.$isVisible ? "translateY(0)" : "translateY(20px)"};
  pointer-events: ${(props) => (props.$isVisible ? "auto" : "none")};

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.primary}10;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  ${(props) =>
    props.$isSelected &&
    `
    background: linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.secondary});
    color: white;
    border-color: ${props.theme.colors.primary};
    box-shadow: 0 4px 12px ${props.theme.colors.primary}40;
    transform: translateY(-2px);
  `}
`;

const ExpandButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 2rem;
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 0.875rem;
  margin: 0 auto;
  min-width: 200px;

  &:hover {
    background: ${(props) => props.theme.colors.primary};
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${(props) => props.theme.colors.primary}40;
  }
`;

const BlurOverlay = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3rem;
  background: linear-gradient(
    to top,
    ${(props) => props.theme.colors.background} 0%,
    ${(props) => props.theme.colors.background}80 50%,
    transparent 100%
  );
  pointer-events: none;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const MotivationContainer = styled.div`
  margin-top: 2rem;
`;

const MotivationTitle = styled.h3`
  color: ${(props) => props.theme.colors.text};
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
`;

const SelectedGoalsInfo = styled.div`
  background: ${(props) => props.theme.colors.primary}10;
  border: 1px solid ${(props) => props.theme.colors.primary}30;
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const SelectedGoalsText = styled.p`
  color: ${(props) => props.theme.colors.text};
  font-weight: 500;
  margin: 0;
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
        return prev.filter((g) => g !== goal);
      } else if (prev.length < 3) {
        return [...prev, goal];
      }
      return prev;
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
      <GoalsContainer>
        <GoalsTitle>Quais são seus principais objetivos? *</GoalsTitle>
        <GoalsTitle
          style={{
            fontSize: "0.875rem",
            fontWeight: "400",
            color: "var(--text-secondary)",
          }}
        >
          Selecione até 3 objetivos principais
        </GoalsTitle>

        <GoalsGrid>
          {goals.map((goal, index) => (
            <GoalChip
              key={goal}
              $isSelected={selectedGoals.includes(goal)}
              $isVisible={visibleGoals.includes(goal)}
              onClick={() => handleGoalToggle(goal)}
            >
              {goal}
            </GoalChip>
          ))}
        </GoalsGrid>

        {showBlur && <BlurOverlay $isVisible={showBlur} />}

        {goals.length > defaultGoalsCount && (
          <ExpandButton onClick={handleExpandToggle}>
            {isExpanded ? (
              <>
                <ChevronUp size={16} />
                Colapsar
              </>
            ) : (
              <>
                <ChevronDown size={16} />
                Ver mais opções
              </>
            )}
          </ExpandButton>
        )}
      </GoalsContainer>

      {selectedGoals.length > 0 && (
        <SelectedGoalsInfo>
          <SelectedGoalsText>
            {selectedGoals.length} de 3 objetivos selecionados
          </SelectedGoalsText>
        </SelectedGoalsInfo>
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
