import React, { useState } from "react";
import styled from "styled-components";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  format,
  addDays,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameDay,
  isToday,
  isBefore,
  setHours,
  setMinutes,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { StyledButton } from "../styled/Button";
import { StyledTextarea, InputGroup, Label } from "../styled/Input";
import type { PreConsultationData } from "../../types";

const StepContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
`;

const CalendarSection = styled.div`
  background: ${(props) => props.theme.colors.background};
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: 1rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  @media (min-width: 480px) {
    padding: 1.5rem;
  }
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const CalendarTitle = styled.h3`
  color: ${(props) => props.theme.colors.text};
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  margin: 0;

  @media (min-width: 480px) {
    font-size: 1.125rem;
    text-align: left;
  }
`;

const CalendarNav = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  @media (min-width: 480px) {
    width: auto;
    justify-content: flex-end;
  }
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
`;

const CalendarDayHeader = styled.div`
  padding: 0.25rem;
  text-align: center;
  font-weight: 600;
  font-size: 0.7rem;
  color: ${(props) => props.theme.colors.textSecondary};
  box-sizing: border-box;

  @media (min-width: 480px) {
    padding: 0.5rem;
    font-size: 0.75rem;
  }
`;

const CalendarDayButton = styled.button<{
  $isSelected: boolean;
  $isToday: boolean;
  $isDisabled: boolean;
  $isOtherMonth: boolean;
}>`
  padding: 0.25rem;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.md};
  background: ${(props) =>
    props.$isSelected
      ? `linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.secondary})`
      : props.$isToday
      ? `${props.theme.colors.primary}10`
      : "transparent"};
  color: ${(props) =>
    props.$isSelected
      ? "white"
      : props.$isToday
      ? props.theme.colors.primary
      : props.$isOtherMonth
      ? props.theme.colors.textSecondary
      : props.theme.colors.text};
  font-weight: ${(props) => (props.$isSelected || props.$isToday ? 700 : 500)};
  cursor: ${(props) => (props.$isDisabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  opacity: ${(props) => (props.$isDisabled ? 0.5 : 1)};
  font-size: 0.75rem;
  min-height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  @media (min-width: 480px) {
    padding: 0.5rem;
    font-size: 0.875rem;
    min-height: 2.5rem;
  }

  @media (min-width: 768px) {
    padding: 0.75rem;
    font-size: 1rem;
    min-height: 3rem;
  }

  &:hover {
    ${(props) =>
      !props.$isDisabled &&
      `
      background: ${
        props.$isSelected
          ? `linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.secondary})`
          : `${props.theme.colors.primary}20`
      };
    `}
  }
`;

const AppointmentSummary = styled.div`
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary}10,
    ${(props) => props.theme.colors.secondary}10
  );
  border: 2px solid ${(props) => props.theme.colors.primary}30;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: 1rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  @media (min-width: 480px) {
    padding: 2rem;
  }
`;

const SummaryTitle = styled.h3`
  color: ${(props) => props.theme.colors.text};
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;

  @media (min-width: 480px) {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`;

const SummaryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: ${(props) => props.theme.colors.background};
  border-radius: ${(props) => props.theme.borderRadius.md};
  border: 1px solid ${(props) => props.theme.colors.border};
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  min-width: 0;

  @media (min-width: 480px) {
    gap: 0.75rem;
    padding: 0.75rem;
  }
`;

const SummaryIcon = styled.div`
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  align-items: center;
  flex-shrink: 0;
  font-size: 1rem;

  @media (min-width: 480px) {
    font-size: 1.25rem;
  }
`;

const SummaryContent = styled.div`
  flex: 1;
  min-width: 0;
  overflow: hidden;
`;

const SummaryLabel = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.textSecondary};
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: 480px) {
    font-size: 0.875rem;
  }
`;

const SummaryValue = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.text};
  font-weight: 600;
  margin-top: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: 480px) {
    font-size: 1rem;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

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
  padding: 1rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  @media (min-width: 480px) {
    padding: 2rem;
  }
`;

const TimeSlotsTitle = styled.h3`
  color: ${(props) => props.theme.colors.text};
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;

  @media (min-width: 480px) {
    font-size: 1.25rem;
  }
`;

const TimeSlotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
`;

const TimeSlot = styled.button<{ $isSelected: boolean; $isAvailable: boolean }>`
  padding: 0.5rem 0.25rem;
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  cursor: ${(props) => (props.$isAvailable ? "pointer" : "not-allowed")};
  transition: all 0.2s ease;
  font-weight: 500;
  opacity: ${(props) => (props.$isAvailable ? 1 : 0.5)};
  font-size: 0.75rem;
  text-align: center;
  box-sizing: border-box;
  min-height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 480px) {
    padding: 0.75rem 0.5rem;
    font-size: 0.875rem;
    min-height: 2.5rem;
  }

  @media (min-width: 768px) {
    padding: 0.75rem 1rem;
    font-size: 1rem;
    min-height: 3rem;
  }

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
  padding: 1rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  @media (min-width: 480px) {
    padding: 2rem;
  }
`;

const ConsultationTypeTitle = styled.h3`
  color: ${(props) => props.theme.colors.text};
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;

  @media (min-width: 480px) {
    font-size: 1.25rem;
  }
`;

const ConsultationTypeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
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
    duration: "30 a 90 minutos",
    icon: <User size={24} />,
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
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(
    data.preferredTime || ""
  );
  const [selectedConsultationType, setSelectedConsultationType] = useState(
    data.consultationType || ""
  );
  const [additionalNotes, setAdditionalNotes] = useState(
    data.additionalNotes || ""
  );
  const [availableTimeSlots] = useState(timeSlots);

  // Gerar calendário para o mês atual
  const getCalendarDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
      calendarDays.push(currentDate);
      currentDate = addDays(currentDate, 1);
    }

    return calendarDays;
  };

  const handleDateSelect = (date: Date) => {
    // Não permitir selecionar datas passadas
    if (isBefore(date, new Date()) && !isSameDay(date, new Date())) {
      return;
    }
    setSelectedDate(date);
    setSelectedTimeSlot(""); // Limpar horário ao trocar data
  };

  const handleMonthChange = (direction: "prev" | "next") => {
    setCurrentMonth((prev) =>
      direction === "next" ? addMonths(prev, 1) : subMonths(prev, 1)
    );
  };

  const handleTimeSlotSelect = (time: string) => {
    setSelectedTimeSlot(time);
    if (selectedDate) {
      // Combinar data + horário
      const selectedDateTime = setHours(
        setMinutes(selectedDate, parseInt(time.split(":")[1])),
        parseInt(time.split(":")[0])
      );
      onChange({
        preferredTime: format(selectedDateTime, "yyyy-MM-dd'T'HH:mm"),
      });
    }
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

      <CalendarSection>
        <CalendarHeader>
          <CalendarTitle>
            Selecione a Data * -{" "}
            {format(currentMonth, "MMMM 'de' yyyy", { locale: ptBR })}
          </CalendarTitle>
          <CalendarNav>
            <StyledButton
              $variant="ghost"
              $size="sm"
              onClick={() => handleMonthChange("prev")}
            >
              <ChevronLeft size={20} />
            </StyledButton>
            <StyledButton
              $variant="ghost"
              $size="sm"
              onClick={() => handleMonthChange("next")}
            >
              <ChevronRight size={20} />
            </StyledButton>
          </CalendarNav>
        </CalendarHeader>
        <CalendarGrid>
          {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
            <CalendarDayHeader key={day}>{day}</CalendarDayHeader>
          ))}
          {getCalendarDays().map((date) => {
            const isOtherMonth = date.getMonth() !== currentMonth.getMonth();
            const isSelected = selectedDate
              ? isSameDay(date, selectedDate)
              : false;
            const isTodayDate = isToday(date);
            const isDisabled =
              isBefore(date, new Date()) && !isSameDay(date, new Date());

            return (
              <CalendarDayButton
                key={date.toISOString()}
                $isSelected={isSelected}
                $isToday={isTodayDate}
                $isDisabled={isDisabled}
                $isOtherMonth={isOtherMonth}
                onClick={() => handleDateSelect(date)}
                disabled={isDisabled}
              >
                {format(date, "d")}
              </CalendarDayButton>
            );
          })}
        </CalendarGrid>
        {selectedDate && (
          <div
            style={{
              marginTop: "1rem",
              textAlign: "center",
              color: "var(--primary)",
              fontWeight: 600,
            }}
          >
            📅 Data selecionada:{" "}
            {format(selectedDate, "dd/MM/yyyy", { locale: ptBR })}
          </div>
        )}
      </CalendarSection>

      {selectedDate && (
        <TimeSlotsContainer>
          <TimeSlotsTitle>Selecione o Horário *</TimeSlotsTitle>
          <TimeSlotsGrid>
            {availableTimeSlots.map((slot) => (
              <TimeSlot
                key={slot.time}
                $isSelected={selectedTimeSlot === slot.time}
                $isAvailable={slot.available}
                onClick={() =>
                  slot.available && handleTimeSlotSelect(slot.time)
                }
              >
                {slot.time}
              </TimeSlot>
            ))}
          </TimeSlotsGrid>
          {!selectedTimeSlot && (
            <div
              style={{
                textAlign: "center",
                color: "var(--text-secondary)",
                marginTop: "1rem",
              }}
            >
              Selecione um horário disponível
            </div>
          )}
        </TimeSlotsContainer>
      )}

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
