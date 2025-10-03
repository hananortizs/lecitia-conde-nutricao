using LeticiaConde.Application.DTOs;

namespace LeticiaConde.Application.Interfaces;

/// <summary>
/// Interface para o serviço de gerenciamento de agendamentos
/// </summary>
public interface IAppointmentService
{
    /// <summary>
    /// Gets available time slots for appointment
    /// </summary>
    /// <param name="startDate">Start date for search</param>
    /// <param name="endDate">End date for search</param>
    /// <returns>List of available slots</returns>
    Task<IEnumerable<AvailableSlotDto>> GetAvailableSlotsAsync(DateTime startDate, DateTime endDate);

    /// <summary>
    /// Reserves a time slot for appointment
    /// </summary>
    /// <param name="dto">Appointment request data</param>
    /// <returns>Created appointment</returns>
    Task<AppointmentDto> ReserveTimeSlotAsync(RequestAppointmentDto dto);

    /// <summary>
    /// Confirms an appointment after payment
    /// </summary>
    /// <param name="appointmentId">Appointment ID</param>
    /// <param name="transactionId">Payment transaction ID</param>
    /// <returns>Confirmed appointment</returns>
    Task<AppointmentDto> ConfirmAppointmentAsync(int appointmentId, string transactionId);

    /// <summary>
    /// Gets an appointment by ID
    /// </summary>
    /// <param name="id">Appointment ID</param>
    /// <returns>Found appointment or null</returns>
    Task<AppointmentDto?> GetAppointmentByIdAsync(int id);

    /// <summary>
    /// Gets all appointments
    /// </summary>
    /// <returns>List of appointments</returns>
    Task<IEnumerable<AppointmentDto>> GetAllAppointmentsAsync();

    /// <summary>
    /// Cancels an appointment
    /// </summary>
    /// <param name="id">Appointment ID</param>
    /// <returns>True if cancelled successfully</returns>
    Task<bool> CancelAppointmentAsync(int id);

    /// <summary>
    /// Checks if a time slot is available
    /// </summary>
    /// <param name="dateTime">Date and time to check</param>
    /// <returns>True if available</returns>
    Task<bool> CheckAvailabilityAsync(DateTime dateTime);

    /// <summary>
    /// Gets sunset time for a specific date
    /// </summary>
    /// <param name="date">Date to query</param>
    /// <returns>Sunset time</returns>
    Task<DateTime?> GetSunsetTimeAsync(DateTime date);
}
