import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Calendar, Clock, MapPin, User, CheckCircle } from "lucide-react";
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

const AppointmentSummary = styled.div`
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary}10,
    ${(props) => props.theme.colors.secondary}10
  );
  border: 2px solid ${(props) => props.theme.colors.primary}30;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: 2rem;
  margin-bottom: 2rem;
`;

const SummaryTitle = styled.h3`
  color: ${(props) => props.theme.colors.text};
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const SummaryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: ${(props) => props.theme.colors.background};
  border-radius: ${(props) => props.theme.borderRadius.md};
  border: 1px solid ${(props) => props.theme.colors.border};
`;

const SummaryIcon = styled.div`
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  align-items: center;
`;

const SummaryContent = styled.div`
  flex: 1;
`;

const SummaryLabel = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.textSecondary};
  font-weight: 500;
`;

const SummaryValue = styled.div`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text};
  font-weight: 600;
  margin-top: 0.25rem;
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

const TimeSlotsContainer = styled.div`
  background: ${(props) => props.theme.colors.background};
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: 2rem;
  margin-bottom: 2rem;
`;

const TimeSlotsTitle = styled.h3`
  color: ${(props) => props.theme.colors.text};
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
`;

const TimeSlotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const TimeSlot = styled.button<{ $isSelected: boolean; $isAvailable: boolean }>`
  padding: 0.75rem 1rem;
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  cursor: ${(props) => (props.$isAvailable ? "pointer" : "not-allowed")};
  transition: all 0.2s ease;
  font-weight: 500;
  opacity: ${(props) => (props.$isAvailable ? 1 : 0.5)};

  &:hover {
    border-color: ${(props) =>
      props.$isAvailable
        ? props.theme.colors.primary
        : props.theme.colors.border};
    background: ${(props) =>
      props.$isAvailable
        ? `${props.theme.colors.primary}10`
        : props.theme.colors.background};
  }

  ${(props) =>
    props.$isSelected &&
    `
    background: linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.secondary});
    color: white;
    border-color: ${props.theme.colors.primary};
    box-shadow: 0 4px 12px ${props.theme.colors.primary}40;
  `}
`;

const ConsultationTypeContainer = styled.div`
  background: ${(props) => props.theme.colors.background};
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: 2rem;
  margin-bottom: 2rem;
`;

const ConsultationTypeTitle = styled.h3`
  color: ${(props) => props.theme.colors.text};
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
`;

const ConsultationTypeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ConsultationTypeCard = styled.button<{ $isSelected: boolean }>`
  padding: 1.5rem;
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.primary}05;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  ${(props) =>
    props.$isSelected &&
    `
    background: linear-gradient(135deg, ${props.theme.colors.primary}10, ${props.theme.colors.secondary}10);
    border-color: ${props.theme.colors.primary};
    box-shadow: 0 4px 12px ${props.theme.colors.primary}20;
  `}
`;

const ConsultationTypeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;

const ConsultationTypeIcon = styled.div`
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  align-items: center;
`;

const ConsultationTypeName = styled.h4`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
`;

const ConsultationTypeDescription = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.textSecondary};
  line-height: 1.5;
`;

const ConsultationTypePrice = styled.div`
  margin-top: 0.75rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.primary};
`;

const timeSlots = [
  { time: "17:00", available: true },
  { time: "18:00", available: true },
  { time: "19:00", available: true },
  { time: "20:00", available: true },
  { time: "21:00", available: true },
  { time: "22:00", available: true },
];

const consultationTypes = [
  {
    id: "primeira-consulta",
    name: "Primeira Consulta",
    description:
      "Avaliação completa, anamnese detalhada e plano alimentar personalizado",
    price: "R$ 150,00",
    duration: "60 minutos",
    icon: <User size={24} />,
  },
  {
    id: "retorno",
    name: "Consulta de Retorno",
    description: "Acompanhamento, ajustes no plano e orientações",
    price: "R$ 100,00",
    duration: "45 minutos",
    icon: <CheckCircle size={24} />,
  },
];

interface AppointmentStepProps {
  data: PreConsultationData;
  onChange: (data: Partial<PreConsultationData>) => void;
  onComplete: (data: PreConsultationData) => void;
  onCancel: () => void;
}

const AppointmentStep: React.FC<AppointmentStepProps> = ({
  data,
  onChange,
  onComplete,
  onCancel,
}) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(
    data.preferredTime || ""
  );
  const [selectedConsultationType, setSelectedConsultationType] = useState(
    data.consultationType || ""
  );
  const [additionalNotes, setAdditionalNotes] = useState(
    data.additionalNotes || ""
  );

  const handleTimeSlotSelect = (time: string) => {
    setSelectedTimeSlot(time);
    onChange({ preferredTime: time });
  };

  const handleConsultationTypeSelect = (type: string) => {
    setSelectedConsultationType(type);
    onChange({ consultationType: type });
  };

  const handleAdditionalNotesChange = (value: string) => {
    setAdditionalNotes(value);
    onChange({ additionalNotes: value });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Não informado";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const formatPhone = (phone: string) => {
    if (!phone) return "Não informado";
    const numbers = phone.replace(/\D/g, "");
    if (numbers.length === 13) {
      return `+${numbers.substring(0, 2)} (${numbers.substring(
        2,
        4
      )}) ${numbers.substring(4, 9)}-${numbers.substring(9)}`;
    }
    return phone;
  };

  return (
    <StepContainer>
      <AppointmentSummary>
        <SummaryTitle>
          <CheckCircle size={24} />
          Resumo da Sua Consulta
        </SummaryTitle>

        <SummaryGrid>
          <SummaryItem>
            <SummaryIcon>
              <User size={20} />
            </SummaryIcon>
            <SummaryContent>
              <SummaryLabel>Nome</SummaryLabel>
              <SummaryValue>{data.name || "Não informado"}</SummaryValue>
            </SummaryContent>
          </SummaryItem>

          <SummaryItem>
            <SummaryIcon>
              <Calendar size={20} />
            </SummaryIcon>
            <SummaryContent>
              <SummaryLabel>Data de Nascimento</SummaryLabel>
              <SummaryValue>{formatDate(data.birthDate)}</SummaryValue>
            </SummaryContent>
          </SummaryItem>

          <SummaryItem>
            <SummaryIcon>
              <Clock size={20} />
            </SummaryIcon>
            <SummaryContent>
              <SummaryLabel>WhatsApp</SummaryLabel>
              <SummaryValue>{formatPhone(data.whatsApp)}</SummaryValue>
            </SummaryContent>
          </SummaryItem>

          <SummaryItem>
            <SummaryIcon>
              <MapPin size={20} />
            </SummaryIcon>
            <SummaryContent>
              <SummaryLabel>Email</SummaryLabel>
              <SummaryValue>{data.email || "Não informado"}</SummaryValue>
            </SummaryContent>
          </SummaryItem>
        </SummaryGrid>
      </AppointmentSummary>

      <ConsultationTypeContainer>
        <ConsultationTypeTitle>Tipo de Consulta *</ConsultationTypeTitle>
        <ConsultationTypeGrid>
          {consultationTypes.map((type) => (
            <ConsultationTypeCard
              key={type.id}
              $isSelected={selectedConsultationType === type.id}
              onClick={() => handleConsultationTypeSelect(type.id)}
            >
              <ConsultationTypeHeader>
                <ConsultationTypeIcon>{type.icon}</ConsultationTypeIcon>
                <ConsultationTypeName>{type.name}</ConsultationTypeName>
              </ConsultationTypeHeader>
              <ConsultationTypeDescription>
                {type.description}
              </ConsultationTypeDescription>
              <ConsultationTypePrice>
                {type.price} - {type.duration}
              </ConsultationTypePrice>
            </ConsultationTypeCard>
          ))}
        </ConsultationTypeGrid>
      </ConsultationTypeContainer>

      <TimeSlotsContainer>
        <TimeSlotsTitle>Horário Preferido *</TimeSlotsTitle>
        <TimeSlotsGrid>
          {timeSlots.map((slot) => (
            <TimeSlot
              key={slot.time}
              $isSelected={selectedTimeSlot === slot.time}
              $isAvailable={slot.available}
              onClick={() => slot.available && handleTimeSlotSelect(slot.time)}
            >
              {slot.time}
            </TimeSlot>
          ))}
        </TimeSlotsGrid>
      </TimeSlotsContainer>

      <FormGrid>
        <FullWidthField>
          <InputGroup>
            <Label htmlFor="additionalNotes">Observações Adicionais</Label>
            <StyledTextarea
              id="additionalNotes"
              placeholder="Alguma informação adicional que gostaria de compartilhar com a nutricionista?"
              value={additionalNotes}
              onChange={(e) => handleAdditionalNotesChange(e.target.value)}
              rows={4}
            />
          </InputGroup>
        </FullWidthField>
      </FormGrid>
    </StepContainer>
  );
};

export default AppointmentStep;
