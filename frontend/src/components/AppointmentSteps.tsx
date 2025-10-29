import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { StyledButton } from "./styled/Button";
import { StyledCard } from "./styled/Card";
import { Container } from "./styled/Container";
import BasicInfoStep from "./steps/BasicInfoStep";
import GoalsStep from "./steps/GoalsStep";
import ExperienceStep from "./steps/ExperienceStep";
import AppointmentStep from "./steps/AppointmentStep";
import AppointmentStart from "./AppointmentStart";
import { useAuth } from "../contexts/AuthContext";
import type { PreConsultationData } from "../types";

const StepsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.sm};
  box-sizing: border-box;
  overflow-x: hidden;
  width: 100%;

  @media (min-width: 480px) {
    padding: ${(props) => props.theme.spacing.md};
  }

  @media (min-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const StepsHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.xl};
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  position: relative;

  @media (min-width: 768px) {
    margin-bottom: 3rem;
  }
`;

const ProgressIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
`;

const StepConnector = styled.div<{ $isCompleted: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - ${(props) => props.theme.spacing.md} * 2);
  height: 2px;
  background: ${(props) =>
    props.$isCompleted
      ? props.theme.colors.success
      : props.theme.colors.border};
  z-index: 1;

  @media (min-width: 480px) {
    width: calc(100% - 4rem);
  }

  @media (min-width: 768px) {
    width: calc(100% - 5rem);
  }
`;

const StepWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  position: relative;
  z-index: 2;
  padding: 0 ${(props) => props.theme.spacing.md};
  gap: 0;

  @media (min-width: 480px) {
    padding: 0 2rem;
  }

  @media (min-width: 768px) {
    padding: 0 2.5rem;
  }
`;

const StepIndicator = styled.div<{ $isActive: boolean; $isCompleted: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 3;
  flex: 1 1 0;
  min-width: 0;
  max-width: 100%;
`;

const StepCircle = styled.div<{ $isActive: boolean; $isCompleted: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  border: 3px solid;
  position: relative;

  @media (min-width: 768px) {
    width: 48px;
    height: 48px;
    font-size: 1rem;
  }

  ${(props) => {
    if (props.$isActive) {
      return `
        background: ${props.theme.colors.primary};
        border-color: ${props.theme.colors.primary};
        color: white;
        box-shadow: 0 0 0 4px ${props.theme.colors.primary}20;
      `;
    } else if (props.$isCompleted) {
      return `
        background: ${props.theme.colors.success};
        border-color: ${props.theme.colors.success};
        color: white;
      `;
    } else {
      return `
        background: ${props.theme.colors.background};
        border-color: ${props.theme.colors.border};
        color: ${props.theme.colors.textSecondary};
      `;
    }
  }}

  &:hover {
    transform: scale(1.05);
  }
`;

const StepLabel = styled.div<{ $isActive: boolean; $isCompleted: boolean }>`
  margin-top: ${(props) => props.theme.spacing.sm};
  font-size: 0.7rem;
  font-weight: 600;
  text-align: center;
  line-height: 1.2;
  width: 100%;
  padding: 0 ${(props) => props.theme.spacing.xs};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${(props) =>
    props.$isActive || props.$isCompleted
      ? props.theme.colors.text
      : props.theme.colors.textSecondary};
  box-sizing: border-box;

  @media (min-width: 480px) {
    font-size: 0.75rem;
    padding: 0 ${(props) => props.theme.spacing.sm};
  }

  @media (min-width: 768px) {
    font-size: 0.875rem;
    padding: 0 ${(props) => props.theme.spacing.xs};
    white-space: normal;
    line-height: 1.3;
  }
`;

const StepNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.lg};
  padding-bottom: ${(props) => props.theme.spacing.md};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  min-height: 40px;

  > div {
    flex: 1;
    display: flex;
    justify-content: center;

    &:first-child {
      justify-content: flex-start;
    }

    &:last-child {
      justify-content: flex-end;
    }
  }
`;

const StepNavButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.primary}10;
    color: ${(props) => props.theme.colors.primary};
  }

  &:active {
    transform: translateY(1px);
  }
`;

const StepInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const StepCounter = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.textSecondary};
  font-weight: 500;
`;

const StepContent = styled.div`
  background: ${(props) => props.theme.colors.background};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: ${(props) => props.theme.spacing.md};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid ${(props) => props.theme.colors.border};
  box-sizing: border-box;

  @media (min-width: 480px) {
    padding: ${(props) => props.theme.spacing.lg};
  }

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const StepTitle = styled.h2`
  color: ${(props) => props.theme.colors.text};
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: ${(props) => props.theme.spacing.sm};
  text-align: center;
  line-height: 1.3;

  @media (min-width: 480px) {
    font-size: 1.375rem;
  }

  @media (min-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
`;

const StepDescription = styled.p`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing.lg};
  line-height: 1.5;

  @media (min-width: 480px) {
    font-size: 0.9375rem;
  }

  @media (min-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing.lg};
  padding-top: ${(props) => props.theme.spacing.lg};
  border-top: 1px solid ${(props) => props.theme.colors.border};
  gap: ${(props) => props.theme.spacing.sm};
  flex-wrap: wrap;

  @media (min-width: 480px) {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    gap: ${(props) => props.theme.spacing.md};
  }

  @media (min-width: 768px) {
    margin-top: 2rem;
    padding-top: 2rem;
    flex-wrap: nowrap;
  }
`;

const StepProgress = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 0.75rem;
  order: 3;
  width: 100%;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing.sm};

  @media (min-width: 480px) {
    gap: 0.375rem;
    font-size: 0.8rem;
    order: 0;
    width: auto;
    margin-top: 0;
  }

  @media (min-width: 768px) {
    gap: 0.5rem;
    font-size: 0.875rem;
  }
`;

const ProgressBar = styled.div`
  width: 6rem;
  height: 0.1875rem;
  background: ${(props) => props.theme.colors.border};
  border-radius: 0.125rem;
  overflow: hidden;

  @media (min-width: 480px) {
    width: 7rem;
    height: 0.25rem;
  }

  @media (min-width: 768px) {
    width: 8rem;
  }
`;

const ProgressFill = styled.div<{ $progress: number }>`
  width: ${(props) => props.$progress}%;
  height: 100%;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary},
    ${(props) => props.theme.colors.secondary}
  );
  transition: width 0.3s ease;
`;

const ErrorMessage = styled.div`
  background: ${(props) => props.theme.colors.error}10;
  border: 1px solid ${(props) => props.theme.colors.error};
  color: ${(props) => props.theme.colors.error};
  padding: ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.md};
  margin-bottom: ${(props) => props.theme.spacing.md};
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.4;

  @media (min-width: 480px) {
    padding: 0.875rem;
    font-size: 0.9rem;
    margin-bottom: 1.25rem;
  }

  @media (min-width: 768px) {
    padding: 1rem;
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const BackButtonContainer = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.lg};

  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }
`;

interface Step {
  id: number;
  title: string;
  description: string;
  component: React.ComponentType<any>;
  validation: (data: any) => { isValid: boolean; errors: string[] };
}

const steps: Step[] = [
  {
    id: 1,
    title: "Informações Básicas",
    description: "Vamos começar com seus dados pessoais",
    component: BasicInfoStep,
    validation: (data: PreConsultationData) => {
      const errors: string[] = [];
      if (!data.name?.trim()) errors.push("Nome é obrigatório");
      if (!data.email?.trim()) errors.push("Email é obrigatório");
      if (!data.whatsApp?.trim()) errors.push("WhatsApp é obrigatório");
      if (!data.birthDate?.trim())
        errors.push("Data de nascimento é obrigatória");
      if (!data.gender?.trim()) errors.push("Gênero é obrigatório");
      return { isValid: errors.length === 0, errors };
    },
  },
  {
    id: 2,
    title: "Objetivos e Motivação",
    description: "Conte-nos sobre seus objetivos nutricionais",
    component: GoalsStep,
    validation: (data: PreConsultationData) => {
      const errors: string[] = [];
      if (!data.mainGoals?.length)
        errors.push("Selecione pelo menos um objetivo");
      if (!data.motivation?.trim()) errors.push("Motivação é obrigatória");
      return { isValid: errors.length === 0, errors };
    },
  },
  {
    id: 3,
    title: "Experiência e Hábitos",
    description: "Compartilhe sua experiência com nutrição",
    component: ExperienceStep,
    validation: (data: PreConsultationData) => {
      const errors: string[] = [];
      if (!data.previousExperience?.trim())
        errors.push("Experiência anterior é obrigatória");
      if (!data.currentDiet?.trim()) errors.push("Dieta atual é obrigatória");
      if (!data.mealFrequency?.trim())
        errors.push("Frequência de refeições é obrigatória");
      return { isValid: errors.length === 0, errors };
    },
  },
  {
    id: 4,
    title: "Agendamento",
    description: "Escolha o melhor horário para sua consulta",
    component: AppointmentStep,
    validation: (data: PreConsultationData) => {
      const errors: string[] = [];
      if (!data.consultationType?.trim())
        errors.push("Tipo de consulta é obrigatório");
      if (!data.preferredTime?.trim())
        errors.push("Horário preferido é obrigatório");
      return { isValid: errors.length === 0, errors };
    },
  },
];

interface AppointmentStepsProps {
  onComplete: (data: PreConsultationData) => void;
  onCancel: () => void;
}

const AppointmentSteps: React.FC<AppointmentStepsProps> = ({
  onComplete,
  onCancel,
}) => {
  const { user, isAuthenticated, login } = useAuth();
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState<PreConsultationData>(
    {} as PreConsultationData
  );

  // TODO: Implementar verificação se cliente é recorrente
  // const [isRecurringClient, setIsRecurringClient] = useState(false);
  // const [clientName, setClientName] = useState<string | undefined>();

  // Preencher automaticamente com dados do Google quando disponível
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || prev.name || "",
        email: user.email || prev.email || "",
        whatsApp: user.whatsapp || prev.whatsApp || "",
      }));
    }
  }, [isAuthenticated, user]);

  const handleStartForm = () => {
    setShowStartScreen(false);
  };

  const handleWhatsApp = (phone: string) => {
    // WhatsApp já abre no novo tab
    // Não precisa de lógica adicional
  };

  const handleBackToMenu = () => {
    setShowStartScreen(true);
    setCurrentStep(1);
    setCompletedSteps([]);
    setValidationErrors([]);
    setFormData({} as PreConsultationData);
  };

  const currentStepData = steps.find((step) => step.id === currentStep);
  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (!currentStepData) return;

    // Validação temporariamente desabilitada para navegação livre
    // const validation = currentStepData.validation(formData);

    // if (validation.isValid) {
    setValidationErrors([]);
    setCompletedSteps((prev) => [...prev, currentStep]);

    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete(formData);
    }
    // } else {
    //   setValidationErrors(validation.errors);
    // }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setValidationErrors([]);
    }
  };

  const handleStepClick = (stepId: number) => {
    // Navegação livre entre todas as etapas (validação desabilitada)
    setCurrentStep(stepId);
    setValidationErrors([]);
  };

  const handleFormDataChange = (data: Partial<PreConsultationData>) => {
    const newData = { ...formData, ...data };
    setFormData(newData);

    // Salvar WhatsApp no AuthContext se preenchido
    if (data.whatsApp && isAuthenticated && user) {
      const updatedUser = { ...user, whatsapp: data.whatsApp };
      login(updatedUser); // Salva no localStorage
    }
  };

  const isStepCompleted = (stepId: number) => completedSteps.includes(stepId);
  const isStepActive = (stepId: number) => stepId === currentStep;
  const canGoNext = currentStep < steps.length;
  const canGoPrevious = currentStep > 1;

  // Mostrar tela inicial de escolha
  if (showStartScreen) {
    return (
      <Container>
        <AppointmentStart
          onStartForm={handleStartForm}
          onWhatsApp={handleWhatsApp}
          // TODO: Implementar detecção de cliente recorrente
          // clientName={clientName}
          // isRecurring={isRecurringClient}
        />
      </Container>
    );
  }

  return (
    <Container>
      <StepsContainer>
        <BackButtonContainer>
          <StyledButton $variant="ghost" $size="sm" onClick={handleBackToMenu}>
            <ChevronLeft size={20} />
            Voltar ao Menu
          </StyledButton>
        </BackButtonContainer>

        <StepsHeader>
          <ProgressIndicator>
            <StepConnector $isCompleted={completedSteps.length > 0} />
            <StepWrapper>
              {steps.map((step) => (
                <StepIndicator
                  key={step.id}
                  $isActive={isStepActive(step.id)}
                  $isCompleted={isStepCompleted(step.id)}
                  onClick={() => handleStepClick(step.id)}
                >
                  <StepCircle
                    $isActive={isStepActive(step.id)}
                    $isCompleted={isStepCompleted(step.id)}
                  >
                    {isStepCompleted(step.id) ? <Check size={16} /> : step.id}
                  </StepCircle>
                  <StepLabel
                    $isActive={isStepActive(step.id)}
                    $isCompleted={isStepCompleted(step.id)}
                  >
                    {step.title}
                  </StepLabel>
                </StepIndicator>
              ))}
            </StepWrapper>
          </ProgressIndicator>
        </StepsHeader>

        <StepContent>
          <StepNavigation>
            <div>
              {canGoPrevious && (
                <StepNavButton
                  onClick={() => handleStepClick(Math.max(1, currentStep - 1))}
                >
                  <ChevronLeft size={16} />
                  Anterior
                </StepNavButton>
              )}
            </div>

            <StepInfo>
              <StepCounter>
                Etapa {currentStep} de {steps.length}
              </StepCounter>
            </StepInfo>

            <div>
              {canGoNext && (
                <StepNavButton
                  onClick={() =>
                    handleStepClick(Math.min(steps.length, currentStep + 1))
                  }
                >
                  Próximo
                  <ChevronRight size={16} />
                </StepNavButton>
              )}
            </div>
          </StepNavigation>

          <StepTitle>{currentStepData?.title}</StepTitle>
          <StepDescription>{currentStepData?.description}</StepDescription>

          {validationErrors.length > 0 && (
            <ErrorMessage>
              <strong>Por favor, corrija os seguintes campos:</strong>
              <ul style={{ margin: "0.5rem 0 0 1rem" }}>
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </ErrorMessage>
          )}

          {currentStepData?.component && (
            <currentStepData.component
              data={formData}
              onChange={handleFormDataChange}
              onComplete={onComplete}
              onCancel={onCancel}
            />
          )}

          <NavigationContainer>
            <div>
              {canGoPrevious && (
                <StyledButton
                  $variant="outline"
                  $size="md"
                  onClick={handlePrevious}
                >
                  <ChevronLeft size={20} />
                  Anterior
                </StyledButton>
              )}
            </div>

            <StepProgress>
              <ProgressBar>
                <ProgressFill $progress={progress} />
              </ProgressBar>
              <span>
                {currentStep} de {steps.length}
              </span>
            </StepProgress>

            <div>
              {canGoNext ? (
                <StyledButton
                  $variant="primary"
                  $size="md"
                  onClick={handleNext}
                >
                  Próximo
                  <ChevronRight size={20} />
                </StyledButton>
              ) : (
                <StyledButton
                  $variant="primary"
                  $size="md"
                  onClick={() => onComplete(formData)}
                >
                  Finalizar
                  <Check size={20} />
                </StyledButton>
              )}
            </div>
          </NavigationContainer>
        </StepContent>
      </StepsContainer>
    </Container>
  );
};

export default AppointmentSteps;
