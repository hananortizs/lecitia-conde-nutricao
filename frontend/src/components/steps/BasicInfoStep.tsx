import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Calendar, ChevronUp, ChevronDown } from "lucide-react";
import { StyledButton } from "../styled/Button";
import { StyledInput, InputGroup, Label } from "../styled/Input";
import PhoneInput from "../styled/PhoneInput";
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

const GenderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const GenderLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.primary}05;
  }

  input[type="radio"] {
    margin-right: 0.75rem;
    accent-color: ${(props) => props.theme.colors.primary};
  }

  input[type="text"] {
    margin-left: 0.75rem;
    padding: 0.5rem;
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.sm};
    background: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    font-size: 0.875rem;
    width: 100%;
    max-width: 200px;

    &:focus {
      outline: none;
      border-color: ${(props) => props.theme.colors.primary};
    }
  }
`;

const DateInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const CustomDateInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  padding-right: 3rem;
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  font-size: 1rem;
  cursor: text;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.primary}20;
  }

  &:hover:not(:disabled) {
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

const CalendarIcon = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  padding: 0.25rem;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.colors.primary}10;
    color: ${(props) => props.theme.colors.primary};
  }
`;

const SequentialCalendar = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${(props) => props.theme.colors.background};
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  margin-top: 0.5rem;
  display: ${(props) => (props.$isOpen ? "block" : "none")};
  min-height: 20rem;
  max-height: 25rem;
  overflow: hidden;
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary}10,
    ${(props) => props.theme.colors.secondary}10
  );
`;

const ResetButtonContainer = styled.div`
  order: 1;
`;

const CalendarTitleContainer = styled.div`
  order: 2;
  flex: 1;
  text-align: center;
`;

const NavigationArrows = styled.div`
  order: 3;
  display: flex;
  gap: 0.5rem;
`;

const ResetButton = styled.button`
  background: ${(props) => props.theme.colors.error};
  color: white;
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.colors.error}80;
    transform: scale(1.1);
  }
`;

const CalendarTitle = styled.h3`
  margin: 0;
  color: ${(props) => props.theme.colors.text};
  font-size: 1.125rem;
  font-weight: 600;
`;

const ArrowButton = styled.button<{ $disabled?: boolean }>`
  background: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
  filter: ${(props) => (props.$disabled ? "grayscale(100%)" : "none")};
  pointer-events: ${(props) => (props.$disabled ? "none" : "auto")};

  &:hover:not(:disabled) {
    background: ${(props) => props.theme.colors.secondary};
    transform: scale(1.1);
  }
`;

const CalendarContent = styled.div`
  padding: 1rem;
  max-height: 18rem;
  overflow-y: auto;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const MonthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.125rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: ${(props) => props.theme.colors.background};
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  max-height: 12rem;
  overflow-y: auto;
`;

const MonthItem = styled.div<{ $isSelected: boolean; $isNextYear?: boolean }>`
  padding: 0.5rem 0.25rem;
  text-align: center;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 400;
  transition: all 0.1s ease;
  background: ${(props) =>
    props.$isSelected ? props.theme.colors.primary : "transparent"};
  color: ${(props) =>
    props.$isSelected
      ? props.theme.colors.background
      : props.$isNextYear
      ? props.theme.colors.textSecondary
      : props.theme.colors.text};
  border: none;
  min-height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  opacity: ${(props) => (props.$isNextYear ? 0.6 : 1)};

  &:hover {
    background: ${(props) =>
      props.$isSelected
        ? props.theme.colors.primary
        : props.theme.colors.primary}20;
    color: ${(props) =>
      props.$isSelected
        ? props.theme.colors.background
        : props.theme.colors.primary};
    opacity: 1;
  }

  &:active {
    background: ${(props) =>
      props.$isSelected
        ? props.theme.colors.primary
        : props.theme.colors.primary}30;
  }
`;

const DayName = styled.div`
  text-align: center;
  font-weight: 600;
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  padding: 0.5rem 0;
`;

const CalendarItem = styled.button<{ $isSelected?: boolean }>`
  padding: 0.75rem;
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  min-height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.primary}10;
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

const DayItem = styled.div<{ $isSelected: boolean }>`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 400;
  transition: all 0.15s ease;
  border-radius: 50%;
  position: relative;
  color: ${(props) =>
    props.$isSelected
      ? props.theme.colors.background
      : props.theme.colors.text};

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    background: ${(props) => props.theme.colors.primary};
    border-radius: 50%;
    transition: all 0.15s ease;
    opacity: 0;
  }

  &:hover::before {
    width: 2rem;
    height: 2rem;
    opacity: 0.2;
  }

  &:hover {
    color: ${(props) => props.theme.colors.text};
    z-index: 1;
  }

  ${(props) =>
    props.$isSelected &&
    `
    &::before {
      width: 2rem;
      height: 2rem;
      opacity: 0.5;
    }
    color: ${props.theme.colors.text};
    z-index: 1;
  `}
`;

const YearList = styled.div`
  max-height: 12rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const YearItem = styled.button<{ $isSelected?: boolean }>`
  padding: 0.75rem 1rem;
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  text-align: left;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.primary}10;
  }

  ${(props) =>
    props.$isSelected &&
    `
    background: linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.secondary});
    color: white;
    border-color: ${props.theme.colors.primary};
  `}
`;

const genderOptions = [
  { value: "masculino", label: "Masculino" },
  { value: "feminino", label: "Feminino" },
  { value: "nao-binario", label: "Não-binário" },
  { value: "agenero", label: "Agênero" },
  { value: "outro", label: "Outro" },
  { value: "prefiro-nao-informar", label: "Prefiro não informar" },
];

interface BasicInfoStepProps {
  data: PreConsultationData;
  onChange: (data: Partial<PreConsultationData>) => void;
  onComplete: (data: PreConsultationData) => void;
  onCancel: () => void;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
  data,
  onChange,
  onComplete,
  onCancel,
}) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PreConsultationData>({
    mode: "onSubmit",
    defaultValues: data,
  });

  // Calendar state
  const getCurrentYear = () => new Date().getFullYear();
  const getCurrentMonth = () => new Date().getMonth();
  const getCurrentDay = () => new Date().getDate();

  // Função para obter o ano de 18 anos atrás (maioridade)
  const getAdultYear = () => new Date().getFullYear() - 18;

  const [calendarStep, setCalendarStep] = useState<"year" | "month" | "day">(
    "year"
  );
  const [selectedYear, setSelectedYear] = useState<number | null>(
    getAdultYear()
  );
  const [selectedMonth, setSelectedMonth] = useState<number | null>(0);
  const [selectedDay, setSelectedDay] = useState<number | null>(1);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [selectedGender, setSelectedGender] = useState(data.gender || "");
  const [genderOther, setGenderOther] = useState(data.genderOther || "");
  const [inputValue, setInputValue] = useState("");

  // Sincroniza o input com os dados iniciais
  useEffect(() => {
    if (data.birthDate && !inputValue) {
      const formatted = data.birthDate.split("-").reverse().join("/");
      setInputValue(formatted);
    }
  }, [data.birthDate, inputValue]);

  // Calendar functions
  const toggleCalendar = () => {
    if (isCalendarOpen) {
      closeCalendar();
    } else {
      openCalendar();
    }
  };

  const closeCalendar = () => {
    setIsCalendarOpen(false);
  };

  const setDefaultDate = () => {
    const year = getAdultYear();
    const month = 1;
    const day = 1;
    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    setValue("birthDate", formattedDate);
    onChange({ birthDate: formattedDate });
  };

  const openCalendar = () => {
    setIsCalendarOpen(true);
    setCalendarStep("year");

    // Se há uma data no input, usa ela; senão usa a data atual
    if (inputValue && inputValue.length === 10) {
      const numbers = inputValue.replace(/\D/g, "");
      if (numbers.length === 8) {
        const day = parseInt(numbers.substring(0, 2), 10);
        const month = parseInt(numbers.substring(2, 4), 10);
        const year = parseInt(numbers.substring(4, 8), 10);

        // Valida se a data é válida antes de usar
        if (
          isValidDate(
            numbers.substring(0, 2),
            numbers.substring(2, 4),
            numbers.substring(4, 8)
          )
        ) {
          setSelectedYear(year);
          setSelectedMonth(month - 1); // Mês é 0-indexado
          setSelectedDay(day);
        } else {
          // Se a data não é válida, usa o ano de 18 anos atrás
          setSelectedYear(getAdultYear());
          setSelectedMonth(0);
          setSelectedDay(1);
        }
      } else {
        // Se não tem 8 dígitos, usa o ano de 18 anos atrás
        setSelectedYear(getAdultYear());
        setSelectedMonth(0);
        setSelectedDay(1);
      }
    } else {
      // Se não há data no input, usa o ano de 18 anos atrás
      setSelectedYear(getAdultYear());
      setSelectedMonth(0);
      setSelectedDay(1);
    }
  };

  const resetCalendar = () => {
    setCalendarStep("year");
    setSelectedYear(getAdultYear());
    setSelectedMonth(0);
    setSelectedDay(1);
    setInputValue("");
    setValue("birthDate", "");
    onChange({ birthDate: "" });
  };

  const handleYearSelect = (year: number) => {
    const currentYear = getCurrentYear();
    const adultYear = getAdultYear();

    // Só permite selecionar anos que resultem em maior de idade
    if (year <= adultYear) {
      setSelectedYear(year);
      setCalendarStep("month");
    }
  };

  const handleMonthSelect = (monthIndex: number, year: number) => {
    if (!selectedYear) return;

    if (year === selectedYear) {
      // Mês do ano atual
      setSelectedMonth(monthIndex);
      setCalendarStep("day");
    } else if (year === selectedYear + 1) {
      // Mês do ano seguinte - muda para o ano seguinte
      setSelectedYear(year);
      setSelectedMonth(monthIndex);
      setCalendarStep("day");
    }
  };

  const handleDaySelect = (day: number) => {
    if (selectedYear && selectedMonth !== null) {
      const year = selectedYear;
      const month = selectedMonth + 1;
      const dayStr = day.toString().padStart(2, "0");
      const monthStr = month.toString().padStart(2, "0");

      // Valida se a data final resulta em maior de idade
      if (isValidDate(dayStr, monthStr, year.toString())) {
        setSelectedDay(day);
        const formattedDate = `${year}-${monthStr}-${dayStr}`;
        setValue("birthDate", formattedDate);
        onChange({ birthDate: formattedDate });

        // Atualiza o input com a data selecionada
        setInputValue(`${dayStr}/${monthStr}/${year}`);

        closeCalendar();
      }
    }
  };

  const navigateUp = () => {
    if (calendarStep === "month") {
      setCalendarStep("year");
      setSelectedMonth(null);
    } else if (calendarStep === "day") {
      setCalendarStep("month");
    }
  };

  const navigateDown = () => {
    if (calendarStep === "year" && selectedYear !== null) {
      setCalendarStep("month");
      if (selectedMonth === 0) {
        setCalendarStep("day");
      }
    } else if (calendarStep === "month" && selectedMonth !== null) {
      setCalendarStep("day");
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

  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const getDaysInMonth = (year: number, month: number) => {
    const totalDays = new Date(year, month + 1, 0).getDate();
    const currentYear = getCurrentYear();
    const adultYear = getAdultYear();

    // Se o ano é anterior ao ano de 18 anos atrás, retorna todos os dias
    if (year < adultYear) {
      return totalDays;
    }

    // Se é o ano de 18 anos atrás, precisa verificar o mês e dia
    if (year === adultYear) {
      const currentDate = new Date();
      const currentDay = currentDate.getDate();
      const currentMonth = currentDate.getMonth();

      // Se estamos no mesmo mês e ano, só permite dias até hoje
      if (month === currentMonth && currentDate.getFullYear() === adultYear) {
        return Math.min(totalDays, currentDay);
      }

      // Se o mês é anterior ao atual, permite todos os dias
      if (month < currentMonth) {
        return totalDays;
      }

      // Se o mês é posterior ao atual, não permite nenhum dia
      if (month > currentMonth) {
        return 0;
      }
    }

    // Se o ano é posterior ao ano de 18 anos atrás, não permite nenhum dia
    return 0;
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const generateYears = () => {
    const currentYear = getCurrentYear();
    const adultYear = getAdultYear(); // Ano de 18 anos atrás
    const years = [];
    // Só mostra anos até o ano de 18 anos atrás (inclusive)
    for (let year = adultYear; year >= currentYear - 120; year--) {
      years.push(year);
    }
    return years;
  };

  const generateMonthsWithNextYear = () => {
    if (!selectedYear) return [];

    const currentYearMonths = months.map((month, index) => ({
      name: month,
      index: index,
      year: selectedYear,
      isNextYear: false,
    }));

    // Adiciona os 4 primeiros meses do ano seguinte
    const nextYearMonths = months.slice(0, 4).map((month, index) => ({
      name: month,
      index: index,
      year: selectedYear + 1,
      isNextYear: true,
    }));

    return [...currentYearMonths, ...nextYearMonths];
  };

  const handleGenderChange = (value: string) => {
    setSelectedGender(value);
    onChange({ gender: value });
  };

  const handleGenderOtherChange = (value: string) => {
    setGenderOther(value);
    onChange({ genderOther: value });
  };

  const handleInputChange = (
    field: keyof PreConsultationData,
    value: string
  ) => {
    setValue(field, value);
    onChange({ [field]: value });
  };

  // Função para formatar data digitada
  const formatDateInput = (value: string): string => {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, "");

    // Aplica a formatação baseada no tamanho
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 4) {
      return `${numbers.substring(0, 2)}/${numbers.substring(2)}`;
    } else if (numbers.length <= 8) {
      return `${numbers.substring(0, 2)}/${numbers.substring(
        2,
        4
      )}/${numbers.substring(4)}`;
    } else {
      // Limita a 8 dígitos (DDMMAAAA)
      return `${numbers.substring(0, 2)}/${numbers.substring(
        2,
        4
      )}/${numbers.substring(4, 8)}`;
    }
  };

  // Função para converter data formatada para YYYY-MM-DD
  const parseFormattedDate = (formattedDate: string): string => {
    const numbers = formattedDate.replace(/\D/g, "");
    if (numbers.length === 8) {
      const day = numbers.substring(0, 2);
      const month = numbers.substring(2, 4);
      const year = numbers.substring(4, 8);
      return `${year}-${month}-${day}`;
    }
    return "";
  };

  // Função para validar data
  const isValidDate = (day: string, month: string, year: string): boolean => {
    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);
    const currentYear = new Date().getFullYear();
    const adultYear = currentYear - 18;

    if (d < 1 || d > 31 || m < 1 || m > 12 || y < 1900 || y > currentYear) {
      return false;
    }

    const date = new Date(y, m - 1, d);
    const isValidDateObj =
      date.getDate() === d &&
      date.getMonth() === m - 1 &&
      date.getFullYear() === y;

    // Verifica se a pessoa tem pelo menos 18 anos
    const isAdult = y <= adultYear;

    return isValidDateObj && isAdult;
  };

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatDateInput(value);
    setInputValue(formatted);

    // Se a data estiver completa e válida, atualiza o formulário e sincroniza o calendário
    if (formatted.length === 10) {
      const numbers = formatted.replace(/\D/g, "");
      if (numbers.length === 8) {
        const day = numbers.substring(0, 2);
        const month = numbers.substring(2, 4);
        const year = numbers.substring(4, 8);

        if (isValidDate(day, month, year)) {
          const isoDate = parseFormattedDate(formatted);
          setValue("birthDate", isoDate);
          onChange({ birthDate: isoDate });

          // Sincroniza o calendário com a data digitada
          setSelectedYear(parseInt(year, 10));
          setSelectedMonth(parseInt(month, 10) - 1); // Mês é 0-indexado
          setSelectedDay(parseInt(day, 10));
        } else {
          // Se a data não é válida (incluindo menor de idade), limpa o campo
          setValue("birthDate", "");
          onChange({ birthDate: "" });
        }
      }
    }
  };

  const handleDateInputFocus = () => {
    if (!inputValue && watch("birthDate")) {
      // Se há uma data selecionada via calendário, converte para formato de exibição
      const dateStr = watch("birthDate");
      if (dateStr) {
        const formatted = dateStr.split("-").reverse().join("/");
        setInputValue(formatted);
      }
    }
  };

  return (
    <StepContainer>
      <FormGrid>
        <InputGroup>
          <Label htmlFor="name">Nome Completo *</Label>
          <StyledInput
            id="name"
            type="text"
            {...register("name")}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="email">Email *</Label>
          <StyledInput
            id="email"
            type="email"
            {...register("email")}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="whatsApp">WhatsApp *</Label>
          <PhoneInput
            id="whatsApp"
            placeholder="11 99999-9999"
            value={watch("whatsApp") || ""}
            onChange={(value) => handleInputChange("whatsApp", value)}
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="birthDate">Data de Nascimento *</Label>
          <DateInputContainer>
            <CustomDateInput
              id="birthDate"
              type="text"
              value={inputValue}
              onChange={handleDateInputChange}
              onFocus={handleDateInputFocus}
              placeholder="DD/MM/AAAA (maior de 18 anos)"
              maxLength={10}
            />
            <CalendarIcon onClick={toggleCalendar}>
              <Calendar size={20} />
            </CalendarIcon>
            <SequentialCalendar $isOpen={isCalendarOpen}>
              <CalendarHeader>
                <ResetButtonContainer>
                  <ResetButton onClick={resetCalendar} title="Resetar">
                    ↺
                  </ResetButton>
                </ResetButtonContainer>
                <CalendarTitleContainer>
                  <CalendarTitle>
                    {calendarStep === "year" &&
                      selectedYear &&
                      `${selectedYear}`}
                    {calendarStep === "month" &&
                      selectedYear &&
                      `${selectedYear} - Escolha o mês`}
                    {calendarStep === "day" &&
                      selectedYear &&
                      selectedMonth !== null &&
                      `${selectedYear} - ${months[selectedMonth]}`}
                  </CalendarTitle>
                </CalendarTitleContainer>
                <NavigationArrows>
                  <ArrowButton
                    onClick={navigateUp}
                    $disabled={!canNavigateUp()}
                  >
                    <ChevronUp size={16} />
                  </ArrowButton>
                  <ArrowButton
                    onClick={navigateDown}
                    $disabled={!canNavigateDown()}
                  >
                    <ChevronDown size={16} />
                  </ArrowButton>
                </NavigationArrows>
              </CalendarHeader>
              <CalendarContent>
                {calendarStep === "year" && (
                  <YearList>
                    {generateYears().map((year) => (
                      <YearItem
                        key={year}
                        onClick={() => handleYearSelect(year)}
                        $isSelected={selectedYear === year}
                      >
                        {year}
                      </YearItem>
                    ))}
                  </YearList>
                )}
                {calendarStep === "month" && (
                  <MonthGrid>
                    {generateMonthsWithNextYear().map((monthData, index) => (
                      <MonthItem
                        key={`${monthData.year}-${monthData.index}`}
                        onClick={() =>
                          handleMonthSelect(monthData.index, monthData.year)
                        }
                        $isSelected={
                          selectedMonth === monthData.index &&
                          selectedYear === monthData.year
                        }
                        $isNextYear={monthData.isNextYear}
                      >
                        {monthData.name}
                      </MonthItem>
                    ))}
                  </MonthGrid>
                )}
                {calendarStep === "day" &&
                  selectedYear &&
                  selectedMonth !== null && (
                    <>
                      <CalendarGrid>
                        {daysOfWeek.map((day) => (
                          <DayName key={day}>{day}</DayName>
                        ))}
                      </CalendarGrid>
                      <CalendarGrid>
                        {Array.from(
                          {
                            length: getFirstDayOfMonth(
                              selectedYear,
                              selectedMonth
                            ),
                          },
                          (_, i) => (
                            <div key={`empty-${i}`} />
                          )
                        )}
                        {Array.from(
                          {
                            length: getDaysInMonth(selectedYear, selectedMonth),
                          },
                          (_, i) => {
                            const day = i + 1;
                            return (
                              <DayItem
                                key={day}
                                onClick={() => handleDaySelect(day)}
                                $isSelected={selectedDay === day}
                              >
                                {day}
                              </DayItem>
                            );
                          }
                        )}
                      </CalendarGrid>
                    </>
                  )}
              </CalendarContent>
            </SequentialCalendar>
          </DateInputContainer>
        </InputGroup>

        <FullWidthField>
          <Label>Gênero *</Label>
          <GenderContainer>
            {genderOptions.map((option) => (
              <GenderLabel key={option.value}>
                <input
                  type="radio"
                  name="gender"
                  value={option.value}
                  checked={selectedGender === option.value}
                  onChange={(e) => handleGenderChange(e.target.value)}
                />
                {option.label}
                {option.value === "outro" && selectedGender === "outro" && (
                  <input
                    type="text"
                    placeholder="Especifique"
                    value={genderOther}
                    onChange={(e) => handleGenderOtherChange(e.target.value)}
                  />
                )}
              </GenderLabel>
            ))}
          </GenderContainer>
        </FullWidthField>
      </FormGrid>
    </StepContainer>
  );
};

export default BasicInfoStep;
