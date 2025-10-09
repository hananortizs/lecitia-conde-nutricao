import React, { useState } from "react";
import styled from "styled-components";
import { ArrowLeft, CheckCircle, User } from "lucide-react";
import {
  StyledButton,
  StyledCard,
  CardHeader,
  CardBody,
} from "../components/styled";
import BmiCalculator from "../components/BmiCalculator";
import AppointmentScheduler from "../components/AppointmentScheduler";
import type { BmiFormData, BmiClassification, CapturedLeadDto } from "../types";
import { leadService } from "../services/api";

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.lg};
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

const Step = styled.div<{ $active: boolean; $completed: boolean }>`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.lg};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  background-color: ${(props) =>
    props.$completed
      ? props.theme.colors.success
      : props.$active
      ? props.theme.colors.primary
      : props.theme.colors.border};
  color: ${(props) =>
    props.$completed || props.$active
      ? "white"
      : props.theme.colors.textSecondary};
  font-weight: 500;
  transition: all 0.3s ease;

  .step-number {
    width: 1.5rem; /* 24px */
    height: 1.5rem; /* 24px */
    border-radius: 50%;
    background-color: ${(props) =>
      props.$completed || props.$active
        ? "white"
        : props.theme.colors.textSecondary};
    color: ${(props) =>
      props.$completed
        ? props.theme.colors.success
        : props.$active
        ? props.theme.colors.primary
        : props.theme.colors.textSecondary};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    padding: ${(props) => props.theme.spacing.sm};
    font-size: 0.875rem;
  }
`;

const StepConnector = styled.div`
  width: 2.5rem; /* 40px */
  height: 0.125rem; /* 2px */
  background-color: ${(props) => props.theme.colors.border};
  margin: 0 ${(props) => props.theme.spacing.sm};

  @media (max-width: 768px) {
    width: 1.25rem; /* 20px */
  }
`;

const BackButton = styled(StyledButton)`
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing.xl};
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.success}10,
    ${(props) => props.theme.colors.primary}10
  );
  border-radius: ${(props) => props.theme.borderRadius.lg};
  margin-bottom: ${(props) => props.theme.spacing.lg};

  .success-icon {
    width: 5rem; /* 80px */
    height: 5rem; /* 80px */
    background-color: ${(props) => props.theme.colors.success};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${(props) => props.theme.spacing.lg};
    color: white;
  }

  h2 {
    color: ${(props) => props.theme.colors.success};
    margin-bottom: ${(props) => props.theme.spacing.md};
  }

  p {
    color: ${(props) => props.theme.colors.textSecondary};
    font-size: 1.125rem;
    line-height: 1.6;
  }
`;

const LeadInfo = styled(StyledCard)`
  margin-bottom: ${(props) => props.theme.spacing.lg};
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary}10,
    ${(props) => props.theme.colors.secondary}10
  );
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  margin-bottom: ${(props) => props.theme.spacing.sm};

  svg {
    color: ${(props) => props.theme.colors.primary};
  }

  .label {
    font-weight: 600;
    color: ${(props) => props.theme.colors.text};
  }

  .value {
    color: ${(props) => props.theme.colors.textSecondary};
  }
`;

type Step = "bmi" | "appointment" | "success";

interface AppointmentPageProps {
  onNavigate?: (path: string) => void;
  initialLeadId?: number;
}

const AppointmentPage: React.FC<AppointmentPageProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState<Step>("bmi");
  const [capturedLead, setCapturedLead] = useState<CapturedLeadDto | null>(
    null
  );
  const [appointmentId, setAppointmentId] = useState<number | null>(null);

  const handleBmiCalculate = async (
    data: BmiFormData,
    bmi: number,
    classification: BmiClassification
  ) => {
    try {
      const leadData = {
        name: data.name,
        email: data.email,
        whatsApp: data.whatsApp,
        weight: parseFloat(data.weight),
        height: parseFloat(data.height),
        bmi: bmi,
        bmiClassification: classification,
      };

      const lead = await leadService.captureLead(leadData);
      setCapturedLead(lead);
      setCurrentStep("appointment");
    } catch (error) {
      console.error("Erro ao capturar lead:", error);
      alert("Erro ao processar seus dados. Tente novamente.");
    }
  };

  const handleAppointmentCreated = (appointmentId: number) => {
    setAppointmentId(appointmentId);
    setCurrentStep("success");
  };

  const handleBack = () => {
    if (currentStep === "appointment") {
      setCurrentStep("bmi");
    } else if (currentStep === "success") {
      setCurrentStep("appointment");
    } else {
      onNavigate?.("/");
    }
  };

  const handleStartOver = () => {
    setCurrentStep("bmi");
    setCapturedLead(null);
    setAppointmentId(null);
  };

  const renderStepIndicator = () => (
    <StepIndicator>
      <Step
        $active={currentStep === "bmi"}
        $completed={currentStep === "appointment" || currentStep === "success"}
      >
        <div className="step-number">1</div>
        <span>Calcular IMC</span>
      </Step>
      <StepConnector />
      <Step
        $active={currentStep === "appointment"}
        $completed={currentStep === "success"}
      >
        <div className="step-number">2</div>
        <span>Agendar Consulta</span>
      </Step>
      <StepConnector />
      <Step $active={currentStep === "success"} $completed={false}>
        <div className="step-number">3</div>
        <span>Confirmação</span>
      </Step>
    </StepIndicator>
  );

  const renderContent = () => {
    switch (currentStep) {
      case "bmi":
        return (
          <BmiCalculator
            onCalculate={handleBmiCalculate}
            initialData={
              capturedLead
                ? {
                    name: capturedLead.name,
                    email: capturedLead.email,
                    whatsApp: capturedLead.whatsApp,
                    weight: capturedLead.bmi.toString(), // Using BMI as weight for display
                    height: "1.70", // Default height for display
                  }
                : undefined
            }
          />
        );

      case "appointment":
        return (
          <>
            {capturedLead && (
              <LeadInfo>
                <CardHeader>
                  <h3>Seus Dados</h3>
                </CardHeader>
                <CardBody>
                  <InfoItem>
                    <User size={20} />
                    <span className="label">Nome:</span>
                    <span className="value">{capturedLead.name}</span>
                  </InfoItem>
                  <InfoItem>
                    <User size={20} />
                    <span className="label">E-mail:</span>
                    <span className="value">{capturedLead.email}</span>
                  </InfoItem>
                  <InfoItem>
                    <User size={20} />
                    <span className="label">WhatsApp:</span>
                    <span className="value">{capturedLead.whatsApp}</span>
                  </InfoItem>
                  <InfoItem>
                    <User size={20} />
                    <span className="label">IMC:</span>
                    <span className="value">
                      {capturedLead.bmi.toFixed(1)} -{" "}
                      {capturedLead.bmiClassification}
                    </span>
                  </InfoItem>
                </CardBody>
              </LeadInfo>
            )}
            <AppointmentScheduler
              leadId={capturedLead?.id || 0}
              onAppointmentCreated={handleAppointmentCreated}
            />
          </>
        );

      case "success":
        return (
          <>
            <SuccessMessage>
              <div className="success-icon">
                <CheckCircle size={40} />
              </div>
              <h2>Agendamento Confirmado!</h2>
              <p>
                Sua consulta foi agendada com sucesso. Você receberá um link
                para pagamento em breve e, após a confirmação, o link da sala
                virtual será enviado.
              </p>
            </SuccessMessage>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <StyledButton
                $variant="primary"
                onClick={() => onNavigate?.("/")}
              >
                Voltar ao Início
              </StyledButton>
              <StyledButton $variant="outline" onClick={handleStartOver}>
                Agendar Nova Consulta
              </StyledButton>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <PageContainer>
      <BackButton $variant="ghost" onClick={handleBack}>
        <ArrowLeft size={20} />
        Voltar
      </BackButton>

      {renderStepIndicator()}

      {renderContent()}
    </PageContainer>
  );
};

export default AppointmentPage;
