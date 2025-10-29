import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Calendar, Clock, User, CheckCircle, AlertCircle } from "lucide-react";
import { format, isSameDay, isBefore, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { StyledButton, StyledCard, CardHeader, CardBody } from "./styled";
import { appointmentService } from "../services/api";
import { AvailableSlotDto } from "../types";

const SchedulerContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.sm};
  box-sizing: border-box;
  overflow-x: hidden; /* Previne overflow horizontal */

  @media (min-width: 480px) {
    padding: ${(props) => props.theme.spacing.md};
  }

  @media (min-width: 768px) {
    padding: ${(props) => props.theme.spacing.lg};
  }
`;

const SchedulerGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr; /* Mobile pequeno (320-479px) - 1 coluna */
  gap: ${(props) => props.theme.spacing.md}; /* Mobile pequeno - gap menor */

  @media (min-width: 480px) {
    gap: ${(props) =>
      props.theme.spacing.lg}; /* Mobile grande (480-767px) - gap médio */
  }

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr; /* Desktop (768px+) - 2 colunas */
    gap: ${(props) => props.theme.spacing.xl}; /* Desktop - gap maior */
  }
`;

const CalendarSection = styled.div`
  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${(props) =>
      props.theme.spacing.md}; /* Mobile first - margin menor */
    flex-direction: column; /* Mobile first - vertical */
    gap: ${(props) => props.theme.spacing.sm};

    @media (min-width: 768px) {
      flex-direction: row; /* Desktop - horizontal */
      margin-bottom: ${(props) =>
        props.theme.spacing.lg}; /* Desktop - margin maior */
    }
  }

  .calendar-nav {
    display: flex;
    gap: ${(props) => props.theme.spacing.sm};
  }

  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.0625rem; /* 1px */
    background-color: ${(props) => props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.md};
    overflow: hidden;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

  .calendar-day-header {
    background-color: ${(props) => props.theme.colors.primary};
    color: white;
    padding: ${(props) => props.theme.spacing.xs};
    text-align: center;
    font-weight: 600;
    font-size: 0.75rem;
    min-height: 1.75rem; /* 28px para mobile */
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

    @media (min-width: 480px) {
      padding: ${(props) => props.theme.spacing.sm};
      font-size: 0.875rem;
      min-height: 2rem; /* 32px para telas maiores */
    }
  }

  .calendar-day {
    background-color: ${(props) => props.theme.colors.background};
    padding: ${(props) => props.theme.spacing.xs};
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
    min-height: 2rem; /* 32px para mobile */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    box-sizing: border-box;
    overflow: hidden;

    @media (min-width: 480px) {
      padding: ${(props) => props.theme.spacing.sm};
      min-height: 2.5rem; /* 40px para telas maiores */
      font-size: 1rem;
    }

    &:hover {
      background-color: ${(props) => props.theme.colors.primary}20;
    }

    &.selected {
      background-color: ${(props) => props.theme.colors.primary};
      color: white;
    }

    &.disabled {
      background-color: ${(props) => props.theme.colors.border};
      color: ${(props) => props.theme.colors.textSecondary};
      cursor: not-allowed;
    }

    &.unavailable {
      background-color: ${(props) => props.theme.colors.error}20;
      color: ${(props) => props.theme.colors.error};
      cursor: not-allowed;
    }

    &.sabbat {
      background-color: ${(props) => props.theme.colors.textSecondary}20;
      color: ${(props) => props.theme.colors.textSecondary};
      cursor: not-allowed;
    }
  }
`;

const TimeSlotsSection = styled.div`
  .time-slots-header {
    margin-bottom: ${(props) =>
      props.theme.spacing.md}; /* Mobile first - margin menor */

    @media (min-width: 768px) {
      margin-bottom: ${(props) =>
        props.theme.spacing.lg}; /* Desktop - margin maior */
    }
  }

  .time-slots-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(100px, 1fr)
    ); /* Mobile first - colunas menores */
    gap: ${(props) => props.theme.spacing.sm};

    @media (min-width: 768px) {
      grid-template-columns: repeat(
        auto-fit,
        minmax(120px, 1fr)
      ); /* Desktop - colunas maiores */
    }
  }

  .time-slot {
    padding: ${(props) =>
      props.theme.spacing.xs}; /* Mobile first - padding menor */
    border: 0.125rem solid ${(props) => props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.md};
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
    background-color: ${(props) => props.theme.colors.background};
    font-size: 0.875rem; /* Mobile first - fonte menor */

    @media (min-width: 768px) {
      padding: ${(props) =>
        props.theme.spacing.sm}; /* Desktop - padding maior */
      font-size: 1rem; /* Desktop - fonte maior */
    }

    &:hover {
      border-color: ${(props) => props.theme.colors.primary};
      background-color: ${(props) => props.theme.colors.primary}10;
    }

    &.selected {
      border-color: ${(props) => props.theme.colors.primary};
      background-color: ${(props) => props.theme.colors.primary};
      color: white;
    }

    &.unavailable {
      border-color: ${(props) => props.theme.colors.error};
      background-color: ${(props) => props.theme.colors.error}20;
      color: ${(props) => props.theme.colors.error};
      cursor: not-allowed;
    }

    &.sabbat {
      border-color: ${(props) => props.theme.colors.textSecondary};
      background-color: ${(props) => props.theme.colors.textSecondary}20;
      color: ${(props) => props.theme.colors.textSecondary};
      cursor: not-allowed;
    }
  }
`;

const AppointmentSummary = styled(StyledCard)`
  margin-top: ${(props) => props.theme.spacing.lg};
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary}10,
    ${(props) => props.theme.colors.secondary}10
  );
`;

const SummaryItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  margin-bottom: ${(props) => props.theme.spacing.sm};

  svg {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const ErrorAlert = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  background-color: ${(props) => props.theme.colors.error}10;
  border: 0.0625rem solid ${(props) => props.theme.colors.error}30;
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  color: ${(props) => props.theme.colors.error};
`;

const SuccessAlert = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  background-color: ${(props) => props.theme.colors.success}10;
  border: 0.0625rem solid ${(props) => props.theme.colors.success}30;
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  color: ${(props) => props.theme.colors.success};
`;

interface AppointmentSchedulerProps {
  leadId: number;
  onAppointmentCreated?: (appointmentId: number) => void;
}

const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({
  leadId,
  onAppointmentCreated,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<AvailableSlotDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Generate calendar days for current month
  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const currentDate = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  // Check if date is available for scheduling
  const isDateAvailable = (date: Date) => {
    const dayOfWeek = date.getDay();
    const today = new Date();

    // Check if date is in the past
    if (isBefore(date, startOfDay(today))) {
      return false;
    }

    // Check Sabbat rules (Friday sunset to Saturday sunset)
    if (dayOfWeek === 5 || dayOfWeek === 6) {
      // Friday or Saturday
      return false;
    }

    // Check if it's Sunday (open hours)
    if (dayOfWeek === 0) {
      return true;
    }

    // Check if it's Monday to Thursday (17:00-22:00)
    if (dayOfWeek >= 1 && dayOfWeek <= 4) {
      return true;
    }

    return false;
  };

  // Get available time slots for selected date
  const getTimeSlotsForDate = (date: Date) => {
    const dayOfWeek = date.getDay();
    const slots = [];

    if (dayOfWeek === 0) {
      // Sunday - open hours
      for (let hour = 9; hour <= 21; hour++) {
        const timeString = `${hour.toString().padStart(2, "0")}:00`;
        const slotDate = new Date(date);
        slotDate.setHours(hour, 0, 0, 0);

        const isAvailable = availableSlots.some(
          (slot) =>
            isSameDay(new Date(slot.dateTime), date) &&
            slot.dateTime.includes(timeString) &&
            slot.available
        );

        slots.push({
          time: timeString,
          available: isAvailable,
          dateTime: slotDate.toISOString(),
        });
      }
    } else if (dayOfWeek >= 1 && dayOfWeek <= 4) {
      // Monday to Thursday - 17:00-22:00
      for (let hour = 17; hour <= 21; hour++) {
        const timeString = `${hour.toString().padStart(2, "0")}:00`;
        const slotDate = new Date(date);
        slotDate.setHours(hour, 0, 0, 0);

        const isAvailable = availableSlots.some(
          (slot) =>
            isSameDay(new Date(slot.dateTime), date) &&
            slot.dateTime.includes(timeString) &&
            slot.available
        );

        slots.push({
          time: timeString,
          available: isAvailable,
          dateTime: slotDate.toISOString(),
        });
      }
    }

    return slots;
  };

  // Load available slots for the month
  useEffect(() => {
    const loadAvailableSlots = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const startDate = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          1
        );
        const endDate = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth() + 1,
          0
        );

        const slots = await appointmentService.getAvailableSlots(
          startDate.toISOString(),
          endDate.toISOString()
        );

        setAvailableSlots(slots);
      } catch {
        setError("Erro ao carregar horários disponíveis. Tente novamente.");
      } finally {
        setIsLoading(false);
      }
    };

    loadAvailableSlots();
  }, [selectedDate]);

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    if (isDateAvailable(date)) {
      setSelectedDate(date);
      setSelectedTime(null);
    }
  };

  // Handle time selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  // Handle appointment creation
  const handleCreateAppointment = async () => {
    if (!selectedTime) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const appointmentDateTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(":").map(Number);
      appointmentDateTime.setHours(hours, minutes, 0, 0);

      const appointment = await appointmentService.reserveTimeSlot({
        leadId,
        dateTime: appointmentDateTime.toISOString(),
        observations: "",
      });

      setSuccess(
        "Agendamento criado com sucesso! Você receberá um link para pagamento em breve."
      );
      onAppointmentCreated?.(appointment.id);

      // Reset selection
      setSelectedTime(null);
    } catch {
      setError("Erro ao criar agendamento. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const calendarDays = generateCalendarDays(selectedDate);
  const timeSlots = getTimeSlotsForDate(selectedDate);
  const monthName = format(selectedDate, "MMMM yyyy", { locale: ptBR });

  return (
    <SchedulerContainer>
      <StyledCard variant="elevated">
        <CardHeader>
          <h2>Agendar Consulta</h2>
          <p>
            Selecione uma data e horário disponível para sua consulta online
          </p>
        </CardHeader>

        <CardBody>
          {error && (
            <ErrorAlert>
              <AlertCircle size={20} />
              {error}
            </ErrorAlert>
          )}

          {success && (
            <SuccessAlert>
              <CheckCircle size={20} />
              {success}
            </SuccessAlert>
          )}

          <SchedulerGrid>
            <CalendarSection>
              <div className="calendar-header">
                <h3>{monthName}</h3>
                <div className="calendar-nav">
                  <StyledButton
                    $variant="ghost"
                    $size="sm"
                    onClick={() =>
                      setSelectedDate(
                        new Date(
                          selectedDate.getFullYear(),
                          selectedDate.getMonth() - 1,
                          1
                        )
                      )
                    }
                  >
                    ←
                  </StyledButton>
                  <StyledButton
                    $variant="ghost"
                    $size="sm"
                    onClick={() =>
                      setSelectedDate(
                        new Date(
                          selectedDate.getFullYear(),
                          selectedDate.getMonth() + 1,
                          1
                        )
                      )
                    }
                  >
                    →
                  </StyledButton>
                </div>
              </div>

              <div className="calendar-grid">
                {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(
                  (day) => (
                    <div key={day} className="calendar-day-header">
                      {day}
                    </div>
                  )
                )}

                {calendarDays.map((day, index) => {
                  const isAvailable = isDateAvailable(day);
                  const isSelected = isSameDay(day, selectedDate);
                  const isCurrentMonth =
                    day.getMonth() === selectedDate.getMonth();
                  const isSabbat = day.getDay() === 5 || day.getDay() === 6;

                  return (
                    <div
                      key={index}
                      className={`calendar-day ${
                        !isCurrentMonth
                          ? "disabled"
                          : !isAvailable
                          ? "unavailable"
                          : isSabbat
                          ? "sabbat"
                          : isSelected
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => isAvailable && handleDateSelect(day)}
                    >
                      {day.getDate()}
                    </div>
                  );
                })}
              </div>
            </CalendarSection>

            <TimeSlotsSection>
              <div className="time-slots-header">
                <h3>Horários Disponíveis</h3>
                <p>
                  {format(selectedDate, "dd 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </p>
              </div>

              {timeSlots.length > 0 ? (
                <div className="time-slots-grid">
                  {timeSlots.map((slot, index) => (
                    <div
                      key={index}
                      className={`time-slot ${
                        !slot.available
                          ? "unavailable"
                          : selectedTime === slot.time
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        slot.available && handleTimeSelect(slot.time)
                      }
                    >
                      {slot.time}
                    </div>
                  ))}
                </div>
              ) : (
                <p>Nenhum horário disponível para esta data.</p>
              )}
            </TimeSlotsSection>
          </SchedulerGrid>

          {selectedTime && (
            <AppointmentSummary>
              <h3>Resumo do Agendamento</h3>
              <SummaryItem>
                <Calendar size={20} />
                <span>
                  {format(selectedDate, "dd 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </span>
              </SummaryItem>
              <SummaryItem>
                <Clock size={20} />
                <span>{selectedTime}</span>
              </SummaryItem>
              <SummaryItem>
                <User size={20} />
                <span>Consulta Online (1 hora)</span>
              </SummaryItem>

              <div style={{ marginTop: "1rem" }}>
                <StyledButton
                  $variant="primary"
                  $size="lg"
                  onClick={handleCreateAppointment}
                  $loading={isLoading}
                  $fullWidth
                >
                  Confirmar Agendamento
                </StyledButton>
              </div>
            </AppointmentSummary>
          )}
        </CardBody>
      </StyledCard>
    </SchedulerContainer>
  );
};

export default AppointmentScheduler;
