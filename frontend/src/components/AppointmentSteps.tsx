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

  @media (min-width: 480px) {
    padding: ${(props) => props.theme.spacing.md};
  }

  @media (min-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const StepsHeader = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing.lg};
  overflow-x: auto;
  padding: ${(props) => props.theme.spacing.sm} 0;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) {
    margin-bottom: 3rem;
    overflow-x: visible;
  }
`;

const StepIndicator = styled.div<{ $isActive: boolean; $isCompleted: boolean }>`
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing.xs}
    ${(props) => props.theme.spacing.sm};
  margin: 0 ${(props) => props.theme.spacing.xs};
  border-radius: 1.5rem;
  background: ${(props) =>
    props.$isActive
      ? `linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.secondary})`
      : props.$isCompleted
      ? props.theme.colors.success
      : props.theme.colors.border};
  color: ${(props) =>
    props.$isActive || props.$isCompleted
      ? "white"
      : props.theme.colors.textSecondary};
  font-weight: 600;
  font-size: 0.75rem;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  flex-shrink: 0;
  min-width: fit-content;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  @media (min-width: 480px) {
    padding: 0.5rem 1rem;
    margin: 0 0.25rem;
    font-size: 0.8rem;
  }

  @media (min-width: 768px) {
    padding: 0.75rem 1.5rem;
    margin: 0 0.5rem;
    font-size: 0.875rem;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &::after {
    content: "";
    position: absolute;
    right: -1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 0.5rem;
    height: 0.5rem;
    background: ${(props) =>
      props.$isCompleted
        ? props.theme.colors.success
        : props.theme.colors.border};
    border-radius: 50%;
    display: ${(props) => (props.$isActive ? "none" : "block")};
  }

  &:last-child::after {
    display: none;
  }
`;

const StepNumber = styled.div<{ $isActive: boolean; $isCompleted: boolean }>`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background: ${(props) =>
    props.$isActive || props.$isCompleted
      ? "rgba(255, 255, 255, 0.3)"
      : props.theme.colors.background};
  color: ${(props) =>
    props.$isActive || props.$isCompleted
      ? "white"
      : props.theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.625rem;
  font-weight: 700;
  margin-right: ${(props) => props.theme.spacing.xs};
  flex-shrink: 0;

  @media (min-width: 480px) {
    width: 1.375rem;
    height: 1.375rem;
    font-size: 0.7rem;
    margin-right: 0.375rem;
  }

  @media (min-width: 768px) {
    width: 1.5rem;
    height: 1.5rem;
    font-size: 0.75rem;
    margin-right: 0.5rem;
  }
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
      console.log("Preenchendo formulário com dados do Google:", user);
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
          {steps.map((step) => (
            <StepIndicator
              key={step.id}
              $isActive={isStepActive(step.id)}
              $isCompleted={isStepCompleted(step.id)}
              onClick={() => handleStepClick(step.id)}
            >
              <StepNumber
                $isActive={isStepActive(step.id)}
                $isCompleted={isStepCompleted(step.id)}
              >
                {isStepCompleted(step.id) ? <Check size={12} /> : step.id}
              </StepNumber>
              {step.title}
            </StepIndicator>
          ))}
        </StepsHeader>

        <StepContent>
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
