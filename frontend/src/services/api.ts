import axios from "axios";
import type { AxiosResponse } from "axios";
import type {
  ApiResponse,
  CaptureLeadDto,
  CapturedLeadDto,
  CalculateBmiDto,
  BmiResultDto,
  RequestAppointmentDto,
  AppointmentDto,
  AvailableSlotDto,
  ConfirmPaymentDto,
} from "../types";

// API Base Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error("API Response Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Lead Services
export const leadService = {
  // Validate BMI calculation
  async validateBmi(data: CalculateBmiDto): Promise<BmiResultDto> {
    const response: AxiosResponse<ApiResponse<BmiResultDto>> = await api.post(
      "/pms/leads/validate-bmi",
      data
    );
    return response.data.data!;
  },

  // Capture a new lead
  async captureLead(data: CaptureLeadDto): Promise<CapturedLeadDto> {
    const response: AxiosResponse<ApiResponse<CapturedLeadDto>> =
      await api.post("/pms/leads/capture-lead", data);
    return response.data.data!;
  },

  // Get lead by ID
  async getLeadById(id: number): Promise<CapturedLeadDto> {
    const response: AxiosResponse<ApiResponse<CapturedLeadDto>> = await api.get(
      `/pms/leads/${id}`
    );
    return response.data.data!;
  },

  // Get all leads
  async getAllLeads(): Promise<CapturedLeadDto[]> {
    const response: AxiosResponse<ApiResponse<CapturedLeadDto[]>> =
      await api.get("/pms/leads");
    return response.data.data!;
  },

  // Mark lead as converted
  async markAsConverted(id: number): Promise<boolean> {
    const response: AxiosResponse<ApiResponse<boolean>> = await api.put(
      `/pms/leads/${id}/mark-converted`
    );
    return response.data.data!;
  },
};

// Appointment Services
export const appointmentService = {
  // Get available time slots
  async getAvailableSlots(
    startDate?: string,
    endDate?: string
  ): Promise<AvailableSlotDto[]> {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    const response: AxiosResponse<ApiResponse<AvailableSlotDto[]>> =
      await api.get(`/api/appointments/available-slots?${params.toString()}`);
    return response.data.data!;
  },

  // Reserve a time slot
  async reserveTimeSlot(data: RequestAppointmentDto): Promise<AppointmentDto> {
    const response: AxiosResponse<ApiResponse<AppointmentDto>> = await api.post(
      "/api/appointments/reserve",
      data
    );
    return response.data.data!;
  },

  // Get appointment by ID
  async getAppointmentById(id: number): Promise<AppointmentDto> {
    const response: AxiosResponse<ApiResponse<AppointmentDto>> = await api.get(
      `/api/appointments/${id}`
    );
    return response.data.data!;
  },

  // Get all appointments
  async getAllAppointments(): Promise<AppointmentDto[]> {
    const response: AxiosResponse<ApiResponse<AppointmentDto[]>> =
      await api.get("/api/appointments");
    return response.data.data!;
  },

  // Cancel appointment
  async cancelAppointment(id: number): Promise<boolean> {
    const response: AxiosResponse<ApiResponse<boolean>> = await api.put(
      `/api/appointments/${id}/cancel`
    );
    return response.data.data!;
  },

  // Check availability
  async checkAvailability(dateTime: string): Promise<boolean> {
    const response: AxiosResponse<ApiResponse<boolean>> = await api.get(
      `/api/appointments/check-availability?dateTime=${dateTime}`
    );
    return response.data.data!;
  },
};

// Payment Services
export const paymentService = {
  // Confirm payment via webhook
  async confirmPayment(data: ConfirmPaymentDto): Promise<boolean> {
    const response: AxiosResponse<ApiResponse<boolean>> = await api.post(
      "/pms/pagamento/webhook",
      data
    );
    return response.data.data!;
  },
};

// Utility functions
export const apiUtils = {
  // Handle API errors
  handleError(error: any): string {
    if (error.response?.data?.error) {
      return error.response.data.error;
    }
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    if (error.message) {
      return error.message;
    }
    return "Ocorreu um erro inesperado. Tente novamente.";
  },

  // Check if error is network related
  isNetworkError(error: any): boolean {
    return !error.response && error.request;
  },

  // Check if error is server related
  isServerError(error: any): boolean {
    return error.response?.status >= 500;
  },

  // Check if error is client related
  isClientError(error: any): boolean {
    return error.response?.status >= 400 && error.response?.status < 500;
  },
};

export default api;
