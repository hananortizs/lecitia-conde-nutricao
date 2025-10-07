// Types based on backend DTOs

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

// Lead Types
export interface CaptureLeadDto {
  name: string;
  email: string;
  whatsApp: string;
  weight: number;
  height: number;
  bmi: number;
  bmiClassification: string;
}

export interface CapturedLeadDto {
  id: number;
  name: string;
  email: string;
  whatsApp: string;
  bmi: number;
  bmiClassification: string;
  captureDate: string;
}

export interface CalculateBmiDto {
  weight: number;
  height: number;
}

export interface BmiResultDto {
  bmi: number;
  classification: string;
  description: string;
}

// Appointment Types
export const AppointmentStatus = {
  Reserved: 1,
  Confirmed: 2,
  Cancelled: 3,
  Completed: 4,
} as const;

export type AppointmentStatus =
  (typeof AppointmentStatus)[keyof typeof AppointmentStatus];

export interface RequestAppointmentDto {
  leadId: number;
  dateTime: string;
  observations?: string;
}

export interface AppointmentDto {
  id: number;
  leadId: number;
  leadName: string;
  leadEmail: string;
  leadWhatsApp: string;
  dateTime: string;
  status: AppointmentStatus;
  reservationDate: string;
  confirmationDate?: string;
  virtualRoomLink?: string;
  observations?: string;
}

export interface AvailableSlotDto {
  dateTime: string;
  available: boolean;
  unavailabilityReason?: string;
}

export interface ConfirmPaymentDto {
  transactionId: string;
  status: string;
  amount?: number;
  additionalData?: Record<string, any>;
}

// BMI Classification
export const BmiClassification = {
  Underweight: "Abaixo do peso",
  Normal: "Peso normal",
  Overweight: "Sobrepeso",
  ObesityI: "Obesidade Grau I",
  ObesityII: "Obesidade Grau II",
  ObesityIII: "Obesidade Grau III",
} as const;

export type BmiClassification =
  (typeof BmiClassification)[keyof typeof BmiClassification];

// Theme Types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
  };
  space: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    "2xl": number;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
  bp: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    desktop: string;
    wide: string;
  };
  mq: {
    up: (key: "sm" | "md" | "lg" | "xl" | "xxl" | "desktop" | "wide") => string;
    down: (px: number) => string;
  };
  fluid: {
    typography: {
      h1: string;
      h2: string;
      h3: string;
      h4: string;
      h5: string;
      h6: string;
      body: string;
      small: string;
      large: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      "2xl": string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  };
}

// Form Types
export interface BmiFormData {
  name: string;
  email: string;
  whatsApp: string;
  weight: string;
  height: string;
}

export interface AppointmentFormData {
  leadId: number;
  dateTime: string;
  observations?: string;
}

// Pre-Consultation Form Types
export interface PreConsultationData {
  // Informações básicas
  name: string;
  email: string;
  whatsApp: string;
  birthDate: string;
  gender: string;
  genderOther?: string;
  mainGoals: string[];

  // Objetivos e motivação
  mainGoal: string;
  motivation: string;
  previousExperience: string;

  // Estilo de vida atual
  currentDiet: string;
  mealFrequency: string;
  cookingTime: string;
  foodRestrictions: string;
  supplements: string;

  // Agendamento
  consultationType: string;
  preferredTime: string;
  additionalNotes: string;
}
